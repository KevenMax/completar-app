import React, {Component} from 'react';
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
} from './styles';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import DocumentPicker from 'react-native-document-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as AlertActions} from '../../store/ducks/alert';

class Activity extends Component {
  state = {
    categoria: null,
    fillCategoria: 'Selecione uma opção',
    atividade: null,
    fillAtividade: 'Selecione uma opção',
    descricao: '',
    quantidadeHoras: '',
    anexo: null,
    fillAnexo: 'Nenhum arquivo selecionado',
    listCategorias: [
      {
        id: 1,
        nome:
          'Essa é geralmente uma propriedade que é quase sempre definida como flex-wrap: wrap; Pois assim quando um dos flex itens atinge o limite do conteúdo, o último item passa para a coluna debaixo e assim por diante.',
      },
      {id: 2, nome: 'Categoria 2'},
      {id: 3, nome: 'Categoria 3'},
      {id: 4, nome: 'Categoria 4'},
      {
        id: 5,
        nome:
          'Essa é geralmente uma propriedade que é quase sempre definida como flex-wrap: wrap; Pois assim quando um dos flex itens atinge o limite do conteúdo, o último item passa para a coluna debaixo e assim por diante.',
      },
      {id: 6, nome: 'Categoria 2'},
      {id: 7, nome: 'Categoria 3'},
      {id: 8, nome: 'Categoria 4'},
    ],
    listAtividades: [
      {
        id: 1,
        nome:
          'Participação na diretoria de empresa júnior, como presidente e vice-presidente ou diretor',
      },
      {id: 2, nome: 'Atividade 2'},
      {id: 3, nome: 'Atividade 3'},
      {id: 4, nome: 'Atividade 4'},
    ],
    showAlert: false,
    messageAlert: '',
    titleAlert: '',
  };

  handleUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      this.setState({fillAnexo: res.name, anexo: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  renderRowSelect = (rowData, rowID, highlighted) => {
    return <TextSelectInput>{rowData.nome}</TextSelectInput>;
  };

  handleCategoria = (index, value) => {
    this.setState({fillCategoria: value.nome, categoria: value.id});
  };

  handleAtividade = (index, value) => {
    this.setState({fillAtividade: value.nome, atividade: value.id});
  };

  handleSubmit = () => {
    const {
      categoria,
      atividade,
      descricao,
      quantidadeHoras,
      anexo,
    } = this.state;
    if (!categoria || !atividade || !descricao || !quantidadeHoras) {
      this.setState({
        showAlert: true,
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
        titleAlert: 'Preencha todos os campos',
      });
    } else {
      const data = new FormData();
      data.append('categoria_id', categoria);
      data.append('atividade_id', atividade);
      data.append('descricao', descricao);
      data.append('quantidade_horas', quantidadeHoras);
      data.append('anexo', anexo);
      this.props.addAlert(
        true,
        'Cadastro realizado',
        'A atividade foi cadastrada com sucesso!',
      );
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Cadastrar Atividade" />
          <Form>
            <Label>Categoria *</Label>
            <ContainerSelect>
              <SelectInput
                options={this.state.listCategorias}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleCategoria(index, value)}>
                <ContainerTextSelect>
                  <TextSelectShowInput>
                    {this.state.fillCategoria}
                  </TextSelectShowInput>
                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Atividade da Categoria *</Label>
            <ContainerSelect>
              <SelectInput
                options={this.state.listAtividades}
                renderRow={this.renderRowSelect.bind(this)}
                onSelect={(index, value) => this.handleAtividade(index, value)}>
                <ContainerTextSelect>
                  <TextSelectShowInput>
                    {this.state.fillAtividade}
                  </TextSelectShowInput>
                  <ArrowInput />
                </ContainerTextSelect>
              </SelectInput>
            </ContainerSelect>

            <Label>Descrição *</Label>
            <TextInput
              onChangeText={text => this.setState({descricao: text})}
            />

            <Label>Quantidade de Horas *</Label>
            <NumberInput
              value={this.state.quantidadeHoras}
              onChangeText={text => this.setState({quantidadeHoras: text})}
            />

            <Label>Anexo </Label>
            <FileInput onPress={() => this.handleUploadFile()}>
              <TextFileInput>{this.state.fillAnexo}</TextFileInput>
            </FileInput>

            <Submit>
              <TextSubmit onPress={this.handleSubmit}>SALVAR</TextSubmit>
            </Submit>
          </Form>
        </ScrollView>
        <Menu props={this.props} />
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
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(AlertActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activity);
