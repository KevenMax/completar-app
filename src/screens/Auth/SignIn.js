import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'

import AsyncStorage from '@react-native-community/async-storage'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import api from '/services/api'
import { Creators as UserActions } from '/store/ducks/user'

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
} from './styles'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
  }

  handleLogin = async () => {
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({
        showAlert: true,
        titleAlert: 'Ops...',
        messageAlert: 'Preencha e-mail e senha para continuar',
      })
    } else {
      try {
        const request = await api.post('/auth', { email, password })
        const user = request.data
        const token = request.headers.token

        this.props.setUser(user)
        await AsyncStorage.setItem('token', `${token}`)

        this.props.navigation.navigate('Home')
      } catch (err) {
        this.setState({
          showAlert: true,
          titleAlert: 'Ops...',
          messageAlert:
            err.response && err.response.data && err.response.data.error
              ? err.response.data.error
              : 'Verifique sua conexão com a internet',
        })
      }
    }
  }

  handleSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    const { showAlert, titleAlert, messageAlert } = this.state

    return (
      <>
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <Container>
            <Logo />

            <Form>
              <InputEmail
                onChangeText={text => this.setState({ email: text })}
              />

              <InputPassword
                onChangeText={text => this.setState({ password: text })}
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
          show={showAlert}
          showProgress={false}
          title={titleAlert}
          message={messageAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText='OK, entendi'
          confirmButtonColor='#b275f4'
          onConfirmPressed={() => {
            this.setState({ showAlert: false })
          }}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

SignIn.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
}
