import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button, Image
} from 'react-native';
import { addComma3letters } from '../utils/helpers';

export default class Crypto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    // setTimeout(() => {
    //   this.setState({loading: false})
    // }, 8000)
  }



  renderBithumbPrice(coin) {
    return (
      <Text>
        빗썸: {coin.bithumbPrice && addComma3letters(coin.bithumbPrice)}
      </Text>
    )
  }

  renderUpbitPrice(coin) {
    return (
      <Text>
        업비트: {coin.upbitPrice && addComma3letters(coin.upbitPrice)}
      </Text>
    )
  }

  renderBittrexPrice(coin) {
    return (
      <Text>
        Bittrex: {coin.bittrexPrice && addComma3letters(coin.bittrexPrice)}
      </Text>
    )
  }

  renderBitfinexPrice(coin) {
    return (
      <Text>
        Bitfinex: {coin.bitfinexPrice && addComma3letters(coin.bitfinexPrice)}
      </Text>
    )
  }

  render() {
    const { coin, name } = this.props;
    // <Loader loading={this.state.loading}/>
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
          <View style={styles.coinPrice}>
            { coin.bithumbPrice ? this.renderBithumbPrice(coin) : null}
            { coin.upbitPrice ? this.renderUpbitPrice(coin) : null}
            { coin.bittrexPrice ? this.renderBittrexPrice(coin) : null}
            { coin.bitfinexPrice ? this.renderBitfinexPrice(coin) : null}
            <Text>
              김치프리미엄: {coin.kimchiPremium && addComma3letters(coin.kimchiPremium.toFixed(0))} ({coin.kpPercent && coin.kpPercent}%)
            </Text>
          </View>
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
