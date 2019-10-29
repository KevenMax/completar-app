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
    category: {
      name: 'Categoria 1',
      description: 'Atividades artísticas culturais e esportivas',
      amountHours: 48.5,
    },
    activities: [
      {
        id: '1',
        name: 'Evento A',
        description: 'Participação de Congresso Nacional',
        hours: 322.62,
      },
      {
        id: '2',
        name:
          'Participação de palestra sobre otimização de algoritmos com complexidade exponencial',
        description: 'UFC do campus de Russas',
        hours: 3.4,
      },
      {
        id: '3',
        name:
          'Evento/apresentação/torneio de grupo de teatro, de dança,coral, literário, musical ou esportivo',
        description: 'Empresa Júnior',
        hours: 55.4,
      },
    ],
  };

  handleOption = (id, option) => {
    alert(`A opção ${option} foi selecionada, para o id ${id}`);
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name={this.state.category.name} />
          <ChartMain percentual={this.state.percentual} props={this.props} />
          <TextDescribe>{this.state.category.description}</TextDescribe>
          <TextTime>({this.state.category.amountHours}h)</TextTime>
          <ContainerItems>
            {this.state.activities.map(activity => (
              <Item key={activity.id}>
                <TextTimeItem>{activity.hours}h</TextTimeItem>
                <ContentText>
                  <TextHeaderItem>{activity.name}</TextHeaderItem>
                  <TextDescribeItem ellipsizeMode="middle">
                    {activity.description}
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
                    onSelect={(index, option) =>
                      this.handleOption(activity.id, option)
                    }
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
            ))}
          </ContainerItems>
        </ScrollView>
        <Menu props={this.props} />
      </>
    );
  }
}
