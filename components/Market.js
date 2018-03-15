import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput, StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Crypto from './Crypto';
import Help from './Help';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentlyDisplayed: this.props.state.market.coins,
      isModalVisible: false,
    }
  }

  componentDidMount() {
    // update info every 5 secs
    // setInterval(() => {
      this.props.getGlobalMarketCap();
      this.props.getBTCPercentile();
      this.props.getWonByDollar();
    // }, 10000);
    this.fetchCrypto();
  }

  fetchData() {
    this.props.getGlobalMarketCap();
    this.props.getBTCPercentile();
    this.props.getWonByDollar();
    this.fetchCrypto();
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  fetchCrypto() {
    for(let coin in cryptoList) {
      if(!this.props.state.market.coins) this.props.initCoins(cryptoList[coin]);
      this.props.getCoinPrice(cryptoList[coin]);
    }
  }

  handleSearch(searchValue) {
    let { coins } = this.props.state.market;
    let copiedCoins = Object.keys(coins).map(key => coins[key]); // deepcopy coins to change format from object to array for mapping.
    let newlyDisplayed = copiedCoins.filter((coin) => {
      return coin.symbolBig.toLowerCase().includes(searchValue) || coin.name.toLowerCase().includes(searchValue)
    });
    this.setState({ currentlyDisplayed: newlyDisplayed });
  }

  render() {
    let { globalMarketCap, bitcoinPercentage, wonByDollarPrice } = this.props.state.market;
    let coins = this.state.currentlyDisplayed ? this.state.currentlyDisplayed : this.props.state.market.coins;

    return (
      <View style={styles.container}>
        <View style={{flex: 1, maxHeight: 80, flexDirection: 'row'}}>
          <View style={{flex: 14}}>
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
          <View style={styles.functionImg}>
            <TouchableOpacity
              onPress={() => this.fetchData()}
            >
              <Icon
                name="comment-question-outline"
                color="black"
                size={25}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.fetchData()}
            >
              <Icon
                name="sync"
                color="black"
                size={25}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            style={{height: 28}}
            onChangeText={(searchValue) => this.handleSearch(searchValue)}
            placeholder='검색 (예시: btc or bitcoin)'
          />
          <Text>개발중 : 현재 주요 코인만 제공됩니다.</Text>
        </View>
        <ScrollView>
          {
            coins
            &&
            Object.keys(coins).map(coin => {
              return (
                <Crypto key={coin} coin={coins[coin]} name={coins[coin].name}/>
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
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  functionImg: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1}
});
