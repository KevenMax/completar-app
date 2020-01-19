// Activity Style
import AwesomeAlert from 'react-native-awesome-alerts'
import { TextInputMask } from 'react-native-masked-text'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView`
  background: #ffffff;
  margin-bottom: 70px;
`

export const Form = styled.View`
  margin-top: 0px;
  padding: 50px;
  padding-top: 20px;
`

export const Label = styled.Text`
  font-size: 15px;
  font-family: 'Comfortaa-Regular';
  color: #989898;
  margin-top: 15px;
  margin-left: 5px;
`

export const ContainerSelect = styled.View`
  margin-top: 8px;
  background: #d1d8fa;
  border-radius: 40px;
  height: 35px;
  padding: 5px 15px;
`

export const SelectInput = styled(ModalDropdown).attrs({
  dropdownStyle: {
    width: 270,
  },
  showsVerticalScrollIndicator: true,
})``

export const ContainerTextSelect = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const TextSelectShowInput = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  color: #303030;
  font-family: 'Comfortaa-Regular';
  max-width: 270;
`

export const ArrowInput = styled(Icon).attrs({
  name: 'angle-down',
  size: 15,
  color: '#303030',
})`
  align-self: flex-end;
  text-align: right;
`

export const TextSelectInput = styled.Text`
  font-size: 15px;
  color: #303030;
  font-family: 'Montserrat-Regular';
  padding: 8px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #c3c3c3;
`

export const TextInput = styled.TextInput.attrs({
  autoCompleteType: 'off',
  autoFocus: false,
})`
  margin-top: 8px;
  padding: 5px 15px;
  height: 35px;
  color: #303030;
  background: #d1d8fa;
  border-radius: 40px;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
`

export const NumberInput = styled(TextInputMask).attrs({
  type: 'money',
  options: {
    precision: 2,
    separator: ':',
    delimiter: '.',
    unit: '',
    suffixUnit: '',
  },
  maxLength: 6,
})`
  margin-top: 8px;
  padding: 5px 15px;
  height: 35px;
  color: #303030;
  background: #d1d8fa;
  border-radius: 40px;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
`

export const FileInput = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-top: 8px;
  border: 1px #778bee;
  background: #fff;
  border-style: dashed;
  border-radius: 40px;
  height: 35px;
`

export const TextFileInput = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  font-family: 'Comfortaa-Regular';
  color: #303030;
  padding-top: 4px;
  padding-left: 15px;
  padding-right: 15px;
`
export const Submit = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin-top: 30px;
  height: 35px;
  background: #b275f4;
  border-radius: 40px;
`

export const TextSubmit = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #fff;
  padding-top: 6px;
`

export const Alert = styled(AwesomeAlert).attrs({
  titleStyle: { fontFamily: 'Comfortaa-Bold', fontSize: 17 },
  messageStyle: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
})``
