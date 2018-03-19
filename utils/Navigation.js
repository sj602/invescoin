import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Home from '../components/Home';
import Bubble from '../components/Bubble';
import Tweets from '../components/Tweets';
import Market from '../components/Market';
import Calendar from '../components/Calendar';
import Communities from '../components/Communities';
import Donate from '../components/Donate';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: '홈',
    }
  },
  Bubble: {
    screen: Bubble,
    navigationOptions: {
      title: '가치평가',
    }
  },
  Market: {
    screen: Market,
    navigationOptions: {
      title: '코인 시세',
    }
  },
  Tweets: {
    screen: Tweets,
    navigationOptions: {
      title: '트윗',
    }
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      title: 'ICO|호재',
    }
  },
  Communities: {
    screen: Communities,
    navigationOptions: {
      title: '모아보기',
    }
  },
  Donate: {
    screen: Donate,
  }
});

let handleDrawer = ['DrawerOpen', 'DrawerClose'];

export const Stacks = StackNavigator({
  Home: { screen: Drawer },
}, {
    initialRouteName: 'Home',
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
        backgroundColor: 'rgb(36,36,36)',
        marginTop: 24
      },
      title: 'InvesCoin',
      headerTintColor: 'white',
    })
});
