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
import DocumentPicker from 'react-native-document-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as AlertActions} from '../../../store/ducks/alert';
import {Creators as UserActions} from '../../../store/ducks/user';

import api from '../../../services/api';

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
  };

  componentDidMount() {
    this.loadCourse();
  }

  loadCourse = async () => {
    try {
      const request = await api.get('/cursos');
      this.setState({listCourses: request.data.data});
    } catch (err) {
      this.setState({
        showAlert: true,
        messageAlert: 'Ops...',
        titleAlert: 'Ocorreu algum problema ao carregar os cursos',
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
        this.setState({
          showAlert: true,
          messageAlert: 'Ops...',
          titleAlert: 'Ocorreu algum problema ao selecionar a foto',
        });
      }
    }
  };

  setMatriculation = matriculation => {
    this.setState({matriculation: matriculation.replace(/[^\d]+/g, '')});
  };

  handleCourse = value => {
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
      data.append('foto', image);
      data.append('curso_id', course);
      try {
        const request = await api.put('usuarios/update', data);
        const user = request.data;

        this.props.userActions.setUser(user);
        this.props.alertActions.addAlert(
          true,
          'Perfil criado',
          'Seu perfil foi criado com sucesso!',
        );
        this.props.navigation.navigate('Home');
      } catch (err) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
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
          <Header name="Completar Perfil" />
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
                onSelect={(index, value) => this.handleCourse(value)}>
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
        <Alert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK, entendi"
          confirmButtonColor="#b275f4"
          onConfirmPressed={() => {
            this.setState({showAlert: false});
          }}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    alertActions: bindActionCreators(AlertActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
};
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(AlertActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Create);
