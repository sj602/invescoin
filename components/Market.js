import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Crypto from './Crypto';
import {
  getMarketCap,
  getBTCPercentile,
  initCoins,
  getCoinPrice,
  getWonByDollar,
  getKimchiPremium
} from '../actions/index';
import * as api from '../utils/api';
import { cryptoList } from '../utils/cryptoList';

class Market extends Component {
  state = {
    searchValue: '',
  }

  //
  // getGlobalInfoFunc() {
  //   return api.getGlobalInfo().then(data => {
  //     data.total_market_cap_usd = data.total_market_cap_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     data.bitcoin_percentage_of_market_cap = data.bitcoin_percentage_of_market_cap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({
  //       totalMarketCap : '$ ' + data.total_market_cap_usd,
  //       bitcoinPercentage: data.bitcoin_percentage_of_market_cap + '%'
  //     });
  //   });
  // }
  //
  // getMarketCapFunc(coin, currency) {
  //   return api.getMarketCap(coin, currency)
  //     .then(data => data[0]['market_cap_krw'])
  //     .then(data => {
  //       data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //       this.setState({marketCapBTC : '￦ ' + data});
  //   });
  // }


  // getCoinoneFunc() {
  //   return api.marketCoinone().then(data => {
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketCoinonePrice : '￦ ' + data});
  //   });
  // }

  // getBittrexFunc() {
  //   return api.marketBittrex().then(data => {
  //     data = data.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketBittrexPrice : '$ ' + data});
  //   })
  // }
  //
  // getWonByDollarFunc() {
  //   return api.getWonByDollar().then(data => {
  //     data = data.toFixed(0);
  //     let price = this.state.marketBittrexPrice.replace(/[\$ ,]/g, "")
  //     data = Number(data) * Number(price);
  //
  //     // Calculate Kimchi Premium
  //     let upbitPrice = Number(this.state.marketUpbitPrice.replace(/[\￦ ,]/g, ""));
  //     let kimchiPremium = upbitPrice - data;
  //     let kpPercent = '(' + (kimchiPremium / data * 100).toFixed(2).toString() + '%)';
  //     kimchiPremium = kimchiPremium.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({ kimchiPremium: '￦ ' + kimchiPremium,
  //                     kpPercent
  //                   });
  //
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({ dollarWonPrice: '￦ ' + data });
  //   })
  // }
  //
  //

  componentDidMount() {
    // update info every 10 secs
    // setInterval(() => {
      this.props.getMarketCap('bitcoin');
      this.props.getBTCPercentile();
      this.props.getWonByDollar();
    // }, 10000);
    this.fetchCrypto();
  }

  fetchCrypto() {
    for(let coin in cryptoList) {
      this.props.initCoins(cryptoList[coin]);
      this.props.getCoinPrice(cryptoList[coin]);
      // this.props.getKimchiPremium(cryptoList[coin])
    }
  }

  render() {
    let { marketCap, bitcoinPercentage, wonByDollarPrice, coins } = this.props.state.market;
    return (
      <View style={styles.container}>
        <View>
          <Text>
            -- Cryptocurrencies Global Info --
          </Text>
          <Text>
            Total Market Cap(시가총액) : $ {marketCap}
          </Text>
          <Text>
            Bitcoin Dominance(비트코인 점유율) : {bitcoinPercentage} %
          </Text>
          <Text>
            Won / Dollar ratio(원/달러 환율) : {wonByDollarPrice}
          </Text>
        </View>

        <TextInput
         value={this.state.searchValue}
         onChange={(searchValue) => this.setState({searchValue})}
         placeholder='Search a coin (e.g Bitcoin or BTC)'
        />

        <ScrollView>
          {
            coins && Object.keys(coins).map((coin) => {
              return (
                <Crypto key={coin} coin={coins[coin]} name={coin}/>
              )})
          }
        </ScrollView>


      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, {
  getMarketCap,
  getBTCPercentile,
  initCoins,
  getCoinPrice,
  getWonByDollar,
  getKimchiPremium
})(Market)

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
