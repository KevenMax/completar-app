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

  handleRegister = () => {
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
      this.props.navigation.navigate('Home');
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

export default SignUp;
