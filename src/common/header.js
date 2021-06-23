import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = (
    props
) => {
  return (
    <View style={styles.header}>
    <Text style={styles.headerText}>{props.children}</Text>
  </View>
)};



const styles = StyleSheet.create({
    header:{
        width:wp('100%'),
        alignItems:'center',
        backgroundColor:'#2196F3',
        height:hp('8%'),
        justifyContent:'center'
      },
      headerText:{
        textAlign:'center',
        width:'80%',
        color:'#fff',
        fontSize:wp('5%'),
        fontWeight:'500'
      }
});
export {Header};