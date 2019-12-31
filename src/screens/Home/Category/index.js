import React, { Component } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import RNFetchBlob from 'rn-fetch-blob'

import ChartMain from '/components/ChartMain'
import Header from '/components/Header'
import Menu from '/components/Menu'
import api from '/services/api'
import requestStoragePermission from '/services/storagePermission.js'
import { Creators as CategoryActions } from '/store/ducks/category'

import {
  ScrollView,
  TextDescribe,
  TextTime,
  ContainerItems,
  Item,
  TextTimeItem,
  ContentText,
  TextHeaderItem,
  TextDescribeItem,
  OptionItem,
  DropdownTextStyle,
  DropdownStyle,
} from './styles'

class Category extends Component {
  state = {
    percentual: 0,
    category: {
      name: '',
      description: '',
      amountHours: 0,
    },
    activities: [],
    showAlert: true,
    progressAlert: true,
    titleAlert: '',
    messageAlert: '',
    buttonAlert: false,
  }

  async componentDidMount() {
    await requestStoragePermission()
    this.loadCategory()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category.description !== this.state.category.description) {
      this.loadActivities()
    }
  }

  loadActivities = async () => {
    try {
      const { category } = this.props
      const request = await api.get(
        `/horas_complementares?categoria_id=${category.category_id}`,
      )
      const response = request.data.data
      this.setState({
        activities: response,
        showAlert: false,
        progressAlert: false,
      })
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar a Categoria',
        buttonAlert: true,
        progressAlert: false,
      })
    }
  }

  loadCategory = async () => {
    try {
      const { category } = this.props
      const request = await api.get(`/categorias/${category.category_id}`)
      const response = request.data
      this.setState({
        percentual: response.percentual,
        category: {
          name: response.categoria.numero,
          description: response.categoria.nome,
          amountHours: response.categoria.limite_carga_horaria,
        },
      })
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar a Categoria',
        buttonAlert: true,
        progressAlert: false,
      })
    }
  }

  handleOption = async (id, index) => {
    const { activities } = this.state
    const activity = activities.filter(activity => activity.id === id)

    if (index === '0') {
      this.downloadFile(activity)
    } else {
      this.deleteActivity(activity)
    }
  }

  downloadFile = async activity => {
    const date = new Date()
    const fileURL = activity[0].attributes.anexo.url
    const DownloadDir = RNFetchBlob.fs.dirs.DownloadDir
    const ext = this.getExtention(fileURL)

    if (fileURL) {
      try {
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/${Math.floor(
              date.getTime() + date.getSeconds() / 2,
            )}.${ext}`,
            description: 'Anexo',
          },
        }
        await RNFetchBlob.config(options).fetch('GET', fileURL)
      } catch (error) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          messageAlert: 'Ocorreu algum problema ao efetuar o download.',
          buttonAlert: true,
          progressAlert: false,
        })
      }
    } else {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Essa atividade não possui anexo.',
        buttonAlert: true,
        progressAlert: false,
      })
    }
  }

  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
  }

  deleteActivity = async activity => {
    const { id } = activity[0]

    try {
      await api.delete(`/horas_complementares/${id}`)

      this.loadActivities()
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao excluir a atividade.',
        buttonAlert: true,
        progressAlert: false,
      })
    }
  }

  render() {
    const {
      category,
      percentual,
      activities,
      showAlert,
      progressAlert,
      titleAlert,
      messageAlert,
      buttonAlert,
    } = this.state

    return (
      <>
        <ScrollView>
          <Header name={`Categoria ${category.name}`} />

          <ChartMain percentual={percentual} props={this.props} />
          <TextDescribe>{category.description}</TextDescribe>
          <TextTime>({category.amountHours}h)</TextTime>

          <ContainerItems>
            {activities.map(activity => (
              <Item key={activity.id}>
                <TextTimeItem>
                  {activity.attributes['quantidade-horas']}h
                </TextTimeItem>

                <ContentText>
                  <TextHeaderItem>
                    {activity.relationships.atividade.data.nome}
                  </TextHeaderItem>

                  <TextDescribeItem ellipsizeMode='middle'>
                    {activity.attributes.descricao}
                  </TextDescribeItem>
                </ContentText>

                <OptionItem>
                  <ModalDropdown
                    options={['Download do anexo', 'Excluir']}
                    dropdownTextStyle={DropdownTextStyle}
                    onSelect={index => this.handleOption(activity.id, index)}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={DropdownStyle}
                  >
                    <Icon name='ellipsis-v' size={30} color='#b275f4' />
                  </ModalDropdown>
                </OptionItem>
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
          showConfirmButton={buttonAlert}
          confirmText='OK'
          confirmButtonColor='#b275f4'
          onConfirmPressed={() => this.setState({ showAlert: false })}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  category: state.category,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoryActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Category)

Category.propTypes = {
  category: PropTypes.object.isRequired,
}
