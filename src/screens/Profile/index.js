import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import AsyncStorage from '@react-native-community/async-storage'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import avatar from '/assets/images/avatar.png'
import Header from '/components/Header'
import Menu from '/components/Menu'
import { Creators as AlertActions } from '/store/ducks/alert'
import { Creators as UserActions } from '/store/ducks/user'

import {
  ScrollView,
  ContainerHeader,
  Avatar,
  ButttonEdit,
  Nickname,
  Name,
  Info,
  Item,
  TextLabel,
  TextValue,
  InfoTime,
  TimeDone,
  TimePending,
  Bold,
  Line,
  ButtonLogout,
  TextLogout,
  Alert,
} from './styles'

class Profile extends Component {
  state = {
    person: {
      name: '',
      nickname: '',
      avatar: '',
      matriculation: '',
      course: '',
      college: '',
      contact: '',
      requiredHours: '',
      totalHours: '',
    },
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  }

  componentDidMount() {
    this.alert()
    this.loadUser()
  }

  loadUser = () => {
    if (this.props.user.user !== null) {
      const {
        nome,
        apelido,
        foto,
        matricula,
        contato,
        ['total-horas']: totalHoras,
        ['horas-realizadas']: horasRealizadas,
      } = this.props.user.user.data.attributes

      const campus = this.props.user.user.included[0].attributes.nome
      const curso = this.props.user.user.included[1].attributes.nome

      this.setState({
        person: {
          name: nome,
          nickname: apelido,
          avatar: foto,
          matriculation: matricula,
          contact: contato,
          requiredHours: horasRealizadas,
          totalHours: totalHoras,
          college: campus,
          course: curso,
        },
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

  handleEdit = () => {
    this.props.navigation.navigate('Edit')
  }

  handleLogout = () => {
    AsyncStorage.clear()
    this.props.navigation.navigate('SignIn')
  }

  render() {
    const avatarImage = this.state.person.avatar
      ? { uri: this.state.person.avatar }
      : avatar

    const {
      person: {
        nickname,
        name,
        matriculation,
        course,
        college,
        contact,
        requiredHours,
        totalHours,
      },
      showAlert,
      titleAlert,
      messageAlert,
    } = this.state

    return (
      <>
        <ScrollView>
          <Header name='Perfil' />

          <ContainerHeader>
            <Avatar source={avatarImage} />

            <ButttonEdit onPress={() => this.handleEdit()}>
              <Icon
                name='pencil'
                size={20}
                color='#fff'
                style={{ textAlign: 'center', paddingTop: 9 }}
              />
            </ButttonEdit>
          </ContainerHeader>

          <Nickname>{nickname || ''}</Nickname>
          <Name>{name || ''}</Name>

          <Info>
            <Item>
              <TextLabel>Matricula</TextLabel>
              <TextValue>{matriculation || ''}</TextValue>
            </Item>

            <Item>
              <TextLabel>Curso</TextLabel>
              <TextValue>{course || ''}</TextValue>
            </Item>

            <Item>
              <TextLabel>Campus</TextLabel>
              <TextValue>{college || ''}</TextValue>
            </Item>

            <Item>
              <TextLabel>Contato</TextLabel>
              <TextValue>{contact || ''}</TextValue>
            </Item>
          </Info>

          <InfoTime>
            <TimeDone>
              <Bold>{requiredHours || ''} horas</Bold> realizadas
            </TimeDone>

            <Line />

            <TimePending>
              <Bold>{totalHours || ''} horas</Bold> necessárias
            </TimePending>
          </InfoTime>

          <ButtonLogout onPress={() => this.handleLogout()}>
            <TextLogout>
              SAIR <Icon name='sign-out' size={20} color='#b275f4' />
            </TextLogout>
          </ButtonLogout>
        </ScrollView>

        <Menu props={this.props} />

        <Alert
          show={showAlert}
          showProgress={false}
          title={titleAlert}
          message={messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText='OK, entendi'
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
    userActions: bindActionCreators(UserActions, dispatch),
    alertActions: bindActionCreators(AlertActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

Profile.propTypes = {
  alertActions: PropTypes.object,
  userActions: PropTypes.object,
  user: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}
