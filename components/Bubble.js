import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, Picker, Linking, WebView,
  TextInput, Button, StyleSheet,
  ScrollView, Alert
} from 'react-native';
import { connect } from 'react-redux';
import Chart from './Chart';
import {
  getMarketCap,
  getTransactions,
  getInflation
} from '../actions/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import * as api from '../utils/api';
import {
  addComma3letters,
  getStartDate,
  getEndDate
} from '../utils/helpers';

class Bubble extends Component {
  state = {
    coin: 'bitcoin',
    loading: true,
    keyword: 'btc usd',
    startDate: getStartDate(),
    endDate: getEndDate(),
    result: '',
    price: {},
    googleShow: false,
    showHelpTrends: false,
    NVTShow: false,
    showHelpNVT: false,
    priceRelationShow: false,
    historicBubbleShow: false,
    MVPQShow: false,
  }

  componentDidMount() {
    this.props.getMarketCap(this.state.coin);
    this.props.getTransactions();
    this.props.getInflation(8000000000000, 2000);
  }

  handleKeyword(keyword) {
    this.setState({keyword})
  }

  handleStartDate(startDate) {
    this.setState({startDate})
  }

  handleEndDate(endDate) {
    this.setState({endDate})
  }

  inputValidated() {
    let {startDate, endDate} = this.state;
    if(startDate.length !== 6 || endDate.length !== 6){
      Alert.alert(
        '날짜 형식 오류',
        '정확한 날짜를 입력해주세요.',
        [
          {text: '돌아가기'},
        ],
        { cancelable: false }
      )
      return false;
    }
    return true;
  }

  renderGoogle() {
    if(this.state.googleShow) {
      let valuesArray = this.state.result && this.state.result.map(e => e.value[0]);
      let priceArray = this.state.price && Object.keys(this.state.price).map(k => Number(this.state.price[k].toFixed(0)));
      let {startDate, endDate} = this.state;

      return (
        <View style={styles.component}>
          <View style={{flex:1, flexDirection: 'row', margin: 5}}>
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <Text style={{textAlign: 'center'}}>
                    {' '}키워드
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    style={{width: 100, height: 24}}
                    value={this.state.keyword}
                    onChangeText={(keyword) => this.handleText(keyword)}
                    textAlign='center'
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <Text style={{textAlign: 'center'}}>
                    시작일자
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    style={{width: 100, height: 24}}
                    value={this.state.startDate}
                    onChangeText={(startDate) => this.handleStartDate(startDate)}
                    placeholder='YYMMDD'
                    textAlign='center'
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <Text style={{textAlign: 'center'}}>
                    종료일자
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    style={{width: 100, height: 24}}
                    value={this.state.endDate}
                    onChangeText={(endDate) => this.handleEndDate(endDate)}
                    placeholder='YYMMDD'
                    textAlign='center'
                  />
                </View>
              </View>
            </View>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Button
                onPress={() => {
                  if(this.inputValidated()){
                    let {startDate, endDate} = this.state;
                    api.getGoogleTrendsData(this.state.keyword, startDate, endDate).then(data => this.setState({result: data.default.timelineData}));
                    api.getBitcoinPriceIndex(startDate, endDate).then(price => this.setState({price}));
                  }
                }}
                title='데이터 및 차트 산출'
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>
              키워드에 btc usd을 입력하고 차트를 산출할 시작일자와 종료일자를 입력하세요. {'\n'}
            </Text>
            { this.state.showHelpTrends
              ? (
                  <Icon.Button
                    name="question-circle"
                    backgroundColor="#3b5998"
                    onPress={() => {
                      this.setState(state => ({
                        showHelpTrends: !state.showHelpTrends
                      }))
                    }}
                  >
                    사용 방법 닫기
                  </Icon.Button>
                )
              : (
                  <Icon.Button
                    name="question-circle"
                    backgroundColor="#3b5998"
                    onPress={() => {
                      this.setState(state => ({
                        showHelpTrends: !state.showHelpTrends
                      }))
                    }}
                  >
                    사용 방법 보기
                  </Icon.Button>
              )
            }
            { this.renderHelpTrends() }
          </View>
          <View style={{borderWidth: 2}}>
            <Chart searchData={valuesArray} priceData={priceArray}/>
          </View>
          <Text>
            구글 트렌드 데이터{'\n'}
            {
              this.state.result && this.state.result.map(e => {
                return (
                  <Text style={{margin: 5}} key={e}>
                    <Text>
                      Time: {e.formattedTime} {'\n'}
                    </Text>
                    <Text>
                      Value: {e.value[0]}  {'\n'}
                    </Text>
                  </Text>
                )
            })}
          </Text>
        </View>
      )
    }
  }

  renderHelpTrends() {
    if(this.state.showHelpTrends) {
      return (
        <View style={{marin: 7}}>
          <Text>
            빅데이터의 좋은 예시로 세계보건기구보다 독감 예측을 더 빨리 했던 구글 트렌드 데이터가 많이 거론됩니다.
          </Text>
          <Text>
            이같은 방법이 비트코인 가격 예측에도 좋은 지표가 될 수 있습니다.
          </Text>
          <Text>
            예를 들어, 우리가 뭔가를 살 때는 사기 전에 그 뭔가에 대해 알아보기 시작할겁니다.
          </Text>
          <Text>
            이처럼 대중의 비트코인에 대한 검색량이 투자자들의 관심도를 나타낸다고 볼 수 있습니다.
          </Text>
          <Text>
            그리고 투자자들의 관심도가 곧, 가격으로 연결됩니다.
          </Text>
          <Text>
            구글 트렌드 데이터에 비해 가격이 너무 올라갔다하면 매도를 고려해보는 등, 이러한 방법으로 매수, 매도 타이밍을 잡을 수가 있습니다.
          </Text>
          <Text>
            각 데이터를 산출해서 나온 두 그래프를 비교해 {'\n'}
          </Text>
          <Text>
            과거 또는 현재 가격의 거품 유무를 판단할 수 있습니다.
          </Text>
        </View>
      )
    }
  }

  renderNVT() {
    if(this.state.NVTShow) {
      let { marketCap, transactionsVolume } = this.props.state.bubble.NVT_Ratio;
      let ratio = (marketCap / transactionsVolume).toFixed(2);
      let { coin } = this.state;
      let ratioText = (ratio < 50 ? `현재 ${coin}은(는) 저평가일 확률이 높습니다.` : ratio > 100 ? `현재 ${coin}은(는) 고평가일 확률이 높습니다.` : `현재 ${coin}은(는) 적정 수준일 확률이 높습니다.`);

      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                코인 선택
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Picker
                style={{width: 100, borderWidth: 1}}
                selectedValue={coin}
                onValueChange={(itemValue) => this.setState({coin: itemValue})}
                mode='dialog'
              >
                <Picker.Item label="BTC" value="bitcoin" />
                <Picker.Item label="ETH" value="ethereum" />
                <Picker.Item label="BCH" value="bitcoin-cash" />
              </Picker>
            </View>
          </View>
          <View style={{justifyContent:'center', alignItems: 'center', margin: 7}}>
            <Text>
              Network Value(시가총액) : $ {addComma3letters(marketCap)}
            </Text>
            <Text>
              Transactions Volume(전송량) : $ {addComma3letters(transactionsVolume)}
            </Text>
            <Text>
              NVT Ratio : { ratio }
            </Text>
            <Text>
              {ratioText}
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            { this.state.showHelpNVT
              ? (
                  <Icon.Button
                    name="question-circle"
                    backgroundColor="#3b5998"
                    onPress={() => {
                      this.setState(state => ({
                        showHelpNVT: !state.showHelpNVT
                      }))
                    }}
                  >
                    사용 방법 닫기
                  </Icon.Button>
                )
              : (
                  <Icon.Button
                    name="question-circle"
                    backgroundColor="#3b5998"
                    onPress={() => {
                      this.setState(state => ({
                        showHelpNVT: !state.showHelpNVT
                      }))
                    }}
                  >
                    사용 방법 보기
                  </Icon.Button>
              )
            }
            { this.renderHelpNVT() }
          </View>
        </View>
      )
    }
  }

  renderHelpNVT() {
    if(this.state.showHelpNVT) {
      return (
        <View style={{margin: 7}}>
          <Text>
            NVT Ratio는 주식시장에서의 PER와 같은 모델로 코인을 이용한 사용자들간의 실제 교환행위(Transaction volume) 대비 코인의 가격(Network Value)에 대한 수치입니다.
          </Text>
          <Text>
            PER이 Price to Earning Ratio. 회사의 시가총액을 당기순이익으로 나눈 값입니다.
          </Text>
          <Text>
            암호화페에서 당기순이익이라는 것은 측정할 수 없습니다. 기업의 목적이 이익창출이라는 점을 생각해본다면 이러한 관계는 해당 코인의 목적. 즉 사용 가치(비트코인의 경우 교환행위)가 당기순이익에 대응된다고 생각해 볼 수 있습니다.
          </Text>
          <Text>
            NVT Ratio가 50과 100 사이에 있으면 적정, 50 이하는 저평가, 100 이상은 고평가일 확률이 높습니다.
          </Text>
          <Text>
            NVT Ratio는 실시간 지표이므로 보다 정확한 분석을 위한 Moving Average 지표는 구현 중 입니다.
          </Text>
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles')}
          >
            http://woobull.com/introducing-nvt-ratio-bitcoins-pe-ratio-use-it-to-detect-bubbles/
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

  renderMVPQ() {
    if(this.state.MVPQShow){
      return (
        <View>
          <Text>
            MV = PQ (화폐수량설)
          </Text>
          <Text>
            P = (M * V) / T
          </Text>
          <Text>
            해당 토큰 가치 = 1 / P = T / (M * V)
          </Text>
          <Text>
            비트코인의 다양한 Use-Case의 중에서 국제송금시장 중 몇 퍼센트를 장악할 수 있는가?
          </Text>
          <Text>
            해당 토큰의 GDP를 토큰 회전 속도로 나눈 것.
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
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.menuComponent}>
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
                구글 트렌드 데이터 비교
              </Icon.Button>
            </TouchableOpacity>
            { this.renderGoogle() }
          </View>
          <View style={styles.menuComponent}>
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
            { this.renderNVT() }
          </View>
          <View style={styles.menuComponent}>
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
                암호화폐 가격연관성 비교
              </Icon.Button>
            </TouchableOpacity>
            { this.renderPriceRelation() }
          </View>
          <View style={styles.menuComponent}>
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
                버블 시가총액 비교
              </Icon.Button>
            </TouchableOpacity>
            { this.renderHistoricBubble() }
          </View>
          <View style={styles.menuComponent}>
            <TouchableOpacity>
              <Icon.Button
                name="bitcoin"
                backgroundColor="#3b5998"
                onPress={() => {
                  this.setState(state => ({
                    MVPQShow: !state.MVPQShow
                  }))
                }}
              >
                MV=PQ (화폐수량설) 모델
              </Icon.Button>
            </TouchableOpacity>
            { this.renderMVPQ() }
          </View>
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
  getTransactions,
  getInflation
})(Bubble)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ratioRed: {
    color: 'red'
  },
  ratioYellow: {
    color: 'yellow'
  },
  ratioGreen: {
    color: 'green'
  },
  component: {
    marginBottom: 10,
  },
  menuComponent: {
    marginBottom: 20
  }
});
