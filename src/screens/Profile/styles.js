import styled from 'styled-components/native';
export const ScrollView = styled.ScrollView`
  background: #ffffff;
  margin-bottom: 70px;
`;

export const ContainerHeader = styled.View`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  margin-top: 40px;
  margin-left: 90px;
  width: 120;
  height: 120;
`;

export const ButttonEdit = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  border-radius: 40px;
  width: 40px;
  height: 40px;
  background: #b275f4;
  margin-left: 60px;
`;

export const Nickname = styled.Text`
  margin-top: 15px;
  font-family: 'Comfortaa-Bold';
  text-align: center;
  font-size: 22px;
  color: #b275fa;
`;

export const Name = styled.Text`
  margin-top: 3px;
  font-family: 'Comfortaa-Regular';
  text-align: center;
  font-size: 16px;
  color: #838383;
`;

export const Info = styled.View`
  padding-top: 20px;
  display: flex;
  margin: 0 40px;
`;

export const Item = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
  margin-bottom: 12px;
`;

export const TextLabel = styled.Text`
  margin-bottom: 5px;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
  color: #b275f4;
`;

export const TextValue = styled.Text`
  margin-bottom: 5px;
  font-family: 'Comfortaa-Regular';
  font-size: 14px;
  color: #838383;
`;

export const InfoTime = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const TimeDone = styled.Text`
  width: 100;
  font-size: 14px;
  color: #838383;
  font-family: 'Comfortaa-Regular';
`;

export const TimePending = styled.Text`
  width: 100;
  font-size: 14px;
  color: #838383;
  font-family: 'Comfortaa-Regular';
`;

export const Line = styled.View`
  height: 40px;
  border-right-width: 2px;
  border-right-color: #e5e5e5;
  margin: 0 30px 0 10px;
`;

export const Bold = styled.Text`
  color: #b275f4;
`;

export const ButtonLogout = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  margin-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #b275f4;
  border-radius: 5px;
  background: #fff;
  width: 320;
  height: 35px;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const TextLogout = styled.Text`
  padding-left: 10px;
  padding-top: 6px;
  font-size: 16px;
  color: #b275f4;
`;
