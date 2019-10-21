import React, {Component} from 'react';
import {
  ScrollView,
  ContainerHeader,
  Avatar,
  ButttonEdit,
  Nickname,
  Name,
  Info,
  Item,
  TextLabel,
  TextValue,
  InfoTime,
  TimeDone,
  TimePending,
  Bold,
  Line,
  ButtonLogout,
  TextLogout,
} from './styles';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import avatar from '../../assets/images/avatar.png';

export default class Profile extends Component {
  render() {
    return (
      <>
        <ScrollView>
          <Header name="Perfil" />
          <ContainerHeader>
            <Avatar source={avatar} />
            <ButttonEdit onPress={() => this.props.navigation.navigate('Edit')}>
              <Icon
                name="pencil"
                size={20}
                color="#fff"
                style={{textAlign: 'center', paddingTop: 9}}
              />
            </ButttonEdit>
          </ContainerHeader>
          <Nickname>Kevinho</Nickname>
          <Name>Keven Max Noronha de Lima</Name>
          <Info>
            <Item>
              <TextLabel>Matricula</TextLabel>
              <TextValue>403258</TextValue>
            </Item>
            <Item>
              <TextLabel>Curso</TextLabel>
              <TextValue>Engenharia de Software</TextValue>
            </Item>
            <Item>
              <TextLabel>Campus</TextLabel>
              <TextValue>UFC - Russas</TextValue>
            </Item>
            <Item>
              <TextLabel>Contato</TextLabel>
              <TextValue>(85) 98779-9928</TextValue>
            </Item>
          </Info>
          <InfoTime>
            <TimeDone>
              <Bold>130,0 horas</Bold> realizadas
            </TimeDone>
            <Line />
            <TimePending>
              <Bold>288,0 horas</Bold> necessárias
            </TimePending>
          </InfoTime>
          <ButtonLogout
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <TextLogout>
              SAIR <Icon name="sign-out" size={20} color="#b275f4" />
            </TextLogout>
          </ButtonLogout>
        </ScrollView>
        <Menu props={this.props} />
      </>
    );
  }
}
