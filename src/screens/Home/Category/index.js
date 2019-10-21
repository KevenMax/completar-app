/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  TextDescribe,
  TextTime,
  ContainerItems,
  Item,
  TextTimeItem,
  ContentText,
  TextHeaderItem,
  TextDescribeItem,
  OptionItem,
  TextOption,
  TextOptionDanger,
} from './styles';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import ChartMain from '../../../components/ChartMain';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Category extends Component {
  state = {
    percentual: 80,
  };

  handleOption = (index, option) => {
    alert(`A opção ${option} foi selecionada, com o indíce ${index}`);
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Categoria 1" />
          <ChartMain percentual={this.state.percentual} props={this.props} />
          <TextDescribe>
            Atividades artísticas culturais e esportivas
          </TextDescribe>
          <TextTime>(48.0h)</TextTime>
          <ContainerItems>
            <Item>
              <TextTimeItem>55.4h</TextTimeItem>
              <ContentText>
                <TextHeaderItem>
                  Evento/apresentação/torneio de grupo de teatro, de dança,
                  coral, literário, musical ou esportivo
                </TextHeaderItem>
                <TextDescribeItem ellipsizeMode="middle">
                  Empresa Júnior com Gilberto Júnior
                </TextDescribeItem>
              </ContentText>

              <OptionItem>
                <ModalDropdown
                  options={['Download do anexo', 'Excluir']}
                  dropdownTextStyle={{
                    fontSize: 13,
                    fontFamily: 'Comfortaa-Regular',
                    color: '#838383',
                  }}
                  onSelect={(index, option) => this.handleOption(index, option)}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={{
                    width: 160,
                    height: 85,
                    padding: 0,
                    margin: 0,
                  }}>
                  <Icon name="ellipsis-v" size={30} color="#b275f4" />
                </ModalDropdown>
              </OptionItem>
            </Item>

            <Item>
              <TextTimeItem>55.4h</TextTimeItem>
              <ContentText>
                <TextHeaderItem>
                  Evento/apresentação/torneio de grupo de teatro, de dança,
                  coral, literário, musical ou esportivo
                </TextHeaderItem>
                <TextDescribeItem ellipsizeMode="middle">
                  Empresa Júnior com Gilberto Júnior
                </TextDescribeItem>
              </ContentText>

              <OptionItem>
                <ModalDropdown
                  options={['Download do anexo', 'Excluir']}
                  dropdownTextStyle={{
                    fontSize: 13,
                    fontFamily: 'Comfortaa-Regular',
                    color: '#838383',
                  }}
                  onSelect={(index, option) => this.handleOption(index, option)}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={{
                    width: 160,
                    height: 85,
                    padding: 0,
                    margin: 0,
                  }}>
                  <Icon name="ellipsis-v" size={30} color="#b275f4" />
                </ModalDropdown>
              </OptionItem>
            </Item>
          </ContainerItems>
        </ScrollView>
        <Menu props={this.props} />
      </>
    );
  }
}
