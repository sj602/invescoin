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
          <View style={styles.symbolView}>
            <Text>
              {name}
            </Text>
            <Text>
              {coin.symbolBig}
            </Text>
          </View>
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
          <Text>
            Bitfinex: {coin.bitfinexPrice}
          </Text>
          <Text>
            김치프리미엄: {coin.kimchiPremium && coin.kimchiPremium.toFixed(2)} ({coin.kpPercent && coin.kpPercent.toFixed(2)}%)
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    margin: 5
  },
  coinImage: {
    flex:1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  symbolView: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 3
  },
  coinPrice: {
    flex:1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
