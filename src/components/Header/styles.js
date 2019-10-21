import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const HeaderContainer = styled(LinearGradient).attrs({
  colors: ['#b275f4', '#cba1f7'],
  start: {x: 1, y: 1},
  end: {x: 0, y: 0},
})`
  height: 80;
  justify-content: center;
  border-bottom-color: #b275f4;
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  font-size: 23px;
  color: #ffffff;
  text-align: center;
  font-family: 'Comfortaa-Bold';
`;
