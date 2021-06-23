import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AccountScreen from '../../screens/AccountScreen';
import Icon from "react-native-vector-icons/Ionicons";
import MyAddresses from './../../screens/MyAddresses';
import MyProfileScreen from './../../screens/MyProfile';
export const AccountStack = createStackNavigator({
  Account: AccountScreen,
  navigationOptions: () => { 
    return {
      header: null
    };
  },
  profile:{
    screen:MyProfileScreen,
    navigationOptions: () => {
      return { 
        headerTitle:'My Profile',
        headerStyle:{
          elevation:0
        }
      }
    }
  },
  MyAddresses:{
    screen:MyAddresses,
    navigationOptions: () => {
      return { 
        headerTitle:'My Addresses',
        headerStyle:{
          elevation:0
        }
      }
  }
  }
}
);

AccountStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
    if (navigation.state.index == 0) {
       tabBarVisible = true;
    }
    return {
      tabBarVisible,
  tabBarIcon: ({ tintColor}) => (
    <Icon name = 'ios-person'
      color={tintColor}
      size={26} 
    />
    )
  };
};

