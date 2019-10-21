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
  Bold,
} from './styles';

import {ScrollView} from 'react-native';

class SignIn extends Component {
  state = {
    email: '',
    senha: '',
  };

  handleLogin = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Container>
          <Logo />
          <Form>
            <InputEmail onChangeText={text => this.setState({email: text})} />
            <InputPassword
              onChangeText={text => this.setState({senha: text})}
            />
            <Button onPress={this.handleLogin}>
              <ButtonText>ENTRAR</ButtonText>
            </Button>
            <Link>
              Ainda não tem conta? <Bold>Cadastre-se!</Bold>
            </Link>
          </Form>
        </Container>
      </ScrollView>
    );
  }
}
export default SignIn;
