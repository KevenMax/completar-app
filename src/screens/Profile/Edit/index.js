import React, {Component} from 'react';
import {Picker} from 'react-native';

import {
  ScrollView,
  Form,
  Label,
  NumberInput,
  TextInput,
  ContainerSelect,
  SelectInput,
  FileInput,
  TextFileInput,
  Submit,
  TextSubmit,
} from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import DocumentPicker from 'react-native-document-picker';

export default class Edit extends Component {
  state = {
    matricula: '',
    fillImage: 'Nenhuma imagem selecionada',
    curso: null,
    listCursos: [
      {id: 1, nome: 'Engenharia Mecanica'},
      {id: 2, nome: 'Engenharia de Software'},
      {id: 3, nome: 'Ciências da Computação'},
    ],
  };

  handlePicture = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({fillFile: res.name});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  setMatricula = matricula => {
    this.setState({matricula: matricula.replace(/[^\d]+/g, '')});
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Editar Perfil" />
          <Form>
            <Label>Nome Completo *</Label>
            <TextInput />

            <Label>Como gostaria de ser chamado? *</Label>
            <TextInput />

            <Label>Matrícula *</Label>
            <NumberInput
              maxLength={6}
              onChangeText={text => this.setMatricula(text)}
              value={this.state.matricula}
            />

            <Label>Curso *</Label>
            <ContainerSelect>
              <SelectInput
                selectedValue={this.state.curso}
                onValueChange={itemValue => this.setState({curso: itemValue})}>
                <Picker.Item label="Selecione uma opção" value="" />
                {this.state.listCursos.map(categoria => (
                  <Picker.Item
                    label={categoria.nome}
                    value={categoria.id}
                    key={categoria.id}
                  />
                ))}
              </SelectInput>
            </ContainerSelect>

            <Label>Contato *</Label>
            <NumberInput />

            <Label>Foto </Label>
            <FileInput onPress={() => this.handlePicture()}>
              <TextFileInput>{this.state.fillImage}</TextFileInput>
            </FileInput>

            <Submit>
              <TextSubmit>SALVAR</TextSubmit>
            </Submit>
          </Form>
        </ScrollView>
        <Menu props={this.props} />
      </>
    );
  }
}
