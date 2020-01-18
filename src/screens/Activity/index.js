import React, { Component } from 'react'
import DocumentPicker from 'react-native-document-picker'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import Header from '/components/Header'
import Menu from '/components/Menu'
import api from '/services/api'
import { Creators as AlertActions } from '/store/ducks/alert'
import { Creators as UserActions } from '/store/ducks/user'

import {
  ScrollView,
  Form,
  Label,
  ContainerSelect,
  SelectInput,
  TextInput,
  NumberInput,
  FileInput,
  TextFileInput,
  Submit,
  TextSubmit,
  TextSelectInput,
  TextSelectShowInput,
  ContainerTextSelect,
  ArrowInput,
  Alert,
} from './styles'

class Activity extends Component {
  state = {
    user_id: this.props.user.user.data.id,
    category: null,
    fillCategory: 'Selecione uma opção',
    activity: null,
    fillActivity: 'Selecione uma opção',
    description: '',
    hours: '',
    attachment: null,
    fillAttachment: 'Nenhum arquivo selecionado',
    listCategories: [],
    listActivities: [],
    showAlert: true,
    messageAlert: '',
    titleAlert: '',
    progressAlert: true,
    buttonAlert: false,
    disabledActivity: true,
  }

  componentDidMount() {
    this.loadCategory()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.loadActivity()
    }
  }

  handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      })
      this.setState({ fillAttachment: res.name, attachment: res })
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

  renderRowSelect = rowData => {
    return <TextSelectInput>{rowData.nome}</TextSelectInput>
  }

  handleCategory = (index, value) => {
    this.setState({
      fillCategory: value.nome,
      category: value.id,
      fillActivity: 'Selecione uma opção',
      activity: null,
      disabledActivity: false,
    })
  }

  handleActivity = (index, value) => {
    this.setState({ fillActivity: value.nome, activity: value.id })
  }

  handleSubmit = async () => {
    const {
      category,
      activity,
      description,
      hours,
      attachment,
      user_id,
    } = this.state
    if (this.checkInputs()) {
      const data = new FormData()

      data.append('categoria_id', category)
      data.append('atividade_id', activity)
      data.append('descricao', description)
      data.append('quantidade_horas', hours.replace(':', '.'))
      data.append('usuario_id', user_id)
      if (attachment !== null) {
        data.append('anexo', attachment)
      }

      try {
        const request = await api.post('/horas_complementares', data)
        const response = request.data

        this.props.alertActions.addAlert(
          true,
          'Cadastro realizado',
          'A atividade foi cadastrada com sucesso!',
        )
        this.props.userActions.setUser(response)
        this.props.navigation.navigate('Home')
      } catch (error) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          messageAlert:
            error.response && error.response.data && error.response.data.error
              ? error.response.data.error
              : 'Ocorreu algum problema ao cadastrar os dados',
          buttonAlert: true,
          progressAlert: false,
        })
      }
    }
  }

  checkInputs = () => {
    const { category, activity, description, hours } = this.state

    if (!category || !activity || !description || !hours) {
      this.setState({
        showAlert: true,
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
        titleAlert: 'Preencha todos os campos',
        buttonAlert: true,
        progressAlert: false,
      })
      return false
    }
    return true
  }

  loadCategory = async () => {
    try {
      const request = await api.get('/categorias')
      const response = request.data
      this.setState({
        listCategories: response,
        showAlert: false,
        showProgress: false,
      })
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        buttonAlert: true,
        progressAlert: false,
        messageAlert:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Ocorreu algum problema ao carregar os dados',
      })
    }
  }

  loadActivity = async () => {
    const { category } = this.state
    try {
      const request = await api.get(`/atividades?categoria_id=${category}`)
      const response = request.data
      this.setState({
        listActivities: response,
        showAlert: false,
        showProgress: false,
      })
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Ocorreu algum problema ao carregar os dados',
      })
    }
  }

  render() {
    const {
      disabledActivity,
      listCategories,
      fillCategory,
      listActivities,
      fillActivity,
      hours,
      fillAttachment,
      showAlert,
      progressAlert,
      titleAlert,
      messageAlert,
      buttonAlert,
    } = this.state
    return (
      <>
        <ScrollView>
          <Header name='Cadastrar Atividade' />

          <Form>
            <Label>Categoria *</Label>
            <ContainerSelect>
              <SelectInput
                options={listCategories}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleCategory(index, value)}
              >
                <ContainerTextSelect>
                  <TextSelectShowInput>{fillCategory}</TextSelectShowInput>

                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Atividade da Categoria *</Label>
            <ContainerSelect>
              <SelectInput
                options={listActivities}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleActivity(index, value)}
                disabled={disabledActivity}
              >
                <ContainerTextSelect>
                  <TextSelectShowInput>{fillActivity}</TextSelectShowInput>

                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Descrição *</Label>
            <TextInput
              onChangeText={text => this.setState({ description: text })}
            />

            <Label>Quantidade de Horas *</Label>
            <NumberInput
              value={hours}
              onChangeText={text => this.setState({ hours: text })}
            />

            <Label>Anexo </Label>
            <FileInput onPress={() => this.handleUploadFile()}>
              <TextFileInput>{fillAttachment}</TextFileInput>
            </FileInput>

            <Submit onPress={this.handleSubmit}>
              <TextSubmit>SALVAR</TextSubmit>
            </Submit>
          </Form>
        </ScrollView>
        <Menu props={this.props} />

        <Alert
          show={showAlert}
          showProgress={progressAlert}
          title={titleAlert}
          message={messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={buttonAlert}
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
const mapStateToProps = state => ({
  alert: state.alert,
  user: state.user,
})

const mapDispatchToProps = dispatch => {
  return {
    alertActions: bindActionCreators(AlertActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)

Activity.propTypes = {
  user: PropTypes.object,
  alertActions: PropTypes.object,
  userActions: PropTypes.object,
  navigation: PropTypes.object,
}
