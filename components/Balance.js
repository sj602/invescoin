import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Button
} from 'react-native';
import * as api from '../utils/api';

export default class Balance extends Component {
  state = {
    address: '',
    balance: '',
  }

  render() {
    return (
      <View>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(address) => this.setState({address})}
        value={this.state.address}
        />
        <TouchableOpacity>
          <Button
            onPress={() => {
              api.getBalance('1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp')
              .then(balance => this.setState({ balance }))
            }}
            title='Check the balance'
          />
        </TouchableOpacity>
        <Text>
          It usually takes about 10 seconds to get data from the server
          so just WAIT even if there is nothing happened.
        </Text>
        <Text>
          {this.state.balance} satoshis
        </Text>
      </View>
    )
  }
}
