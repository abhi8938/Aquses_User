import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const OrderAddressCard = (props) => {
  // console.log('props',props);
  let address = '';
  if(props.item != undefined){
    address = props.item.orderAddress.formatedAddress
  }
  if(props.data != undefined){
    address = props.data.address
  }
    return (
        <View style={styles.AddressContainer}>
        <Text style={styles.heading}>{props.children}</Text>
        <Text style={styles.date}>{address}</Text>
      </View>
    );
  };
  
  const styles = {
    AddressContainer:{
      marginTop:hp('.5%'),
        flex:1,
        paddingTop:hp('1.5%'),
        paddingRight:wp('2%'),
        paddingBottom:hp('1.5%'),
        backgroundColor:'#fff',
        paddingLeft:wp('5%'),
      },
      date:{
        fontSize:wp('4.5%'),
        color:'#000',
        fontWeight:'500',
        paddingBottom:hp('1%')
      },
      heading:{
        fontSize:wp('5%'),
        color:'#A9A9A9',
        fontWeight:'400',
        paddingBottom:hp('1.5%')
      },
      
  };
  
  export { OrderAddressCard };
  