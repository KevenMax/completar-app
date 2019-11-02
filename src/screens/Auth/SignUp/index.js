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
  Title,
  Alert,
} from './styles';

import {ScrollView} from 'react-native';
import api from '../../../services/api';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as UserActions} from '../../../store/ducks/user';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  };

  handleSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  handleRegister = async () => {
    const {email, password, passwordConfirmation} = this.state;
    if (!email || !password || !passwordConfirmation) {
      this.setState({
        showAlert: true,
        titleAlert: 'Preencha todos os campos',
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
      });
    } else if (password !== passwordConfirmation) {
      this.setState({
        showAlert: true,
        titleAlert: 'Senha incorreta',
        messageAlert: 'Senha e confirmação de senha devem ser iguais!',
      });
    } else {
      try {
        const request = await api.post('/auth', {
          email,
          password,
          password_confirmation: passwordConfirmation,
        });
        const response = request.data.data;
        this.props.setUser(response.id);
        this.props.navigation.navigate('Create');
      } catch (err) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          messageAlert:
            err.response &&
            err.response.data &&
            err.response.data.errors &&
            err.response.data.errors.full_messages
              ? err.response.data.errors.full_messages[0]
              : 'Verifique sua conexão com a internet',
        });
      }
    }
  };

  render() {
    return (
      <>
        <ScrollView style={{backgroundColor: '#fff'}}>
          <Container>
            <Logo />
            <Title>Cadastre-se hoje, é gratuito!</Title>
            <Form>
              <InputEmail onChangeText={text => this.setState({email: text})} />
              <InputPassword
                onChangeText={text => this.setState({password: text})}
                placeholder="Senha"
              />
              <InputPassword
                onChangeText={text =>
                  this.setState({passwordConfirmation: text})
                }
                placeholder="Confirmação de Senha"
              />
              <Button onPress={this.handleRegister}>
                <ButtonText>CADASTRAR</ButtonText>
              </Button>
              <Link onPress={this.handleSignIn}>
                <LinkText>Entrar</LinkText>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
