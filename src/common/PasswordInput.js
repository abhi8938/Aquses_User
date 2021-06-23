import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const PasswordInput = (props) => {
        return (
            <View style={styles.container}>
               <View style={styles.icon}>
      <Icon 
          name = {props.name}
          color = '#2196F3'
          size={28} 
          />
      </View>
      <View style={styles.textfield}>
                <PasswordInputText
                 textColor='#101010'
                 baseColor='#999999'
                 tintColor='#2196F3'
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    textfield:{
        flex:1,
        justifyContent:'center',
        marginLeft:wp('1%'),
        height:hp('5%'),
        marginRight:wp('5%')
    },
    icon:{
        paddingTop: hp('2.4%'),
        width:wp('15%'),
        height:hp('6%'),
        paddingLeft:wp('5%'),
        justifyContent:'center',
      },
    container:{
        height:hp('6%'),
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:hp('2.5%')
    },
})
