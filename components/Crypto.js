import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button, Image
} from 'react-native';

export default class Crypto extends Component {
  render() {
    const { coin, name } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.coinImage}>
          <Image
            source={coin.img}
            style={{width: 30, height: 30}}
          />
          <Text>
            {name}
          </Text>
          <Text>
            {coin.symbolBig}
          </Text>
        </View>
        <View style={styles.coinPrice}>
          <Text>
            빗썸: {coin.bithumbPrice}
          </Text>
          <Text>
            업비트: {coin.upbitPrice}
          </Text>
          <Text>
            Bittrex: {coin.bittrexPrice}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row'
  },
  coinImage: {
    flex:1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 10
  },
  coinPrice: {
    flex:3,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
