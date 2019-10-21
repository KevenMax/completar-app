import React, {Component} from 'react';
import {HeaderContainer, Title} from './styles';
export default class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <Title>{this.props.name}</Title>
      </HeaderContainer>
    );
  }
}
