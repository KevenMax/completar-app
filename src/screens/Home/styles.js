import styled from 'styled-components/native';
export const ScrollView = styled.ScrollView`
  background: #ffffff;
  margin-bottom: 70px;
`;

export const ContainerItems = styled.View`
  align-items: center;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  margin-bottom: 20px;
  border: 1px solid #c0c0c0;
  width: 300;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Chart = styled.View`
  margin: 10px;
`;

export const TextDescribe = styled.Text`
  margin-left: 13px;
  margin-top: 15px;
  font-family: 'Comfortaa-Regular';
  font-size: 13px;
  color: #838383;
  width: 195;
  font-weight: 600;
`;

export const ChartText = styled.Text`
  font-size: 12px;
`;
