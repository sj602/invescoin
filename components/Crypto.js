import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button
} from 'react-native';

export default class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = props.coins
  }
  render() {
    return (
      <View>
        <Text>
          --- {name} prices ---
        </Text>
        <Text>
          symbol: {this.props.symbolBig}
        </Text>
        <Text>
          Bithumb: {this.props.bithumbPrice}
        </Text>
        <Text>
          Upbit: {this.props.upbitPrice}
        </Text>
        <Text>
          Bittrex: {this.props.bittrexPrice}
        </Text>

      </View>
    )
  }
}
