import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Bubble from '../components/Bubble';
import Tweets from '../components/Tweets';
import Market from '../components/Market';
import Calendar from '../components/Calendar';
import Balance from '../components/Balance';
import Donate from '../components/Donate';

export const Drawer = DrawerNavigator({
  Home: {
    screen: Home
    // navigationOptions: {
    //   drawerIcon:
    // }
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

export const Stacks = StackNavigator({
  Home: { screen: Drawer },
},
{
  navigationOptions: {
    headerStyle: {backgroundColor: 'black'},
    title: 'InvesCoin',
    headerTintColor: 'white',
}
});
