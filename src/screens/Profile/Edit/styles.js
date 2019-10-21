import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView`
  background: #ffffff;
  margin-bottom: 70px;
`;
export const Form = styled.View`
  margin-top: 0px;
  padding: 50px;
  padding-top: 20px;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-family: 'Comfortaa-Regular';
  color: #989898;
  margin-top: 15px;
  margin-left: 5px;
`;

export const ContainerSelect = styled.View`
  margin-top: 8px;
  background: #d1d8fa;
  border-radius: 40px;
`;
export const SelectInput = styled.Picker`
  height: 35px;
  color: #303030;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
  margin-left: 8px;
`;

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
`;

export const NumberInput = styled.TextInput.attrs({
  autoCompleteType: 'off',
  autoFocus: false,
  keyboardType: 'decimal-pad',
})`
  margin-top: 8px;
  padding: 5px 15px;
  height: 35px;
  color: #303030;
  background: #d1d8fa;
  border-radius: 40px;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
`;

export const FileInput = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-top: 8px;
  border: 1px #778bee;
  background: #fff;
  border-style: dashed;
  border-radius: 40px;
  height: 35px;
`;

export const TextFileInput = styled.Text`
  font-size: 14px;
  font-family: 'Comfortaa-Regular';
  color: #303030;
  padding-top: 4px;
  padding-left: 15px;
  padding-right: 15px;
`;
export const Submit = styled.TouchableOpacity`
  margin-top: 30px;
  height: 35px;
  background: #b275f4;
  border-radius: 40px;
`;

export const TextSubmit = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #fff;
  padding-top: 6px;
`;
