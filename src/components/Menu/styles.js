import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  height: 70;
  background: #ffffff;
  border-top-color: #f5f5f5;
  border-top-width: 2px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const OptionsMenu = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 6px 20px;
`;
