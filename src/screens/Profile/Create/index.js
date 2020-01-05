import React, { Component } from 'react'
import DocumentPicker from 'react-native-document-picker'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import Header from '/components/Header'
import api from '/services/api'
import { Creators as AlertActions } from '/store/ducks/alert'
import { Creators as UserActions } from '/store/ducks/user'

import {
  ScrollView,
  Form,
  Label,
  NumberInput,
  TextInput,
  ContainerSelect,
  SelectInput,
  ContainerTextSelect,
  TextSelectShowInput,
  ArrowInput,
  FileInput,
  TextFileInput,
  Submit,
  TextSubmit,
  NumberContactInput,
  TextSelectInput,
  Alert,
} from './styles'

class Create extends Component {
  state = {
    name: '',
    nickname: '',
    matriculation: '',
    contact: '',
    fillImage: 'Nenhuma imagem selecionada',
    image: null,
    course: null,
    fillCourse: 'Selecione uma opção',
    listCourses: [],
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  }

  componentDidMount() {
    this.loadCourse()
  }

  loadCourse = async () => {
    try {
      const request = await api.get('/cursos')
      this.setState({ listCourses: request.data.data })
    } catch (err) {
      this.setState({
        showAlert: true,
        messageAlert: 'Ops...',
        titleAlert: 'Ocorreu algum problema ao carregar os cursos',
      })
    }
  }

  handlePicture = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      this.setState({ fillImage: res.name, image: res })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        this.setState({
          showAlert: true,
          messageAlert: 'Ops...',
          titleAlert: 'Ocorreu algum problema ao selecionar a foto',
        })
      }
    }
  }

  setMatriculation = matriculation => {
    this.setState({ matriculation: matriculation.replace(/[^\d]+/g, '') })
  }

  handleCourse = value => {
    this.setState({ fillCourse: value.attributes.nome, course: value.id })
  }

  renderRowSelect = rowData => {
    return <TextSelectInput>{rowData.attributes.nome}</TextSelectInput>
  }

  handleSubmit = async () => {
    const { name, nickname, matriculation, contact, image, course } = this.state
    if (!name || !nickname || !matriculation || !course) {
      this.setState({
        showAlert: true,
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
        titleAlert: 'Preencha todos os campos',
      })
    } else {
      const data = new FormData()
      data.append('nome', name)
      data.append('apelido', nickname)
      data.append('matricula', matriculation)
      data.append('contato', contact)
      data.append('foto', image)
      data.append('curso_id', course)
      try {
        const request = await api.put('usuarios/update', data)
        const user = request.data

        this.props.userActions.setUser(user)
        this.props.alertActions.addAlert(
          true,
          'Perfil criado',
          'Seu perfil foi criado com sucesso!',
        )
        this.props.navigation.navigate('Home')
      } catch (err) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          messageAlert:
            err.response && err.response.data
              ? err.response.data[0]
              : 'Verifique sua conexão com a internet',
        })
      }
    }
  }

  render() {
    const {
      name,
      nickname,
      matriculation,
      listCourses,
      fillCourse,
      contact,
      fillImage,
      showAlert,
      titleAlert,
      messageAlert,
    } = this.state
    return (
      <>
        <ScrollView>
          <Header name='Completar Perfil' />

          <Form>
            <Label>Nome Completo *</Label>
            <TextInput
              value={name}
              onChangeText={text => this.setState({ name: text })}
            />

            <Label>Apelido *</Label>
            <TextInput
              value={nickname}
              onChangeText={text => this.setState({ nickname: text })}
            />

            <Label>Matrícula *</Label>
            <NumberInput
              maxLength={6}
              onChangeText={text => this.setMatriculation(text)}
              value={matriculation}
            />

            <Label>Curso *</Label>
            <ContainerSelect>
              <SelectInput
                options={listCourses}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleCourse(value)}
              >
                <ContainerTextSelect>
                  <TextSelectShowInput>{fillCourse}</TextSelectShowInput>
                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Contato </Label>
            <NumberContactInput
              value={contact}
              onChangeText={text => this.setState({ contact: text })}
            />

            <Label>Foto </Label>
            <FileInput onPress={() => this.handlePicture()}>
              <TextFileInput>{fillImage}</TextFileInput>
            </FileInput>

            <Submit onPress={() => this.handleSubmit()}>
              <TextSubmit>SALVAR</TextSubmit>
            </Submit>
          </Form>
        </ScrollView>

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
          onConfirmPressed={() => {
            this.setState({ showAlert: false })
          }}
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    alertActions: bindActionCreators(AlertActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Create)

Create.propTypes = {
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  alertActions: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}
