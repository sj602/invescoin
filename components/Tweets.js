import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  Image, FlatList, Linking,
  TouchableOpacity,
} from 'react-native';
import * as api from '../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Tweets extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    return api.getTweets().then(data => this.setState({data}))
  }

  renderItem(item) {
    return (
      <View key={"tweets"+item['id']} style={styles.tweetComponent}>
        <TouchableOpacity
          onPress={() => Linking.openURL(item['entities']['urls'][0]['expanded_url'])}
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
                <Text style={{flex: 1}}>
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
                size={10}
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
                size={10}
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
                size={10}
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

    return (
      <View style={styles.container}>
        <FlatList
           key={"twitter"}
           data={data}
           renderItem={ ({item}) => this.renderItem(item) }
        />
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
    borderWidth: 1
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
  },
  tweetText: {
    flex: 1,
  }
});
