import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button
} from 'react-native';

export default class Crypto extends Component {
  state = {
    name: '',
  }

  render() {
    return (
      <View>
        <Text>
          -- {this.state.name} Price for each exchanges --
        </Text>
        <Text>
          Bithumb : {this.state.marketBithumbPrice}
        </Text>
        <Text>
          Upbit : {this.state.marketUpbitPrice}
        </Text>
        <Text>
          해외 시세
        </Text>
        <Text>
          달러 가격(Bittrex) : {this.state.marketBittrexPrice}
        </Text>
        <Text>
          달러 가격(원) : {this.state.dollarWonPrice}
        </Text>
        <Text>
          김치 프리미엄 : {this.state.kimchiPremium} {this.state.kpPercent}
        </Text>
      </View>
    )
  }
}
