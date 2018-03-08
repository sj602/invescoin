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
  getGlobalMarketCap,
  getBTCPercentile,
  initCoins,
  getCoinPrice,
  getWonByDollar,
} from '../actions/index';
import * as api from '../utils/api';
import { cryptoList } from '../utils/cryptoList';
import {
  addComma3letters,
} from '../utils/helpers';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentlyDisplayed: this.props.state.market.coins
    }
  }

  componentDidMount() {
    // update info every 10 secs
    // setInterval(() => {
      this.props.getGlobalMarketCap();
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

  handleSearch(searchValue) {
    let { coins } = this.props.state.market;
    let copiedCoins = Object.keys(coins).map(key => coins[key]) // deepcopy coins to change format from object to array for mapping.
    let newlyDisplayed = copiedCoins.filter((coin) => coin.symbolBig.includes(searchValue))
    this.setState({ currentlyDisplayed: newlyDisplayed })
  }

  render() {
    let { globalMarketCap, bitcoinPercentage, wonByDollarPrice } = this.props.state.market;
    let coins = this.state.currentlyDisplayed ? this.state.currentlyDisplayed : this.props.state.market.coins;
    if(globalMarketCap) globalMarketCap = addComma3letters(globalMarketCap);

    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
        />
        <View>
          <Text>
            암호화폐 총 시가총액 : $ {globalMarketCap}
          </Text>
          <Text>
            비트코인 점유율 : {bitcoinPercentage} %
          </Text>
          <Text>
            원/달러 환율 : {wonByDollarPrice}
          </Text>
        </View>
        <TextInput
          onChangeText={(searchValue) => this.handleSearch(searchValue)}
          placeholder='검색 (예시: Bitcoin or BTC)'
        />
        <Text>개발중 : 현재 코인 시총 TOP20 만 제공됩니다.</Text>
        <ScrollView>
          {
            coins && Object.keys(coins).map((coin) => {
              return (
                <Crypto key={coin} coin={coins[coin]} name={coin.name}/>
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
  getGlobalMarketCap,
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
