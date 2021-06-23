import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TouchableRipple, Button } from 'react-native-paper';
import { Card } from '../../common';
const OrderListItem = (props) => {
    return (
        <Card>       
         <View style={styles.container}>
             
             <View style={styles.OrderStatusProgressContainer}>
                <Image
                  source={require('../../assets/images/sampleImage.jpg')}
                     style={{
                 width:wp('5.3%'), 
                 height:hp('3.5%'),
            //    overflow:'hidden',
                 top:hp('3.6%'),
                   position:'absolute'
                         }}
                  resizeMode={'stretch'}
                     />
                <AnimatedCircularProgress
               size={55}
               width={3}
               fill={75}
               tintColor="#00e0ff"
               onAnimationComplete={() => console.log('onAnimationComplete')}
               backgroundColor="#F2F2F2" />
             </View>
             <View style={styles.OrderDetailsContainer}>
           
             <View style={styles.container1}>
             <View style={styles.HeadingContainer}>
             <Text style={styles.Heading}>{props.data.item}</Text>
             <Text style={styles.time}>Order No.22145052 </Text>
             </View>
             <View style={styles.buttonContainer}>
                 <TouchableRipple
                   style={styles.touchable}
                   rippleColor="rgba(255,255,255, 0.3)"
                   borderless={true}
                   onPress={props.onPress}>
                        <Text style={styles.text}>Delivered</Text>
             </TouchableRipple>
             </View>
             </View>
             <View style={styles.container2}>
               <View style={styles.deliveryTime}>
                   <Text style={styles.SubHeading}>Delivery Time</Text>
                   <Text style={styles.date}>Today, 21 June</Text>
                   <Text style={styles.time2}>01:00 PM to 02:00 PM</Text>
               </View>
               <View style={styles.payment}>
                   <Text style={[styles.SubHeading, {width:wp('30%')}]}>Payment</Text>
                   <Text style={[styles.date, {width:wp('30%')}]}>₹60</Text>
                   <Text style={[styles.time2, {width:wp('30%')}]}>Cash On Delivery</Text>
               </View>
             </View>
             <View style={styles.container3}>
               <Text style={styles.SubHeading}>
                   Delivery Address
               </Text>
               <Text style={styles.date}>B11 Old Ford Street, WorkShop Tower </Text>
             </View>
           </View>
        </View> 
        </Card>
   
    );
  };
  
  const styles = StyleSheet.create({
      container3:{
           paddingTop:hp('1.5%')
      },
      time2:{
        fontSize:wp('3.5%'),
        color:'#000',
      },
      date:{
         fontSize:wp('3.5%'),
         color:'#000',
         fontWeight:'500'
      },
      payment:{
          flex:1,
          alignItems:'center'
      },  
    deliveryTime:{
         flex:1
      },
      container2:{
          paddingTop:hp('1.6%'),
          flexDirection:"row"
      },
    text:{
        color:'#ffffff',
        fontSize:wp('3.5%'),
        fontWeight:'500' 
        },
    touchable:{
        width:wp('30%'),
        height:hp('6%'),
        backgroundColor:'#11C3F0',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
      },
      buttonContainer:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
      },
      HeadingContainer:{
       flex:1
      },
      container1:{
       flexDirection:'row'
      },
      time:{
          flex:1,
         fontSize:wp('3.5%'),
         fontWeight:'500',
         color:'#000',
      },
    OrderStatusProgressContainer:{
        flex:1,
        alignItems:'center',
       paddingTop:hp('1.5%') 
     },
      SubHeading:{
          fontSize:wp('3%'),
          paddingBottom:hp('.8%')
      },
    container:{
        flexDirection:'row',
      marginBottom:hp('1%'),
      backgroundColor:'#fff',
      paddingLeft:wp('3%'),
      paddingBottom:hp('2%'),
      paddingTop:hp('1%')

      },
      Heading:{
          flex:3,
        fontSize:wp('4.4%'),
        fontWeight:'500',
        color:'#11C3F0',
        fontFamily:'Gotham',
        paddingBottom:hp('.5%')
      },
      OrderDetailsContainer:{
        paddingTop:hp('2%'),
        flex:4,
        paddingLeft:wp('1%')
      },
  });
  
  export { OrderListItem };
  