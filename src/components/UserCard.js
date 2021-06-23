import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class UserCard extends Component {
    render() {
  return (
            <TouchableOpacity 
            onPress={this.props.onPress}
            style={styles.Container}>
                <View style={styles.UserCard}>
                <View style={styles.Displaypic}>
                  <Image 
                     source={require('../assets/images/profile.png')}
                     style={styles.image}
                  />
                </View>
                <View style={styles.UserData}>
                     <Text style={styles.name}> {this.props.name}  </Text>
                         <Text style={styles.usernameTitle}>
                             View Profile 
                             </Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
}

export default UserCard

const styles = {
    Container: {
        height: hp('20%'),
        backgroundColor: '#fff',
        marginBottom: hp('1%'),

       
    },
    UserCard: {

        flexDirection: 'row',
        height: hp('20%')
    },
    Displaypic: {
        flex: 1,
        paddingTop:hp('2%'),
        paddingLeft:wp('4%'),
        borderRadius:50
    },

    image:{
        width: wp('30%'),
        height: hp('16%'),
       borderRadius:50
    },
    UserData:{
     flex:3,
     alignItems: 'flex-start',
     paddingTop: hp('6%'),
     paddingLeft: wp('10%'),
    },
    Username:{
       fontSize: hp('2.5%'),
       fontWeight: 'bold',
       marginLeft: wp('5%'),
    },
    name:{
      fontSize: hp('2.5%'),
      fontWeight: '500',
      marginBottom: hp('1%'),
    },
    usernameTitle:{
         fontSize: wp('3.8%'),
         paddingLeft:wp('2%'),
         color:'#2196F3'
    },
    balanceTitle:{
        fontSize: hp('2.5%'),
        fontWeight: '400',
    },
    balance:{
        fontSize: hp('2.5%'),
        fontWeight: '500',
    }
};
