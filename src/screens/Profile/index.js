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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as PersonActions} from '../../store/ducks/person';

class Profile extends Component {
  state = {
    person: {
      id: '1',
      name: 'Keven Max Noronha de Lima',
      nickname: 'Kevinho',
      avatar:
        'https://instagram.fjdo10-1.fna.fbcdn.net/vp/a7c70dbb22e9cf8577554ad951241c83/5E479490/t51.2885-15/e35/71713324_937268040005072_3515962860375946059_n.jpg?_nc_ht=instagram.fjdo10-1.fna.fbcdn.net&_nc_cat=108',
      matriculation: '403258',
      course: 'Engenharia de Software',
      college: 'UFC - Russas',
      contact: '(85) 98779-9928',
      requiredHours: 130.2,
      totalHours: 288.5,
    },
  };

  handleEdit = id => {
    this.props.setPerson(id);
    this.props.navigation.navigate('Edit');
  };

  render() {
    const avatarImage = this.state.person.avatar
      ? {uri: this.state.person.avatar}
      : avatar;
    return (
      <>
        <ScrollView>
          <Header name="Perfil" />
          <ContainerHeader>
            <Avatar source={avatarImage} />
            <ButttonEdit onPress={() => this.handleEdit(this.state.person.id)}>
              <Icon
                name="pencil"
                size={20}
                color="#fff"
                style={{textAlign: 'center', paddingTop: 9}}
              />
            </ButttonEdit>
          </ContainerHeader>
          <Nickname>{this.state.person.nickname}</Nickname>
          <Name>{this.state.person.name}</Name>
          <Info>
            <Item>
              <TextLabel>Matricula</TextLabel>
              <TextValue>{this.state.person.matriculation}</TextValue>
            </Item>
            <Item>
              <TextLabel>Curso</TextLabel>
              <TextValue>{this.state.person.course}</TextValue>
            </Item>
            <Item>
              <TextLabel>Campus</TextLabel>
              <TextValue>{this.state.person.college}</TextValue>
            </Item>
            <Item>
              <TextLabel>Contato</TextLabel>
              <TextValue>{this.state.person.contact}</TextValue>
            </Item>
          </Info>
          <InfoTime>
            <TimeDone>
              <Bold>{this.state.person.requiredHours} horas</Bold> realizadas
            </TimeDone>
            <Line />
            <TimePending>
              <Bold>{this.state.person.totalHours} horas</Bold> necessárias
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(PersonActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Profile);
