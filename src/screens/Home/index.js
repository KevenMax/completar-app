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

class Home extends Component {
  state = {
    percentual: 50,
    showAlert: false,
    messageAlert: '',
    titleAlert: '',
    categoryList: [
      {
        id: '1',
        descricao:
          'Teoria da Atividade com Trabalhos de Pesquisa e com t Cientificas voltadas para IA com enfase na estatitica do trabalho brasileiro',
        percentual: 50,
      },
      {
        id: '2',
        descricao:
          'Teoria da Atividade com Trabalhos de Pesquisa e com t Cientificas voltadas para IA com enfase na estatitica do trabalho brasileiro',
        percentual: 20,
      },
    ],
  };

  componentDidMount() {
    this.alert();
  }

  alert = () => {
    if (this.props.alert.show) {
      const {show, title, message} = this.props.alert;
      this.setState({
        showAlert: show,
        titleAlert: title,
        messageAlert: message,
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
    console.log(this.props);
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
                  {category.descricao}
                </TextDescribe>
              </Item>
            ))}
          </ContainerItems>
        </ScrollView>
        <Menu props={this.props} />
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
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
