import styled from 'styled-components/native';
import logo from '../../assets/images/logo-azul-completa.png';
import {Platform} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: Platform.OS === 'ios',
})`
  flex: 1;
  align-items: center;
  padding: 30px;
`;
export const Logo = styled.Image.attrs({
  source: logo,
})`
  margin-top: 60px;
  width: 250;
  height: 250;
`;
export const Form = styled.View`
  margin-top: 5px;
`;
export const InputEmail = styled.TextInput.attrs({
  placeholder: 'E-mail',
  autoFocus: false,
  autoCompleteType: 'off',
  autoCapitalize: 'none',
  keyboardType: 'email-address',
})`
  background: #d1d8fa;
  width: 300;
  height: 35px;
  border: 0px solid;
  border-radius: 40px;
  text-align: center;
  font-size: 14px;
  padding: 0px;
  font-family: 'Comfortaa-Regular';
`;
export const InputPassword = styled.TextInput.attrs({
  placeholder: 'Senha',
  autoFocus: false,
  secureTextEntry: true,
})`
  margin-top: 20px;
  background: #d1d8fa;
  width: 300;
  height: 35px;
  border: 0px solid;
  border-radius: 40px;
  text-align: center;
  font-size: 14px;
  padding: 0px;
  font-family: 'Comfortaa-Regular';
`;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin-top: 30px;
  background: #9479f2;
  border-radius: 40px;
  width: 300;
  height: 35px;
  border: 0px solid;
  text-align: center;
  color: #ffffff;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  text-align: center;
  margin-top: 7px;
  font-family: 'Montserrat-Regular';
`;

export const Link = styled.Text`
  font-family: 'Comfortaa-Regular';
  color: #9479f2;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

export const Bold = styled.Text`
  font-weight: 700;
`;
