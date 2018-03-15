import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button
} from 'react-native';

export default class Calendar extends Component {
  state = {
    selectCalendar: ''
  }

  showLoadingView() {
    return (
      <ActivityIndicator
       color='#009688'
       size='large'
       style={styles.ActivityIndicatorStyle}
      />
    )
  }

  render() {
    const { selectCalendar } = this.state;

    if(selectCalendar === '') {
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.setState({ selectCalendar: 'coin' })}
            title='코인 호재 달력'
          />
          <Button
            onPress={() => this.setState({ selectCalendar: 'ICO' })}
            title='ICO 달력'
          />
          <Button
            onPress={() => this.setState({ selectCalendar: 'scam' })}
            title='스캠 코인 확인'
          />
        </View>
      )
    }

    else if(selectCalendar === 'coin') {
      return (
        <WebView
          source={{uri: 'http://coinmarketcal.com/'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }

    else if(selectCalendar === 'ICO'){
      return (
        <WebView
          source={{uri: 'https://cryptorated.com/ico-calendar/'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }

    else if(selectCalendar === 'scam'){
      return (
        <WebView
          source={{uri: 'https://deadcoins.com'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  WebViewStyle: {
     justifyContent: 'center',
     alignItems: 'center',
     flex:1,
     marginTop: (Platform.OS) === 'ios' ? 20 : 0
  },
  ActivityIndicatorStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  }
});
