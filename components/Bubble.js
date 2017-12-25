import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Bubble extends Component {
  state = {
    googleShow: false,
    NVCShow: false,
  }

  renderGoogle() {
    if(this.state.googleShow) {
      return (
        <View>
          <Text>
            google trends
          </Text>
        </View>
      )
    }
  }

  renderNVC() {
    if(this.state.NVCShow) {
      return (
        <View>
          <Text>
            NVC Chart
          </Text>
        </View>
      )
    }
  }


  render() {
    return (
      <View>
        <TouchableOpacity>
          <Icon.Button
            name="google"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState((state) => ({
                googleShow: !state.googleShow
              }))
            }}
          >
            Google Trends
          </Icon.Button>
        </TouchableOpacity>
        { this.renderGoogle() }

        <TouchableOpacity>
          <Icon.Button
            name="area-chart"
            backgroundColor="#3b5998"
            onPress={() => {
              this.setState((state) => ({
                NVCShow: !state.NVCShow
              }))
            }}
          >
            NVC
          </Icon.Button>
        </TouchableOpacity>
        { this.renderNVC() }
      </View>
    )
  }
}
