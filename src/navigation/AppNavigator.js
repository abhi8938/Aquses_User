import React from 'react';
import { createAppContainer,  createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthloadingScreen from '../screens/AuthLoadingScreen';
import { AuthStack } from './StackNavigators/AuthStack';

  const AppNavigator = createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: { 
    screen: MainTabNavigator,
    navigationOptions: () => {
      return {
        header: null
      };
    }
  },
  Auth: { 
    screen: AuthStack,
    navigationOptions: () => {
      return {
      header: null
    };
  }
   },
  Authloading: { 
    screen: AuthloadingScreen,
    navigationOptions:() => {
      return {
        header:null
      };
    }
  }
}, {
  initialRouteName: 'Authloading'
}
));

export default AppNavigator;
