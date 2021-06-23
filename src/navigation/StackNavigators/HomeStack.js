import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../screens/HomeScreen';
import OrderScreen2 from '../../screens/OrderScreen2';
import OrderScreen1 from '../../screens/OrderScreen1'
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SelectStack } from './SelectStack';
import PaymentScreen from '../../screens/PaymentScreen';
import Success from './../../screens/Success';
export const HomeStack = createStackNavigator({
  Home:HomeScreen,
  navigationOptions: () => { 
    return {
      header:null
    };
  },
  success:{
   screen:Success,
   navigationOptions: () => { 
    return {
      header:null
    };
  }
  },
 
  Select:{
    screen:SelectStack,
   navigationOptions: () => {
      return{ 
        header:null,
      }
  }
  },
  Order1:{
    screen:OrderScreen1,
    navigationOptions: () => {
      return { 
        headerTitle:'Review Order',
        headerStyle:{
          elevation:0,
          width:'100%'
        }
      }
    }  
  },
  Order2:{
    screen:OrderScreen2,
    navigationOptions: () => {
      return { 
        header: null,
      }
    }
  },
Payment:{
  screen:PaymentScreen,
  navigationOptions: () => {
    return { 
      headerTitle:'Payment',
      headerStyle:{
        elevation:0
      }
    }
}
}
});

HomeStack.navigationOptions = ({navigation}) => {
 
  let tabBarVisible = false;
    if (navigation.state.index == 0) {
       tabBarVisible = true;
    }

   return {
     tabBarVisible,
        tabBarIcon: ({ tintColor}) => (
          <Icon 
            name = 'md-home'
            color = {tintColor}
            size={26} 
          /> 
          )
      };

   
};

