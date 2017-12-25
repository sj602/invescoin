import React, { Component } from 'react';
import { Stacks } from './utils/Navigation';
import {
  StyleSheet, Text, View
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Stacks />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
