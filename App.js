import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Stacks } from './utils/Navigation';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { store } from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stacks />
      </Provider>
    );
  }
}
