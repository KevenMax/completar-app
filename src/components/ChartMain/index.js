import React, {Component} from 'react';
import {ContainerChart, FieldText} from './styles.js';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default class ChartMain extends Component {
  render() {
    return (
      <ContainerChart>
        <AnimatedCircularProgress
          fill={this.props.percentual}
          width={10}
          size={250}
          lineCap="square"
          duration={2000}
          tintColor="#b275f4"
          rotation={270}
          arcSweepAngle={180}
          backgroundWidth={8}
          backgroundColor="#e0e0e0">
          {fill => <FieldText>{this.props.percentual}%</FieldText>}
        </AnimatedCircularProgress>
      </ContainerChart>
    );
  }
}
