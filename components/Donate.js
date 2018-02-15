import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Clipboard
} from 'react-native';

export default class Donate extends Component {
  state = {
    BTC: '1APTUw7u8AjDMfFvqqUypDqSmC4pS5E43R',
    ETH: '0xc0f7E9129158f2A73d63ee13F171Dd8Afad9cA19'
  }

  click(coin) {
    if(coin === 'BTC') {
      Clipboard.setString(this.state.BTC)
      return alert('Copied!', 'Thank you for your donation')
    }
    else if(coin === 'ETH') {
      Clipboard.setString(this.state.ETH)
      return alert('Copied!', 'Thank you for your donation')
    }
  }

  render() {
    return (
      <View>
        <View>
          <Text>
            이 앱을 통해 유용한 정보를 얻으셨으면 조금이나마 감사의 표시를 해주세요!
            아래 비트코인과 이더리움 주소를 누르시면 클립보드에 복사됩니다. :))
          </Text>
        </View>
        <View style={{margin: 20}}>
          <TouchableOpacity onPress={() => this.click('BTC')}>
            <Text>
              BTC : {this.state.BTC}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.click('ETH')}>
            <Text>
              ETH : {this.state.ETH}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
