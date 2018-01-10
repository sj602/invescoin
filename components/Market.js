import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as api from '../utils/api';

export default class Market extends Component {
  state = {
    totalMarketCap: '',
    bitcoinPercentage: '',
    marketCapBTC: '',
    marketKorbitPrice: '',
    marketBithumbPrice: '',
    marketCoinonePrice: '',
    marketUpbitPrice: '',
    marketBittrexPrice: '',
    dollarWonPrice: '',
    kimchiPremium: '',
    kpPercent: '',
  }

  componentDidMount() {
    // setInterval(() => {
      this.getGlobalInfoFunc();
      this.getMarketCapFunc('bitcoin');
      // this.getKorbitFunc();
      this.getBithumbFunc();
      // this.getCoinoneFunc();
      this.getUpbitFunc();
      this.getBittrexFunc();
      this.getWonByDollarFunc();
    // }, 2000);
  }

  getGlobalInfoFunc() {
    return api.getGlobalInfo().then(data => {
      data.total_market_cap_usd = data.total_market_cap_usd.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      data.bitcoin_percentage_of_market_cap = data.bitcoin_percentage_of_market_cap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({
        totalMarketCap : '$ ' + data.total_market_cap_usd,
        bitcoinPercentage: data.bitcoin_percentage_of_market_cap + '%'
      });
    });
  }

  getMarketCapFunc(coin) {
    return api.getMarketCap(coin).then(data => {
      data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({marketCapBTC : '￦ ' + data});
    });
  }

  // getKorbitFunc() {
  //   return api.marketKorbit(data => {
  //     this.setState({marketKorbitPrice: '￦ ' + data});
  //   });
  // }

  getBithumbFunc() {
    return api.marketBithumb().then(data => {
      data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({marketBithumbPrice : '￦ ' + data});
    });
  }

  // getCoinoneFunc() {
  //   return api.marketCoinone().then(data => {
  //     data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  //     this.setState({marketCoinonePrice : '￦ ' + data});
  //   });
  // }

  getUpbitFunc() {
    return api.marketUpbit().then(data => {
      data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({marketUpbitPrice : '￦ ' + data});
    })
  }

  getBittrexFunc() {
    return api.marketBittrex().then(data => {
      data = data.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({marketBittrexPrice : '$ ' + data});
    })
  }

  getWonByDollarFunc() {
    return api.getWonByDollar().then(data => {
      data = data.toFixed(0);
      let price = this.state.marketBittrexPrice.replace(/[\$ ,]/g, "")
      data = Number(data) * Number(price);

      // Calculate Kimchi Premium
      let upbitPrice = Number(this.state.marketUpbitPrice.replace(/[\￦ ,]/g, ""));
      let kimchiPremium = upbitPrice - data;
      let kpPercent = '(' + (kimchiPremium / data * 100).toFixed(2).toString() + '%)';
      kimchiPremium = kimchiPremium.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({ kimchiPremium, kpPercent });

      data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({ dollarWonPrice: '￦ ' + data });
    })
  }


  render() {
    return (
      <View>
        <Text>
          -- Cryptocurrencies Global Info --
        </Text>
        <Text>
          Total Market Cap : {this.state.totalMarketCap}
        </Text>
        <Text>
          Bitcoin % of Total Market Cap : {this.state.bitcoinPercentage}
        </Text>
        <Text>
          BTC : {this.state.marketCapBTC}
        </Text>

        <TouchableOpacity>
          <View>
            <Text>
              BCH
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>
              ETH
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>
              ETC
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>
              NEM
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>
              LTC
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>
              IOTA
            </Text>
          </View>
        </TouchableOpacity>



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
          달러 가격 : {this.state.marketBittrexPrice}
        </Text>
        <Text>
          달러 가격(원) : {this.state.dollarWonPrice}
        </Text>
        <Text>
          김치 프리미엄 : {this.state.kimchiPremium} {this.state.kpPercent}
        </Text>

      </View>
    )
  }
}
