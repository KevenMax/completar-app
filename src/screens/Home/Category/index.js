/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
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
  TextOption,
  TextOptionDanger,
} from './styles';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import ChartMain from '../../../components/ChartMain';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../../services/api';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as CategoryActions} from '../../../store/ducks/category';

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
  };

  componentDidMount() {
    this.loadCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category.description !== this.state.category.description) {
      this.loadActivities();
    }
  }

  loadActivities = async () => {
    try {
      const request = await api.get(
        `/horas_complementares?categoria_id=${this.props.category.category_id}`,
      );
      const response = request.data.data;
      console.log(response);
      this.setState({
        activities: response,
        showAlert: false,
        progressAlert: false,
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar a Categoria',
        buttonAlert: true,
        progressAlert: false,
      });
    }
  };

  loadCategory = async () => {
    try {
      const request = await api.get(
        `/categorias/${this.props.category.category_id}`,
      );
      const response = request.data;
      this.setState({
        percentual: response.percentual,
        category: {
          name: response.categoria.numero,
          description: response.categoria.nome,
          amountHours: response.categoria.limite_carga_horaria,
        },
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar a Categoria',
        buttonAlert: true,
        progressAlert: false,
      });
    }
  };

  handleOption = (id, option) => {
    alert(`A opção ${option} foi selecionada, para o id ${id}`);
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name={`Categoria ${this.state.category.name}`} />
          <ChartMain percentual={this.state.percentual} props={this.props} />
          <TextDescribe>{this.state.category.description}</TextDescribe>
          <TextTime>({this.state.category.amountHours}h)</TextTime>
          <ContainerItems>
            {this.state.activities.map(activity => (
              <Item key={activity.id}>
                <TextTimeItem>
                  {activity.attributes['quantidade-horas']}h
                </TextTimeItem>
                <ContentText>
                  <TextHeaderItem>
                    {activity.relationships.atividade.data.nome}
                  </TextHeaderItem>
                  <TextDescribeItem ellipsizeMode="middle">
                    {activity.attributes.descricao}
                  </TextDescribeItem>
                </ContentText>

                <OptionItem>
                  <ModalDropdown
                    options={['Download do anexo', 'Excluir']}
                    dropdownTextStyle={{
                      fontSize: 13,
                      fontFamily: 'Comfortaa-Regular',
                      color: '#838383',
                    }}
                    onSelect={(index, option) =>
                      this.handleOption(activity.id, option)
                    }
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{
                      width: 160,
                      height: 85,
                      padding: 0,
                      margin: 0,
                    }}>
                    <Icon name="ellipsis-v" size={30} color="#b275f4" />
                  </ModalDropdown>
                </OptionItem>
              </Item>
            ))}
          </ContainerItems>
        </ScrollView>
        <Menu props={this.props} />
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={this.state.progressAlert}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={this.state.buttonAlert}
          confirmText="OK"
          confirmButtonColor="#b275f4"
          onConfirmPressed={() => this.setState({showAlert: false})}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoryActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
