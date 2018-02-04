import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput, StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Crypto from './Crypto';
import { Loader } from './Loader';
import {
  getMarketCap,
  getBTCPercentile,
  initCoins,
  getCoinPrice,
  getWonByDollar,
} from '../actions/index';
import * as api from '../utils/api';
import { cryptoList } from '../utils/cryptoList';
import { addComma3letters } from '../utils/helpers';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      loading: false,
      currentlyDisplayed: this.props.state.market.coins
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('completed');
  // }

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
    }
  }

  handleSearch(e) {
    let { coins } = this.props.state.market;
    let newlyDisplayed = coins.filter((coin) => coin.symbolBig.includes('BTC'))
    this.setState({
      searchValue: e.target.value,
      currentlyDisplayed: newlyDisplayed
    })
  }

  render() {

    let { marketCap, bitcoinPercentage, wonByDollarPrice, coins } = this.props.state.market;
    // let coins = this.state.currentlyDisplayed;
    if(marketCap) marketCap = addComma3letters(marketCap);

    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
        />
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
         onChange={(e) => this.handleSearch(e)}
         placeholder='Search a coin (e.g Bitcoin or BTC)'
        />
        <Text>개발중 : 현재 코인 시총 TOP20 만 제공됩니다.</Text>
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
})(Market)

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
