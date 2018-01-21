import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {
  getMarketCap,
  getGlobalInfo,
} from '../actions/index';
import * as api from '../utils/api';
import { cryptoList } from '../utils/cryptoList';

class Market extends Component {
  // state = {
  //   totalMarketCap: '',
  //   bitcoinPercentage: '',
  //   searchValue: '',
  //   marketCapBTC: '',
  //   marketKorbitPrice: '',
  //   marketBithumbPrice: '',
  //   marketCoinonePrice: '',
  //   marketUpbitPrice: '',
  //   marketBittrexPrice: '',
  //   dollarWonPrice: '',
  //   kimchiPremium: '',
  //   kpPercent: '',
  // }

  // componentDidMount() {
  //   // update all apis every 2 seconds
  //   setInterval(() => {
  //     this.getGlobalInfoFunc();
  //     this.getMarketCapFunc('bitcoin', 'KRW');
  //     this.fetchCrypto()
  //   }, 2000);
  // }
  //
  // fetchCrypto() {
  //   console.log(cryptoList)
  //   for(let coin in cryptoList) {
  //     // this.getKorbitFunc();
  //     this.getBithumbFunc(coin.symbolBig);
  //     // this.getCoinoneFunc();
  //     this.getUpbitFunc(coin.symbolBig);
  //     this.getBittrexFunc(coin.symbolSmall);
  //     this.getWonByDollarFunc();
  //   }
  // }
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

  // getBithumbFunc() {
  //   return api.marketBithumb().then(data => {
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketBithumbPrice : '￦ ' + data});
  //   });
  // }

  // getCoinoneFunc() {
  //   return api.marketCoinone().then(data => {
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketCoinonePrice : '￦ ' + data});
  //   });
  // }

  // getUpbitFunc() {
  //   return api.marketUpbit().then(data => {
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketUpbitPrice : '￦ ' + data});
  //   })
  // }
  //
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
    this.props.getMarketCap('bitcoin', 'KRW').then(data => data[0]['market_cap_krw'])
;
    this.props.getGlobalInfo();
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.market}
        </Text>
        <Text>
          {this.props.bitcoinPercentage}
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    market: state.market,
    bitcoinPercentage: state.bitcoinPercentage
  }
}

export default connect(mapStateToProps, {
  getMarketCap,
  getGlobalInfo
})(Market)


/*
<View>
  <Text>
    -- Cryptocurrencies Global Info --
  </Text>
  <Text>
    Total Market Cap : {this.state.totalMarketCap} {this.state.change}
  </Text>
  <Text>
    Bitcoin % of Total Market Cap : {this.state.bitcoinPercentage}
  </Text>
  <Text>
    BTC : {this.state.marketCapBTC}
  </Text>

  <ScrollView>
    <TextInput
     value={this.state.searchValue}
     onChange={(searchValue) => this.setState({searchValue})}
     placeholder='Search'
    />
    <Text>
      -- BTC Price for each exchanges --
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
  </ScrollView>

</View>

*/
