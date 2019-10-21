import React, {Component} from 'react';
import {
  ScrollView,
  ContainerItems,
  Item,
  Chart,
  TextDescribe,
  ChartText,
} from './styles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ChartMain from '../../components/ChartMain';

class Home extends Component {
  state = {
    percentual: 50,
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header name="Dashboard" />
          <ChartMain percentual={this.state.percentual} props={this.props} />
          <ContainerItems>
            <Item onPress={() => this.props.navigation.navigate('Category')}>
              <Chart>
                <AnimatedCircularProgress
                  fill={this.state.percentual}
                  width={7}
                  size={60}
                  lineCap="square"
                  duration={2000}
                  tintColor="#b275f4"
                  backgroundWidth={8}
                  backgroundColor="#e0e0e0">
                  {fill => <ChartText>{this.state.percentual}%</ChartText>}
                </AnimatedCircularProgress>
              </Chart>
              <TextDescribe ellipsizeMode="middle">
                Teoria da Atividade com Trabalhos de Pesquisa e com t
                Cientificas voltadas para IA com enfase na estatitica do
                trabalho brasileiro
              </TextDescribe>
            </Item>
          </ContainerItems>
        </ScrollView>
        <Menu props={this.props} />
      </>
    );
  }
}
export default Home;
