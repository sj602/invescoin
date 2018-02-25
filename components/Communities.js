import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, WebView,
  ActivityIndicator, Platform, StyleSheet,
  Button, ScrollView, Image, Linking
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getRedditData,
  getDdengleData,
  getClienData,
  getDCBData,
} from '../actions/index';
import * as api from '../utils/api';

class Communities extends Component {
  state = {
    selectSites: ''
  }

  componentDidMount() {
  }

  renderContents() {
    const { selectSites } = this.state;

    switch(selectSites) {
      case 'dcb':
        const { dcb } = this.props.state.communities;

        return (
          <ScrollView>
            <Text>
              디시인사이드 비트코인 갤러리에서 최신글을 가져옵니다.
            </Text>
            {
              dcb && Object.keys(dcb).map(k => {
                if( k !== '0' && k !== '1' && k.length < 3 ) {
                  const title = dcb[k]['title'];
                  const hits = dcb[k]['hits'];
                  const data = dcb[k]['data'];
                  const score = dcb[k]['score'];
                  const comments = dcb[k]['comments'];

                  return (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(data)}
                    >
                      <View
                        style={{flex:1, margin: 5, flexDirection: 'row', borderWidth: 1}}
                        key={reddit[k]}
                      >
                        <View
                          style={{flex:1, margin: 3, flexDirection: 'column'}}
                        >
                          <View
                            style={{flex:1, height: 75, justifyContent: 'center'}}
                          >
                            <Text>
                              <Icon
                                name='star'
                                size={12}
                                color='gold'
                              />
                              {hits}
                            </Text>
                            <Text>
                              <Icon
                                name='comment'
                                size={12}
                                color='grey'
                              />
                              {comments}
                            </Text>
                            <Text>
                              <Icon
                                name='thumbs-up'
                                size={12}
                                color='lightblue'
                              />
                              {score}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{flex: 4, justifyContent: 'center', alignItems: 'center', width: 200, height: 150}}
                        >
                          <Text>
                            {title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })
            }
          </ScrollView>
        )

      case 'red':
        const { reddit } = this.props.state.communities;

        return (
          <ScrollView>
            <Text>
              레딧 비트코인 커뮤니티에서 인기글을 가져옵니다.
            </Text>
            {
              reddit && Object.keys(reddit).map(k => {
                if( k !== '0' && k !== '1' && k.length < 3 ) {
                  const title = reddit[k]['title'];
                  const rank = reddit[k]['rank'];
                  const data = reddit[k]['data'];
                  const thumbnail = reddit[k]['thumbnail'];
                  const noThumbnail = 'https://i.kinja-img.com/gawker-media/image/upload/s--QDsnSglL--/c_fill,fl_progressive,g_north,h_264,q_80,w_470/ytzaorwdu0e7byvs7zmn.jpg';
                  const score = reddit[k]['score'];
                  const comments = reddit[k]['comments'];

                  return (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(data)}
                    >
                      <View
                        style={{flex:1, margin: 5, flexDirection: 'row', borderWidth: 1}}
                        key={reddit[k]}
                      >
                        <View
                          style={{flex:1, margin: 3, flexDirection: 'column'}}
                        >
                          <View
                            style={{flex:1, borderWidth: 1, height: 75}}
                          >
                            <Image
                              style={{flex:1}}
                              source={{uri: thumbnail ? 'https:' + thumbnail : noThumbnail}}
                            />
                          </View>
                          <View
                            style={{flex:1, height: 75, justifyContent: 'center'}}
                          >
                            <Text>
                              <Icon
                                name='star'
                                size={12}
                                color='gold'
                              />
                              {rank}
                            </Text>
                            <Text>
                              <Icon
                                name='comment'
                                size={12}
                                color='grey'
                              />
                              {comments}
                            </Text>
                            <Text>
                              <Icon
                                name='thumbs-up'
                                size={12}
                                color='lightblue'
                              />
                              {score}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{flex: 4, justifyContent: 'center', alignItems: 'center', width: 200, height: 150}}
                        >
                          <Text>
                            {title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })
            }
          </ScrollView>
        )
      case 'ddg':
        const { ddengle } = this.props.state.communities;

        return (
          <ScrollView>
            <Text>
              땡글에서 추천글을 가져옵니다.
            </Text>
            { ddengle && Object.keys(ddengle).map(k => {
              const title = ddengle[k]['title'];
              const data = ddengle[k]['data'];
              const likes = ddengle[k]['likes'];
              const hits = ddengle[k]['hits'];
              const comments = ddengle[k]['comments'];
              const timestamp = ddengle[k]['timestamp'];

              return (
                <TouchableOpacity
                  onPress={() => Linking.openURL(data)}
                >
                  <View
                    style={{flex:1, margin: 5, flexDirection: 'row', borderWidth: 1}}
                    key={ddengle[k]}
                  >
                    <View
                      style={{flex:1, margin: 3, flexDirection: 'column'}}
                    >
                      <View
                        style={{flex:1, height: 75, justifyContent: 'center'}}
                      >
                        <Text>
                          <Icon
                            name='comment'
                            size={12}
                            color='grey'
                          />
                          {comments}
                        </Text>
                        <Text>
                          <Icon
                            name='thumbs-up'
                            size={12}
                            color='lightblue'
                          />
                          {likes}
                        </Text>
                        <Text>
                          <Icon
                            name='eye'
                            size={12}
                            color='black'
                          />
                          {hits}
                        </Text>
                        <Text style={{fontSize:8}}>
                          {timestamp}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}
                    >
                      <Text>
                        {title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

              )
            })}

          </ScrollView>
        )
      case 'cla':
        const { clien } = this.props.state.communities;

        return (
          <ScrollView>
            <Text>
              클리앙 가상화폐당에서 공감순으로 게시물을 가져옵니다.
            </Text>
            { clien && Object.keys(clien).map(k => {
              const title = clien[k]['title'];
              const data = clien[k]['data'];
              const score = clien[k]['score'];
              const hits = clien[k]['hits'];
              const comments = clien[k]['comments'];
              const timestamp = clien[k]['timestamp'];

              return (
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://clien.net' + data)}
                >
                  <View
                    style={{flex:1, margin: 5, flexDirection: 'row'}}
                    key={clien[k]}
                  >
                    <View
                      style={{flex:1, margin: 3, flexDirection: 'column'}}
                    >
                      <View
                        style={{flex:1, height: 75, justifyContent: 'center'}}
                      >
                        <Text>
                          <Icon
                            name='comment'
                            size={12}
                            color='grey'
                          />
                          {comments}
                        </Text>
                        <Text>
                          <Icon
                            name='thumbs-up'
                            size={12}
                            color='lightblue'
                          />
                          {score}
                        </Text>
                        <Text>
                          <Icon
                            name='eye'
                            size={12}
                            color='black'
                          />
                          {hits}
                        </Text>
                        <Text style={{fontSize:8}}>
                          {timestamp}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}
                    >
                      <Text>
                        {title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

              )
            })}
          </ScrollView>
        )
      default:
        return (
          <ScrollView>
          </ScrollView>
        )
    }
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

    return (
      <View>
        <View>
          <Button
            onPress={() => {
              this.props.getDCBData();
              this.setState({ selectSites: 'dcb' })
            }}
            title='디시인사이드 비트코인 갤러리 (개발중)'
          />
        </View>
        <View>
          <Button
            onPress={() => {
              this.props.getDdengleData();
              this.setState({ selectSites: 'ddg' })
            }}
            title='땡글'
          />
        </View>
        <View>
          <Button
            onPress={() => this.setState({ selectSites: 'cip' })}
            title='코인판 (회원제)'
          />
        </View>
        <View>
          <Button
          onPress={() => {
            this.props.getClienData();
            this.setState({ selectSites: 'cla' })
          }}
            title='클리앙'
          />
        </View>
        <View>
          <Button
            onPress={() => {
              this.props.getRedditData();
              this.setState({ selectSites: 'red' })
            }}
            title='레딧'
          />
          {this.renderContents()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
};

export default connect(mapStateToProps, {
  getRedditData,
  getDdengleData,
  getClienData,
  getDCBData,
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
