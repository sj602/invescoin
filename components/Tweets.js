import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  Image, FlatList, Linking,
  TouchableOpacity, ScrollView, WebView,
  Modal, TouchableHighlight
} from 'react-native';
import * as api from '../utils/api';
import {
  tweetList,
  peopleList,
} from '../utils/tweetList';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Tweets extends Component {
  state = {
    data: [],
    isModalVisible: false,
  }

  // componentDidMount() {
  //   return api.getTweets().then(data => this.setState({data}))
  // }

  renderModal() {
    return (
      <View style={styles.modalContent}>
        <View>
          <Text>Hello World!</Text>
          <TouchableHighlight
            onPress={() => {
              this.setState((state) => {isModalVisible: !state.isModalVisible});
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderPeople() {
    return peopleList.map(person => {
      return (
        <TouchableOpacity
          /* onPress={() => this.setState({isModalVisible: true}) } */
          onPress={() => api.getTweets(person.name).then(data => this.setState({data}))}
          key={person.name}
        >
          <View
            style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5}}
            key={person.name}
          >
            <Text
              style={{textAlign: 'center', fontSize: 8}}
              key={person.name}
            >
              {person.name}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

  renderCoins() {
    return tweetList.map(coin => {
      return (
        <View
          style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5}}
          key={coin.symbolBig}
        >
          <Image
            source={coin.img}
            style={{width: 15, height: 15}}
          />
          <Text style={{textAlign: 'center', fontSize: 8}}>
            {coin.symbolBig}
          </Text>
        </View>
      )
    })
  }

  renderTweets(item) {
    return (
      <View key={"tweets"+item['id']} style={styles.tweetComponent}>
        <TouchableOpacity
          onPress={() => {
            return (
              <WebView
                source={{uri: `https://twitter.com/${item['user']['screen_name']}/status/${item['id_str']}`}}
                style={{flex: 1}}
              />
            )
          }}
        >
          <View style={styles.tweetContents}>
            <View style={styles.tweetImg}>
              <Image
                style={{width: 50, height: 50, borderRadius: 30, marginTop: 5}}
                source={{uri: item['user']['profile_image_url']}}
              />
            </View>
            <View style={styles.tweetBody}>
              <View style={styles.tweetBodyInfo}>
                <Text style={{flex: 1}}>
                  {item['user']['name']}
                </Text>
                <Text style={{flex: 1, fontSize: 8}}>
                  @{item['user']['screen_name']}
                </Text>
                <Text style={{flex: 1, fontSize: 8}}>
                  {item['created_at']}
                </Text>
              </View>
              <View style={styles.tweetText}>
                <Text>
                  {item['text']}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.tweetSocial}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="comments"
                size={15}
              />
              <Text>
                댓글
              </Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="retweet"
                color="green"
                size={15}
              />
              <Text>
                {item['retweet_count']}
              </Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="heart"
                color="red"
                size={15}
              />
              <Text>
                {item['favorite_count']}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { data } = this.state;
    console.log(this.state.isModalVisible)
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => this.setState({isModalVisible: false})}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          {this.renderModal()}
        </Modal>
        <View style={{flex: 1}}>
          <ScrollView
            horizontal={true}
            style={{flex: 1, maxHeight: 40}}
          >
            {this.renderCoins()}
          </ScrollView>
          <ScrollView
            horizontal={true}
            style={{flex: 1, maxHeight: 40}}
          >
            {this.renderPeople()}
          </ScrollView>
        </View>
        <View style={{flex: 7}}>
          <FlatList
             key={"twitter"}
             data={data}
             renderItem={ ({item}) => this.renderTweets(item) }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  tweetComponent: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey'
  },
  tweetContents: {
    flex: 1,
    flexDirection: 'row',
  },
  tweetSocial: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  tweetImg: {
    flex: 1,
    alignItems: 'center',
  },
  tweetBody: {
    flex: 4,
  },
  tweetBodyInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  tweetText: {
    flex: 1,
  },
  modalContent: {
   backgroundColor: 'white',
   padding: 22,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 4,
   borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
