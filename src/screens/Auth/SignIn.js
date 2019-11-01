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

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  };

  // async componentDidMount() {
  // const user = ;
  // if (await AsyncStorage.getItem('@userId')) {
  //   this.props.navigation.navigate('Home');
  // }
  // AsyncStorage.getItem('@userId').then(user => {
  //   if (user) {
  //     this.props.navigation.navigate('Home');
  //   }
  // });
  // }

  handleLogin = async () => {
    const {email, password} = this.state;
    if (!email || !password) {
      this.setState({
        showAlert: true,
        titleAlert: 'Preencha todos os campos',
        messageAlert:
          'Para realizar o cadastro preencha todo os campos do formulário',
      });
    } else {
      try {
        const request = await api.post('/auth/sign_in', {email, password});
        const response = request.data.data;
        await AsyncStorage.setItem('@userId', `${response.id}`);
        this.props.navigation.navigate('Home');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          this.setState({
            showAlert: true,
            titleAlert: 'Ops... Ocorreu algum problema',
            messageAlert:
              err.response && err.response.data && err.response.data.errors
                ? err.response.data.errors[0]
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
export default SignIn;
