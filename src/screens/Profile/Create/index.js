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
    listCourses: [
      {id: 1, nome: 'Engenharia Mecânica - UFC Russas'},
      {id: 2, nome: 'Engenharia de Software - UFC Russas'},
      {id: 3, nome: 'Ciências da Computação - UFC Russas'},
    ],
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
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
    this.setState({fillCourse: value.nome, course: value.id});
  };

  renderRowSelect = (rowData, rowID, highlighted) => {
    return <TextSelectInput>{rowData.nome}</TextSelectInput>;
  };

  handleSubmit = () => {
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
      data.append('nickname', nickname);
      data.append('matricula', matriculation);
      data.append('contato', contact);
      data.append('imagem', image);
      data.append('curso_id', course);
      this.props.addAlert(
        true,
        'Perfil criado',
        'Seu perfil foi criado com sucesso!',
      );
      this.props.navigation.navigate('Home');
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

            <Submit>
              <TextSubmit onPress={() => this.handleSubmit()}>
                SALVAR
              </TextSubmit>
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

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AlertActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Create);
