import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='check-square-o'
              size={50}
              color='black'
            />
            <Text>가치평가</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              {' '}비트코인 가격. 거품인 것 같나요? {'\n'}
              {' '} 다양한 툴로 간단하게 알아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='money'
              size={50}
              color='green'
            />
            <Text>코인 시세</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              {'   '} 국내/해외 거래소에서 {'\n'}
              코인 시세 정보를 알아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='twitter'
              size={50}
              color='#00aced'
            />
            <Text>트윗</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              {'  '} 진정한 코인러들을 위한 {'\n'}
              해외발 트윗을 챙겨드립니다!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='calendar'
              size={50}
              color='#999999'
            />
            <Text>ICO|호재</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              ICO, 코인 호재 소식을 체크해보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon1
              name='message-bulleted'
              size={50}
              color='#ffc300'
            />
            <Text>모아보기</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              {'          '} 여러 코인 커뮤니티에서 {'\n'}
              인기있는 게시물을 한번에 모아보세요!
            </Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuImage}>
            <Icon
              name='smile-o'
              size={50}
              color='#fa6446'
            />
            <Text>Donate</Text>
          </View>
          <View style={styles.menuText}>
            <Text>
              개발자에게 따뜻한 온정을 베풀어주세요!
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
  },
  menuImage: {
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
