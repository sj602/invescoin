import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, Picker, Linking, WebView,
  TextInput, Button, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  getMarketCap,
  getTransactions,
  getInflation
} from '../actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import * as api from '../utils/api';
import { addComma3letters } from '../utils/helpers';

class Bubble extends Component {
  state = {
    loading: true,
    keyword: '',
    result: '',
    googleShow: false,
    NVTShow: false,
    priceRelationShow: false,
    historicBubbleShow: false,
  }

  componentDidMount() {
    this.props.getMarketCap('bitcoin');
    this.props.getTransactions();
    this.props.getInflation(8000000000000, 2000);
  }

  handleText(text) {
    this.setState({keyword: text})
  }

  renderGoogle() {
    if(this.state.googleShow) {
      return (
        <View>
          <View>
            <TextInput
             value={this.state.keyword}
             onChangeText={(text) => this.handleText(text)}
             placeholder='keyword'
            />
            <Button
              onPress={() => {
                console.log('keyword: ', this.state.keyword)
                return api.getGoogleTrendsData(this.state.keyword)
              }}
                // this.setState({
                // result: api.getGoogleTrendsData(this.state.keyword)
              title='Find'
            />
          </View>
          <Text>
            Google Trends Result for {this.state.keyword}: {this.state.result}
          </Text>
        </View>
      )
    }
  }

  renderNVC() {
    if(this.state.NVTShow) {
      let { marketCap, transactionsVolume } = this.props.state.bubble.NVT_Ratio;
      let ratio = (marketCap / transactionsVolume).toFixed(2);
      let ratioText = (ratio < 50 ? '현재 저평가 되었습니다.' : ratio > 100 ? '현재 고평가 되었습니다.' : '현재 적정 수준입니다.');

      return (
        <View>
          <View style={{justifyContent:'center', alignItems: 'center'}}>
            <Text>
              Network Value : $ {addComma3letters(marketCap)}
            </Text>
            <Text>
              Transactions Volume : $ {addComma3letters(transactionsVolume)}
            </Text>
            <Text>
              NVT Ratio : { ratio }
            </Text>
            <Text>
              {ratioText}
            </Text>
          </View>
          <View>
            <Text>
              NVT Ratio는 주식시장에서의 PER와 같은 모델로 실제 비트코인을 이용한 사용자들간의 교환행위 대비 비트코인의 가격에 대한 수치입니다.
            </Text>
            <Text>
              NVT Ratio가 50과 100 사이에 있으면 적정, 50 이하는 저평가, 100 이상은 고평가일 확률이 높습니다.
            </Text>
            <Text>
              NVT Ratio는 실시간 지표이며 보다 정확한 분석을 위한 Moving Average 지표는 구현 중 입니다.
            </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles')}
            >
              http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles/
            </Text>
          </View>
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

  renderHistoricBubble() {
    if(this.state.historicBubbleShow){
      return (
        <View>
          <Text>
            역사적인 경제 버블 크기 비교입니다. 현재의 인플레이션율로 계산되었습니다.
          </Text>
          <Text>
            닷컴버블
            연도 : 2000
            크기 : $ {addComma3letters(this.props.state.bubble.historicBubble.adjustedValue)}
          </Text>
          <Text>
            암호화폐
            연도 : 2009 ~
            크기 : $ {addComma3letters(this.props.state.bubble.NVT_Ratio.marketCap)}
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

        <TouchableOpacity>
          <Icon.Button
            name="bitcoin"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState(state => ({
                historicBubbleShow: !state.historicBubbleShow
              }))
            }}
          >
            Comparing the size of historic bubbles
          </Icon.Button>
        </TouchableOpacity>
        { this.renderHistoricBubble() }

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
  getTransactions,
  getInflation
})(Bubble)


const styles = StyleSheet.create({
  ratioRed: {
    color: 'red'
  },
  ratioYellow: {
    color: 'yellow'
  },
  ratioGreen: {
    color: 'green'
  }
});
