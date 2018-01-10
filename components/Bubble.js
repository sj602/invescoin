import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

export default class Bubble extends Component {
  state = {
    googleShow: false,
    NVCShow: false,
    priceRelationShow: false,
    uri: 'https://www.sifrdata.com/wp-content/uploads/CommunityGraph90.jpeg?t=1515421610',
  }

  renderGoogle() {
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
    if(this.state.NVCShow) {
      return (
        <View>
          <Text>
            NVC Chart
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
              uri: this.state.uri,
              width: width,
              height: 200,
            }}
          />
          <Picker
            selectedValue={this.state.uri}
            onValueChange={(itemValue) => this.setState({uri: itemValue})}
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
                NVCShow: !state.NVCShow
              }))
            }}
          >
            NVC
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
