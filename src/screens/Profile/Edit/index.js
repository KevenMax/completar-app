import React, {Component} from 'react';

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
} from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import DocumentPicker from 'react-native-document-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as AlertActions} from '../../../store/ducks/alert';
import {Creators as UserActions} from '../../../store/ducks/user';
import api from '../../../services/api';

class Edit extends Component {
  state = {
    name: '',
    nickname: '',
    matriculation: '',
    contact: '',
    fillImage: 'Nenhuma imagem selecionada',
    image: null,
    fillCourse: 'Selecione uma opção',
    course: null,
    listCourses: [],
    showAlert: true,
    titleAlert: '',
    messageAlert: '',
    progressAlert: true,
    buttonAlert: false,
  };

  componentDidMount() {
    this.loadUser();
    this.loadCourses();
  }

  loadUser = () => {
    if (this.props.user.user !== null) {
      this.setState({
        name: this.props.user.user.data.attributes.nome,
        nickname: this.props.user.user.data.attributes.apelido,
        matriculation: this.props.user.user.data.attributes.matricula,
        contact: this.props.user.user.data.attributes.contato,
        fillCourse: this.props.user.user.included[1].attributes.nome,
        course: this.props.user.user.included[1].id,
      });
    }
  };

  loadCourses = async () => {
    try {
      const request = await api.get('/cursos');
      const response = request.data.data;
      this.setState({
        listCourses: response,
        showAlert: false,
        progressAlert: false,
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        progressAlert: false,
        titleAlert: 'Ops...',
        messageAlert:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Ocorreu algum problema ao carregar os Cursos',
      });
    }
  };

  handlePicture = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({fillImage: res.name, image: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  setMatriculation = matriculation => {
    this.setState({matriculation: matriculation.replace(/[^\d]+/g, '')});
  };

  handleCourse = (index, value) => {
    this.setState({fillCourse: value.attributes.nome, course: value.id});
  };

  renderRowSelect = (rowData, rowID, highlighted) => {
    return <TextSelectInput>{rowData.attributes.nome}</TextSelectInput>;
  };

  handleSubmit = async () => {
    const {name, nickname, matriculation, contact, image, course} = this.state;
    if (!name || !nickname || !matriculation || !contact || !course) {
      this.setState({
        showAlert: true,
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
        titleAlert: 'Preencha todos os campos',
      });
    } else {
      const data = new FormData();
      data.append('nome', name);
      data.append('apelido', nickname);
      data.append('matricula', matriculation);
      data.append('contato', contact);
      data.append('curso_id', course);
      if (image !== null) {
        data.append('foto', image);
      }

      try {
        const request = await api.put('usuarios/update', data);
        const user = request.data;

        this.props.userActions.setUser(user);
        this.props.alertActions.addAlert(
          true,
          'Perfil atualizado',
          'Seu perfil foi atualizado com sucesso!',
        );
        this.props.navigation.navigate('Profile');
      } catch (err) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          buttonAlert: true,
          messageAlert:
            err.response && err.response.data
              ? err.response.data[0]
              : 'Verifique sua conexão com a internet',
        });
      }
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Editar Perfil" />
          <Form>
            <Label>Nome Completo *</Label>
            <TextInput
              value={this.state.name}
              onChangeText={text => this.setState({name: text})}
            />

            <Label>Apelido *</Label>
            <TextInput
              value={this.state.nickname}
              onChangeText={text => this.setState({nickname: text})}
            />

            <Label>Matrícula *</Label>
            <NumberInput
              maxLength={6}
              onChangeText={text => this.setMatriculation(text)}
              value={this.state.matriculation}
            />

            <Label>Curso *</Label>
            <ContainerSelect>
              <SelectInput
                options={this.state.listCourses}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleCourse(index, value)}>
                <ContainerTextSelect>
                  <TextSelectShowInput>
                    {this.state.fillCourse}
                  </TextSelectShowInput>
                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Contato *</Label>
            <NumberContactInput
              value={this.state.contact}
              onChangeText={text => this.setState({contact: text})}
            />

            <Label>Foto </Label>
            <FileInput onPress={() => this.handlePicture()}>
              <TextFileInput>{this.state.fillImage}</TextFileInput>
            </FileInput>

            <Submit onPress={() => this.handleSubmit()}>
              <TextSubmit>SALVAR</TextSubmit>
            </Submit>
          </Form>
        </ScrollView>
        <Menu props={this.props} />
        <Alert
          show={this.state.showAlert}
          showProgress={this.state.progressAlert}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={this.state.buttonAlert}
          confirmText="OK, entendi"
          confirmButtonColor="#b275f4"
          onConfirmPressed={() => {
            this.setState({showAlert: false});
          }}
          // showCancelButton={true}
          // cancelText="No, cancel"
          // onCancelPressed={() => this.setState({showAlert: false})}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    alertActions: bindActionCreators(AlertActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
