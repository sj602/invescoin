import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import Home from '../components/Home';
import Bubble from '../components/Bubble';
import Tweets from '../components/Tweets';
import Market from '../components/Market';
import Calendar from '../components/Calendar';
import Balance from '../components/Balance';
import Donate from '../components/Donate';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Bubble: {
    screen: Bubble
  },
  Tweets: {
    screen: Tweets
  },
  Market: {
    screen: Market
  },
  Calendar: {
    screen: Calendar
  },
  Balance: {
    screen: Balance
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
                  <TouchableOpacity>
                    <Icon
                      style={{margin:10}}
                      name='bars'
                      size={20}
                      color='white'
                      onPress={() => {
                        navigation.navigate(handleDrawer[0])
                        handleDrawer.push(handleDrawer.shift())
                      }}
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
