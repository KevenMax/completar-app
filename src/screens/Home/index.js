import React, { Component } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import ChartMain from '/components/ChartMain'
import Header from '/components/Header'
import Menu from '/components/Menu'
import api from '/services/api'
import { Creators as AlertActions } from '/store/ducks/alert'
import { Creators as CategoryActions } from '/store/ducks/category'

import {
  ScrollView,
  ContainerItems,
  Item,
  Chart,
  TextDescribe,
  ChartText,
} from './styles'

class Home extends Component {
  state = {
    percentual: 0,
    showAlert: true,
    messageAlert: 'Carregando...',
    titleAlert: '',
    progressAlert: true,
    showButton: false,
    categoryList: [],
  }

  componentDidMount() {
    if (this.checkUser()) {
      this.alert()
      this.loadCategory()
    }
  }

  checkUser = () => {
    if (
      !this.props.user ||
      !this.props.user.user ||
      !this.props.user.user.data ||
      !this.props.user.user.data.attributes ||
      !this.props.user.user.data.attributes.matricula
    ) {
      this.props.navigation.navigate('Create')
      return false
    }
    return true
  }

  loadCategory = async () => {
    try {
      const request = await api.get('/categorias/home')
      const response = request.data
      this.setState({
        percentual: response.percentual,
        categoryList: response.categorias,
        progressAlert: false,
        showAlert: !this.props.alert.show ? false : true,
      })
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar os dados',
        showButton: true,
        progressAlert: false,
      })
    }
  }

  alert = () => {
    if (this.props.alert.show) {
      const { show, title, message } = this.props.alert
      this.setState({
        showAlert: show,
        titleAlert: title,
        messageAlert: message,
        showButton: true,
        progressAlert: false,
      })
    }
  }

  handleConfirmAlert = () => {
    this.setState({
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
    })
    this.props.alertActions.removeAlert('')
  }

  handleCategory = id => {
    this.props.categoryActions.addCategory(id)
    this.props.navigation.navigate('Category')
  }

  render() {
    const {
      percentual,
      categoryList,
      showAlert,
      progressAlert,
      titleAlert,
      messageAlert,
      showButton,
    } = this.state
    return (
      <>
        <ScrollView>
          <Header name='Dashboard' />

          <ChartMain percentual={percentual} props={this.props} />

          <ContainerItems>
            {categoryList.map(category => (
              <Item
                onPress={() => this.handleCategory(category.id)}
                key={category.id}
              >
                <Chart>
                  <AnimatedCircularProgress
                    fill={category.percentual}
                    width={7}
                    size={60}
                    lineCap='square'
                    duration={2000}
                    tintColor='#b275f4'
                    backgroundWidth={8}
                    backgroundColor='#e0e0e0'
                  >
                    {fill => <ChartText>{category.percentual}%</ChartText>}
                  </AnimatedCircularProgress>
                </Chart>

                <TextDescribe ellipsizeMode='middle'>
                  {category.nome}
                </TextDescribe>
              </Item>
            ))}
          </ContainerItems>
        </ScrollView>

        <Menu props={this.props} />

        <AwesomeAlert
          show={showAlert}
          showProgress={progressAlert}
          title={titleAlert}
          message={messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={showButton}
          confirmText='OK'
          confirmButtonColor='#b275f4'
          onConfirmPressed={() => this.handleConfirmAlert()}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  user: state.user,
})

const mapDispatchToProps = dispatch => {
  return {
    alertActions: bindActionCreators(AlertActions, dispatch),
    categoryActions: bindActionCreators(CategoryActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
  user: PropTypes.object,
  alert: PropTypes.object.isRequired,
  alertActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}
