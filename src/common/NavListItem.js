import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const NavListItem = (props ) => {
    
  return (
      <View style={styles.container}>
    <TouchableOpacity onPress={props.onPress}>
    <View style={styles.NavListItem}>
        <View style={styles.NavItemIcon}>
        <Icon name = {props.IconName}
              color = {'#2196F3'}
              size={22} 
            />
        </View>
        <View style={styles.NavItemName}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    </View>
    </TouchableOpacity>
    </View>
        );
}

export { NavListItem }


const styles = StyleSheet.create({
    container:{
       paddingBottom:hp('2%'),
    },
    NavList: {
        marginLeft: wp('3%'),
        marginRight: wp('3%'),
        marginTop: hp('4%'),
        marginBottom: hp('4%'),
    },
    NavListItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    NavItemIcon: {
        flex: 1,
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: wp('1%'),
        margin: 0,
    },
    NavItemName: {
        flex: 4,
        height: hp('6%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
    
    },
    NavItemArrow: {
        flex: 1,
        height: hp('6%'),
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: wp('2%'),
    },
    image: {
        height: wp('3%'),
        width: hp('3%')
    },
    arrow: {
        height: 22,
        width: 22
    },
    text: {
        fontSize: hp('2.5%'),
        color: '#000',
        fontWeight: '400'
    }
})