import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, Text, TouchableOpacity, Linking, Share } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavListItem } from '../common';
class NavList extends Component {
    signOutAsync = async () => {
        await AsyncStorage.clear();
       this.props.navigation.navigate('Auth');
      };
    render() {
        return (
            <View style={styles.NavList}>
               <NavListItem onPress={()=>this.props.navigation.navigate('MyAddresses')} IconName={'bank'}>My addresses</NavListItem>
               <NavListItem onPress={()=>{ Linking.openURL('https://www.aquses.com/')}} IconName={'bitbucket'}>About us</NavListItem>
               <NavListItem onPress={()=>{ Linking.openURL('https://www.aquses.com/')}} IconName={'phone-classic'}>Contact us</NavListItem>
               <NavListItem onPress={()=>{ Linking.openURL('https://www.aquses.com/')}} IconName={'file-document-box-outline'}>Terms and services</NavListItem>
               <NavListItem onPress={this.signOutAsync} IconName={'doorbell-video'}>Logout</NavListItem>
            </View>
        );
    }

}

export default NavList;

const styles = {
    NavList: {
        marginBottom: hp('3%'),
        backgroundColor:'#fff',
        paddingTop:hp('3%'),
    }

};
