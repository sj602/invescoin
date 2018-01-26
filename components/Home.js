import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='check-square-o'
              size={30}
              color='black'
            />
            <Text>Bubble</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              Get notified if Bitcoin is in a BUBBLE in a simple way.
              비트코인 가격. 거품인 것 같나요? 간단한 방법으로 알아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='money'
              size={30}
              color='green'
            />
            <Text>Market</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              Compare each famous Market for various cryptocurrencies.
              국내/해외 거래소에서 여러가지 코인 시세 정보를 알아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='twitter'
              size={30}
              color='#00aced'
            />
            <Text>Tweets</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              Keep trendy reading tweets from famous Cryptocurrency twitterians
              트윗을 보고 급변하는 코인 소식들을 받아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='calendar'
              size={30}
              color='#999999'
            />
            <Text>Calendar</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              Check Cryptocurrency Events!! It is IMPORTANT to know them
              달력으로 ICO, 코인 호재 소식을 체크해보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='smile-o'
              size={30}
              color='#ffc300'
            />
            <Text>Donate</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              Donate here :)
              개발자에게 따뜻한 온정을 베풀어주세요.
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 5
  },
  menuImage: {
    borderWidth: 2,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuText: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
