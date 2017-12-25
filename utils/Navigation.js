import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Home from '../components/Home';
import Bubble from '../components/Bubble';
import Tweets from '../components/Tweets';
import Market from '../components/Market';

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
