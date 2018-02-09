import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import {
  getRedditData,
} from '../actions/index';
import * as api from '../utils/api';

class Communities extends Component {
  state = {
    selectSites: ''
  }

  componentDidMount() {
    this.props.getRedditData();
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
    const { selectSites } = this.state;
    const { reddit } = this.props.state.communities;
    reddit && console.log(reddit)
    if(selectSites === '') {
      return (
        <View>
          <Button
            onPress={() => this.setState({ selectSites: 'dc' })}
            title='디시인사이드 가상화폐 갤러리'
          />
          <Button
            onPress={() => this.setState({ selectSites: 'dcb' })}
            title='디시인사이드 비트코인 갤러리'
          />
          <Button
            onPress={() => this.setState({ selectSites: 'dca' })}
            title='디시인사이드 알트코인 갤러리'
          />
          <Button
            onPress={() => this.setState({ selectSites: 'ddg' })}
            title='땡글'
          />
          <Button
            onPress={() => this.setState({ selectSites: 'cip' })}
            title='코인판'
          />
          <Button
            onPress={() => this.setState({ selectSites: 'cla' })}
            title='클리앙'
          />

          <View>
          </View>
        </View>
      )
    }

    else if(selectSites === 'dcg') {
      return (
        <WebView
          source={{uri: 'http://gall.dcinside.com/mgallery/board/lists/?id=ecoin'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }

    else if(selectSites === 'dcb'){
      return (
        <WebView
          source={{uri: 'http://gall.dcinside.com/board/lists/?id=bitcoins'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }
    else if(selectSites === 'dca'){
      return (
        <WebView
          source={{uri: 'http://gall.dcinside.com/mgallery/board/lists/?id=coin'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }
    else if(selectSites === 'ddg'){
      return (
        <WebView
          source={{uri: 'https://www.ddengle.com/'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }
    else if(selectSites === 'cip'){
      return (
        <WebView
          source={{uri: 'https://coinpan.com/'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }
    else if(selectSites === 'cla'){
      return (
        <WebView
          source={{uri: 'https://www.clien.net/service/board/cm_vcoin'}}
          renderLoading={this.showLoadingView}
          startInLoadingState={true}
          style={styles.WebViewStyle}
        />
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
};

export default connect(mapStateToProps, {
  getRedditData
})(Communities);

const styles = StyleSheet.create(
  {
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
