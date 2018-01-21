import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Crypto from './Crypto';
import {
  getMarketCap,
  getGlobalInfo,
  getCoinPrice,
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

  // getKorbitFunc() {
  //   return api.marketKorbit(data => {
  //     this.setState({marketKorbitPrice: '￦ ' + data});
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
      this.props.getGlobalInfo();
    // }, 10000);
    this.fetchCrypto();
  }

  fetchCrypto() {
    for(let coin in cryptoList) {
      this.props.getCoinPrice(cryptoList[coin]);
    //   this.getWonByDollarFunc();
    }
  }

  // renderCrypto() {
  //   return (
  //     <Crypto />
  //   )
  // }


  render() {
    let { marketCap, bitcoinPercentage } = this.props.state.market;

    return (
      <View>
        <Text>
          -- Cryptocurrencies Global Info --
        </Text>
        <Text>
          Total Market Cap : {marketCap}
        </Text>
        <Text>
          Bitcoin % of Total Market Cap : {bitcoinPercentage}
        </Text>

        <ScrollView>
          <TextInput
           value={this.state.searchValue}
           onChange={(searchValue) => this.setState({searchValue})}
           placeholder='Search'
          />

          <Crypto coins={this.props.state.market.coins}/>
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
  getGlobalInfo,
  getCoinPrice,
})(Market)
