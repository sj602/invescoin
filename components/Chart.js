import React, { Component } from 'react';
import {
  LineChart,
  YAxis,
} from 'react-native-svg-charts';
import Svg, { Line } from 'react-native-svg';
import {
  View, Dimensions,
  StyleSheet, Text,
  ActivityIndicator,
} from 'react-native';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    this.setState({isLoading: false});
  }

  render() {
    let { width, height } = Dimensions.get('window');
    let searchData = this.props.searchData;
    let priceData = this.props.priceData;
    const contentInset = { top: 20, bottom: 20 };

    const {isLoading} = this.state;

    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={ { width, height: height-100, flexDirection: 'row'} }>
          {isLoading && (
             <ActivityIndicator
                size="large"
             />
          )}
          <YAxis
            data={priceData}
            contentInset={ contentInset }
            svg={{
               fill: 'red',
               fontSize: 10,
            }}
            formatLabel={value => {
              value = value.toString().split("")
              value = value.filter(n => value.indexOf(n) < value.length - 3).join("")
              value == '10000' ? value = '10' : value // Exception : when value is '10000', it appeared '10000', not '10' for no reason.
              return `$ ${value}K`
            } }
          />
          <View style={{flex:1}}>
            <LineChart
                 style={{flex:1}}
                 data={searchData}
                 svg={{stroke:'green'}}
                 contentInset={contentInset}
                 showGrid={false}
            />
            <LineChart
                 style={StyleSheet.absoluteFill}
                 data={priceData}
                 svg={{stroke:'red'}}
                 contentInset={contentInset}
                 showGrid={false}
            />
          </View>
          <YAxis
             data={searchData}
             contentInset={contentInset}
             svg={{
                 fill: 'green',
                 fontSize: 10,
             }}
             formatLabel={value => `${value}`}
          />
        </View>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Svg
                height="40"
                width="100"
              >
              <Line
                x1="10"
                y1="20"
                x2="90"
                y2="20"
                stroke="red"
                strokeWidth="1"
              />
              </Svg>
            </View>
            <View style={{flex:1}}>
              <Text style={{textAlign: 'center'}}>
                비트코인 가격 데이터
              </Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Svg
                height="50"
                width="100"
              >
              <Line
                x1="10"
                y1="20"
                x2="90"
                y2="20"
                stroke="green"
                strokeWidth="1"
              />
              </Svg>
            </View>
            <View style={{flex:1}}>
              <Text style={{textAlign: 'center'}}>
                구글 트렌드 {'  '}{'  '}데이터
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Chart;
