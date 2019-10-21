import React, {Component} from 'react';
import {MenuContainer, OptionsMenu} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Menu extends Component {
  render() {
    return (
      <MenuContainer>
        <OptionsMenu
          onPress={() => this.props.props.navigation.navigate('Home')}>
          <Icon name="bar-chart" size={30} color="#b275f4" />
        </OptionsMenu>

        <OptionsMenu
          onPress={() => this.props.props.navigation.navigate('Activity')}>
          <Icon name="pencil" size={30} color="#b275f4" />
        </OptionsMenu>

        <OptionsMenu
          onPress={() => this.props.props.navigation.navigate('Profile')}>
          <Icon name="user" size={30} color="#b275f4" />
        </OptionsMenu>
      </MenuContainer>
    );
  }
}
