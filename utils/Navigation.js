import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Home from '../components/Home';
import Bubble from '../components/Bubble';
import Tweets from '../components/Tweets';
import Market from '../components/Market';
import Calendar from '../components/Calendar';
import Donate from '../components/Donate';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Bubble: {
    screen: Bubble
  },
  Market: {
    screen: Market
  },
  Tweets: {
    screen: Tweets
  },
  Calendar: {
    screen: Calendar
  },
  Donate: {
    screen: Donate
  }
});

let handleDrawer = ['DrawerOpen', 'DrawerClose'];

export const Stacks = StackNavigator({
  Home: { screen: Drawer },
}, {
    navigationOptions: ({navigation}) => ({
      headerLeft:
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(handleDrawer[0])
                      handleDrawer.push(handleDrawer.shift())
                    }}
                  >
                    <Icon
                      style={{margin:10}}
                      name='bars'
                      size={20}
                      color='white'
                    />
                  </TouchableOpacity>,
      headerStyle: {
        backgroundColor: 'black',
        marginTop: 24
      },
      title: 'InvesCoin',
      headerTintColor: 'white',
    })
});
