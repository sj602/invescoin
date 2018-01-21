import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, Picker, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import * as api from '../utils/api';

export default class Bubble extends Component {
  state = {
    marketCap: '',
    transactionsVolume: '',
    googleShow: false,
    NVTShow: false,
    priceRelationShow: false,
    priceRelationUri: 'https://www.sifrdata.com/wp-content/uploads/CommunityGraph90.jpeg?t=1515421610',
  }

  getMarketCapFunc(coin, currency) {
    return api.getMarketCap(coin, currency)
      .then(data => data[0]['market_cap_usd'])
      .then(data => {
        // data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        this.setState({marketCap : data});
    });
  }

  getTransactionsVolume(coin) {
    return api.getTransactions(coin).then(data => {
      this.setState({transactionsVolume: data});
    })
  }

  renderGoogle() {
    // const googleTrends = require('google-trends-api')
    if(this.state.googleShow) {
      return (
        <View>
          <Text>
            Google Trends Result for : btc usd
          </Text>
        </View>
      )
    }
  }

  renderNVC() {
    if(this.state.NVTShow) {
      this.getMarketCapFunc('bitcoin', 'USD');
      this.getTransactionsVolume('bitcoin');
      let { marketCap, transactionsVolume } = this.state;
      // marketCap = marketCap.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      // transactionsVolume = transactionsVolume.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      let ratio = (marketCap / transactionsVolume).toFixed(2);


      return (
        <View>
          <Text>
            NVT Ratio Chart
            Before using NVT Ratio Chart, Go read the explanation of NVT Ratio
            reference:
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles')}
            >
              http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles/
            </Text>
          </Text>
          <Text>
            Network Value : $ {marketCap}
          </Text>
          <Text>
            Transactions Volume : $ {transactionsVolume}
          </Text>
          <Text>
            NVT Ratio : { ratio }
          </Text>
          <Text>
            Caution: This is just a simple metric so dont overestimate it.
          </Text>
        </View>
      )
    }
  }

  renderPriceRelation() {
    if(this.state.priceRelationShow) {
      const { width } = Dimensions.get('window');
      return (
        <View>
          <Image
            source={{
              uri: this.state.priceRelationUri,
              width: width,
              height: 200,
            }}
          />
          <Picker
            selectedValue={this.state.priceRelationUri}
            onValueChange={(itemValue) => this.setState({priceRelationUri: itemValue})}
            mode='dialog'
          >
            <Picker.Item label="90-Day Graph" value="https://www.sifrdata.com/wp-content/uploads/CommunityGraph90.jpeg?t=1515421610" />
            <Picker.Item label="180-Day Graph" value="https://www.sifrdata.com/wp-content/uploads/CommunityGraph180.jpeg?t=1515421610" />
            <Picker.Item label="365-Day Graph" value="https://www.sifrdata.com/wp-content/uploads/CommunityGraph365.jpeg?t=1515421610" />
          </Picker>
          <Text>
            reference : https://www.sifrdata.com/cryptocurrency-correlation-graph/
          </Text>
          <Text>
            BTC = Bitcoin, ETH = Ethereum, BCH = Bitcoin Cash, XRP = Ripple, LTC = Litecoin, DASH = Dash, XMR = Monero, XEM = NEM, ETC = Ethereum Classic, XLM = Stellar Lumens, ZEC = Zcash, NXT = Nxt, REP = Augur, LSK = Lisk, FCT = Factom, GLD = SPDR Gold Shares.
          </Text>
        </View>
      )
    }
  }


  render() {
    return (
      <View>
        <TouchableOpacity>
          <Icon.Button
            name="google"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState(state => ({
                googleShow: !state.googleShow
              }))
            }}
          >
            Google Trends
          </Icon.Button>
        </TouchableOpacity>
        { this.renderGoogle() }

        <TouchableOpacity>
          <Icon.Button
            name="area-chart"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState(state => ({
                NVTShow: !state.NVTShow
              }))
            }}
          >
            NVT Ratio
          </Icon.Button>
        </TouchableOpacity>
        { this.renderNVC() }

        <TouchableOpacity>
          <Icon.Button
            name="bitcoin"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState(state => ({
                priceRelationShow: !state.priceRelationShow
              }))
            }}
          >
            Cryptocurrency Correlation Graph
          </Icon.Button>
        </TouchableOpacity>
        { this.renderPriceRelation() }
      </View>
    )
  }
}


// const styles = StyleSheet.create({
//   ratioRed: {
//     color: 'red'
//   },
//   ratioGreen: {
//     color: 'green'
//   }
// });
//
