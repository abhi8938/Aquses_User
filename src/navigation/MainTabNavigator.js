import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';
import { HomeStack } from './StackNavigators/HomeStack';
import { AccountStack } from './StackNavigators/AccountStack';
import { OrderStack } from './StackNavigators/OrderStack';
export default createAppContainer(createMaterialBottomTabNavigator({
  HomeScreen: {
    screen: HomeStack
  },
  OrderScreen: {
    screen: OrderStack
    
  },
  AccountScreen: {
    screen: AccountStack,
  }
}, {
  initialRouteName: 'HomeScreen',
  shifting:false,
  labeled:false,
  activeColor: '#2196F3',
  inactiveColor: '#999999',
  barStyle: {
    backgroundColor: '#ffffff',
  },
}));