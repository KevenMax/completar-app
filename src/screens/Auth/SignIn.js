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
} from './styles';

import {ScrollView} from 'react-native';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = () => {
    this.props.navigation.navigate('Home');
  };

  handleSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
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
    );
  }
}
export default SignIn;
