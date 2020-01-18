import React, {Component} from 'react';
import {
  ScrollView,
  ContainerItems,
  Item,
  Chart,
  TextDescribe,
  ChartText,
} from './styles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ChartMain from '../../components/ChartMain';
import AwesomeAlert from 'react-native-awesome-alerts';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as AlertActions} from '../../store/ducks/alert';
import {Creators as CategoryActions} from '../../store/ducks/category';
import api from '../../services/api';

class Home extends Component {
  state = {
    percentual: 0,
    showAlert: true,
    messageAlert: 'Carregando...',
    titleAlert: '',
    progressAlert: true,
    showButton: false,
    categoryList: [],
  };

  componentDidMount() {
    this.alert();
    this.loadCategory();
  }

  loadCategory = async () => {
    try {
      const request = await api.get('/categorias/home');
      const response = request.data;
      this.setState({
        percentual: response.percentual,
        categoryList: response.categorias,
        progressAlert: false,
        showAlert: !this.props.alert.show ? false : true,
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Ocorreu algum problema ao carregar os dados',
        showButton: true,
        progressAlert: false,
      });
    }
  };

  alert = () => {
    if (this.props.alert.show) {
      const {show, title, message} = this.props.alert;
      this.setState({
        showAlert: show,
        titleAlert: title,
        messageAlert: message,
        showButton: true,
        progressAlert: false,
      });
    }
  };

  handleConfirmAlert = () => {
    this.setState({
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
    });
    this.props.alertActions.removeAlert('');
  };

  handleCategory = id => {
    this.props.categoryActions.addCategory(id);
    this.props.navigation.navigate('Category');
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Dashboard" />
          <ChartMain percentual={this.state.percentual} props={this.props} />
          <ContainerItems>
            {this.state.categoryList.map(category => (
              <Item
                onPress={() => this.handleCategory(category.id)}
                key={category.id}>
                <Chart>
                  <AnimatedCircularProgress
                    fill={category.percentual}
                    width={7}
                    size={60}
                    lineCap="square"
                    duration={2000}
                    tintColor="#b275f4"
                    backgroundWidth={8}
                    backgroundColor="#e0e0e0">
                    {fill => <ChartText>{category.percentual}%</ChartText>}
                  </AnimatedCircularProgress>
                </Chart>
                <TextDescribe ellipsizeMode="middle">
                  {category.nome}
                </TextDescribe>
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
          showConfirmButton={this.state.showButton}
          confirmText="OK"
          confirmButtonColor="#b275f4"
          onConfirmPressed={() => this.handleConfirmAlert()}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch => {
  return {
    alertActions: bindActionCreators(AlertActions, dispatch),
    categoryActions: bindActionCreators(CategoryActions, dispatch),
  };
};

// const mapDispatchToProps = dispatch =>
//   // bindActionCreators(AlertActions, dispatch),
//   bindActionCreators(CategoryActions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
