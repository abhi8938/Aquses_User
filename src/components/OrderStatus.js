import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const OrderStatus = (props) => {
    return (
         
          <View style={styles.OrderStatusContainer}>
          <View style={styles.OrderStatusProgressContainer}>
          <Image
           source={require('../assets/images/ordeimage2.png')}
           style={{
                 width:wp('13%'), 
                 height:hp('7.5%'),
            //    overflow:'hidden',
                 padding: 0,
                 position:'absolute'
                         }}
            resizeMode={'stretch'}
                     />
          <AnimatedCircularProgress
             size={125}
             width={4}
             fill={100}
             tintColor="#2196F3"
             onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#ccc" />
          </View>
          <View style={styles.OrderStatusHeadingContainer}>
         
            <Text style={styles.OrderStatusHeading} >
              Order Status
            </Text>
            <Text style={styles.OrderStatus}>
            Order {props.item.orderStatus}
            </Text>
          </View>
        </View>
    );
  };
  
  const styles = {
    OrderStatus:{
        fontSize:wp('5%'),
        fontWeight:'500',
        width:wp('40%'),
        color:'#2196F3'
      },
      OrderStatusHeading:{
        fontWeight:'500',
        paddingBottom:hp('1%'),
        fontSize:wp('4.5%'),
        color:'#A4A4A4',
        width:wp('40%'),
      },
      OrderStatusHeadingContainer:{
         flex:1,
         alignItems:'center',
         justifyContent:'center'
      },
     OrderStatusProgressContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
     },
     OrderStatusContainer:{
       flexDirection:'row',
       width:wp('100%'),
       height:hp('25%'),
       backgroundColor:'#fff',
       marginBottom:hp('.5%')

     },
  };
  
  export { OrderStatus };
  