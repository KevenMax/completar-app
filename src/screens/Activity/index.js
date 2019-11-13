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
import {Creators as UserActions} from '../../store/ducks/user';
import api from '../../services/api';

class Activity extends Component {
  state = {
    user_id: this.props.user.user.data.id,
    categoria: null,
    fillCategoria: 'Selecione uma opção',
    atividade: null,
    fillAtividade: 'Selecione uma opção',
    descricao: '',
    quantidadeHoras: '',
    anexo: null,
    fillAnexo: 'Nenhum arquivo selecionado',
    listCategorias: [],
    listAtividades: [],
    showAlert: true,
    messageAlert: '',
    titleAlert: '',
    progressAlert: true,
    buttonAlert: false,
  };

  componentDidMount() {
    this.loadCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.categoria !== this.state.categoria) {
      this.loadActivity();
    }
  }

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
    this.setState({
      fillCategoria: value.nome,
      categoria: value.id,
      fillAtividade: 'Selecione uma opção',
      atividade: null,
    });
    console.log(this.state);
  };

  handleAtividade = (index, value) => {
    this.setState({fillAtividade: value.nome, atividade: value.id});
  };

  handleSubmit = async () => {
    const {
      categoria,
      atividade,
      descricao,
      quantidadeHoras,
      anexo,
      user_id,
    } = this.state;
    if (!categoria || !atividade || !descricao || !quantidadeHoras) {
      this.setState({
        showAlert: true,
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
        titleAlert: 'Preencha todos os campos',
        buttonAlert: true,
        progressAlert: false,
      });
    } else {
      const data = new FormData();
      data.append('categoria_id', categoria);
      data.append('atividade_id', atividade);
      data.append('descricao', descricao);
      data.append('quantidade_horas', quantidadeHoras.replace(':', '.'));
      data.append('usuario_id', user_id);
      if (anexo !== null) {
        data.append('anexo', anexo);
      }
      try {
        const request = await api.post('/horas_complementares', data);
        const response = request.data;
        this.props.alertActions.addAlert(
          true,
          'Cadastro realizado',
          'A atividade foi cadastrada com sucesso!',
        );
        this.props.userActions.setUser(response);
        this.props.navigation.navigate('Home');
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
        });
      }
    }
  };

  loadCategory = async () => {
    try {
      const request = await api.get('/categorias');
      const response = request.data;
      this.setState({
        listCategorias: response,
        showAlert: false,
        showProgress: false,
      });
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
      });
    }
  };

  loadActivity = async () => {
    const {categoria} = this.state;
    try {
      const request = await api.get(`/atividades?categoria_id=${categoria}`);
      const response = request.data;
      this.setState({
        listAtividades: response,
        showAlert: false,
        showProgress: false,
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert:
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Ocorreu algum problema ao carregar os dados',
      });
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

            <Submit onPress={this.handleSubmit}>
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
    alertActions: bindActionCreators(AlertActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
