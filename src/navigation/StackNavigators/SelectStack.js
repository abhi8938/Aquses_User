import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectClothesScreen from './../../screens/SelectClothesScreen';
import OrderDetailsScreen from './../../screens/OrderDetailsScreen';
export const SelectStack = createStackNavigator({
    SelectScreen:{
        screen: SelectClothesScreen,
        navigationOptions: () =>{
           return {header: null}
        }
    },
    OrderDetails:{
        screen: OrderDetailsScreen,
        navigationOptions: () =>{
            return {header: null}
         }
    }
}
)





 