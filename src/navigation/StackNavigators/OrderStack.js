import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import MyOrders from '../../screens/MyOrders';

export const OrderStack = createStackNavigator({
  Order:{
    screen:MyOrders
  }
});

OrderStack.navigationOptions = {
  
  tabBarLabel: 'Orders',
  tabBarIcon: ({ tintColor}) => (
    <Icon name = 'first-order'
      color = {tintColor}
      size={24} 
    />
    )
};
