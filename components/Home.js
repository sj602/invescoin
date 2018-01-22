import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text>
            Bubble : Get notified if Bitcoin is in a BUBBLE in a simple way.
            비트코인 가격. 거품인 것 같나요? 간단한 방법으로 알아보세요!
          </Text>
        </View>
        <View style={styles.market}>
          <Text>
            Market : Compare each famous Market for various cryptocurrencies.
            국내/해외 거래소에서 여러가지 코인 시세 정보를 알아보세요!
          </Text>
        </View>
        <View style={styles.tweets}>
          <Text>
            Tweets : Keep trendy reading tweets from famous Cryptocurrency tweeterians
            트윗을 보고 급변하는 코인 소식들을 받아보세요!
          </Text>
        </View>
        <View style={styles.calendar}>
          <Text>
            Calendar : Check Cryptocurrency Events!! It is IMPORTANT to know them
            달력으로 ICO, 코인 호재 소식을 체크해보세요!
          </Text>
        </View>
        <View style={styles.donate}>
          <Text>
            Donate : Donate here :)
            개발자에게 따뜻한 온정을 베풀어주세요.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // flexDirection: 'row'
  },
  bubble: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  },
  market: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  },
  tweets: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  },
  calendar: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  },
  donate: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  }


});
