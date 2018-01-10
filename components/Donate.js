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
      return alert('Copied!')
    }
    else if(coin === 'ETH') {
      Clipboard.setString(this.state.ETH)
      return alert('Copied!')
    }
  }

  render() {
    return (
      <View>
        <Text>
          You can donate me if you get any useful information in this app.
          Click each coin to copy the address :))
        </Text>
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
    )
  }
}
