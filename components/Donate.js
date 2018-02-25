import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Clipboard,
  Animated,
} from 'react-native';

export default class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC: '1APTUw7u8AjDMfFvqqUypDqSmC4pS5E43R',
      ETH: '0xc0f7E9129158f2A73d63ee13F171Dd8Afad9cA19',
      x: new Animated.Value(100)
    }
  }

  aniClick() {
    Animated.spring(
      this.state.x,
      {toValue: 200}
    ).start();
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
            더 좋은 인베스코인이 되기 위해 노력하겠습니다.
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
        <TouchableOpacity
          onPress={() => this.aniClick()}
        >
          <Animated.View style={{backgroundColor: 'red',
                                 height: 40, width: this.state.x}}>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}
