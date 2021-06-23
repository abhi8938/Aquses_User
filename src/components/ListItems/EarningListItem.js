import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EarningListItem = (props) => {
    return (
        <View style={styles.container}>
           <View style={styles.EarninglistItem}>
             <View style={styles.HeadingContainer}>
             <Text style={styles.Heading}>{props.data.item}</Text>
             <Text style={styles.time}>Laundry Delivered</Text>
             </View>
             <View style={styles.paymentContainer}>
             <Text style={[styles.Heading, { flex:1, textAlign:'right'}]}>₹ 30.00</Text>
             <Text style={styles.time}>Cash Collected</Text>
             </View>
             <View style={styles.EarnedContainer}>
             <Text style={[styles.Heading, {flex:1, textAlign:'center', color:'#11C3F0'}]}>₹ 5.00</Text>
             <Text style={[styles.time, {flex:1, textAlign:'center'}]}>Earned</Text>
             </View>
           </View>
        </View>    
    );
  };
  
  const styles = StyleSheet.create({
      EarnedContainer:{
          flex:1,
        paddingLeft:wp('4%'),
      },
      paymentContainer:{
          paddingLeft:wp('4%')
      },
      HeadingContainer:{
       flexDirection:'column',
      },
      time:{
          flex:1,
         fontSize:wp('4%'),
         color:'#8C8C8C',
      },
      SubHeading:{
          fontSize:wp('3.5%'),
          paddingBottom:hp('1%')
      },
    container:{
        flexDirection:'row',
      width:wp('100%'),
      marginBottom:hp('1%'),
      backgroundColor:'#fff',
      paddingLeft:wp('3%'),
      paddingBottom:hp('2%'),
      paddingTop:hp('1%')

      },
      Heading:{
          flex:1,
        fontSize:wp('4%'),
        fontWeight:'500',
        color:'#000',
        fontFamily:'Gotham',
        paddingBottom:hp('.5%')
      },
      EarninglistItem:{
          flexDirection:'row',
       paddingTop:hp('2%'),
       flex:1,
       paddingLeft:wp('1%')
      },
  });
  
  export { EarningListItem };
  