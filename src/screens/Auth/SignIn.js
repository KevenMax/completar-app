import React, {Component} from 'react';
import {
  Container,
  Logo,
  Form,
  InputEmail,
  InputPassword,
  Button,
  ButtonText,
  Link,
  LinkText,
  Bold,
  Alert,
} from './styles';
import api from '../../services/api';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as UserActions} from '../../store/ducks/user';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  };

  handleLogin = async () => {
    const {email, password} = this.state;
    if (!email || !password) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Preencha e-mail e senha para continuar',
      });
    } else {
      try {
        const request = await api.post('/auth', {email, password});
        const user = request.data;
        const token = request.headers.token;

        this.props.setUser(user);
        await AsyncStorage.setItem('token', `${token}`);

        this.props.navigation.navigate('Home');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          this.setState({
            showAlert: true,
            titleAlert: 'Ops...',
            messageAlert:
              err.response && err.response.data && err.response.data.error
                ? err.response.data.error
                : '',
          });
        }
      }
    }
  };

  handleSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <>
        <ScrollView style={{backgroundColor: '#fff'}}>
          <Container>
            <Logo />
            <Form>
              <InputEmail onChangeText={text => this.setState({email: text})} />
              <InputPassword
                onChangeText={text => this.setState({password: text})}
              />
              <Button onPress={this.handleLogin}>
                <ButtonText>ENTRAR</ButtonText>
              </Button>
              <Link onPress={this.handleSignUp}>
                <LinkText>
                  Ainda não tem conta? <Bold>Cadastre-se!</Bold>
                </LinkText>
              </Link>
            </Form>
          </Container>
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
  user: state.user,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
