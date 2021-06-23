import React from 'react';
import SignIn from '../../screens/auth/SignIn';
import SignUp from '../../screens/auth/SignUp';
import { createStackNavigator } from 'react-navigation';
import ForgotPassword from './../../screens/auth/ForgotPassword';
export const AuthStack = createStackNavigator({ 
  
    SignIn: {
      screen: SignIn,
      navigationOptions: () => {
        return {
        header: null
      };
    }
    },
    Register: {
      screen: SignUp,
      navigationOptions: () => {
        return {
        headerTitle:'Register now'
      };
    }
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: () => {
        return {
        headerTitle: 'Forgot Password'
      };
    }
    },
  });
  AuthStack.navigationOptions = {
    navigationOptions: () => {
      return {
      header: null
    };
  } };