import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const PandDCard = (props) => {

  let pDate = '';
  let pTime = '';
  let dDate = 'Not Assigned';
  let dTime = 'Not Assigned';
  if(props.item.pickUp != undefined){
   pDate = props.item.pickUp.pickupDate;
   pDate = pDate.replace("\"","");
   pDate = pDate.replace('\"','')
   pTime = props.item.pickUp.pickupTime;
   pTime = pTime.replace("\"","");
   pTime = pTime.replace('\"','')
   
 }
 if(props.item.delivery != undefined){
  dDate = new Date(props.item.delivery).toDateString();
  dTime = new Date(props.item.delivery).toLocaleTimeString();
 }
    return (
        <View style={styles.PDContainer}>
             <View style={styles.PContainer}>
               <Text style={styles.heading}>Pick up</Text>
               <Text style={styles.date}>{pDate}</Text>
               <Text style={styles.time}>{pTime}</Text>
             </View>
             {function(){
               if(props.item.delivery != undefined){
                return(
                  <View style={styles.DContainer}>
               <Text style={styles.heading}>Delivery</Text>
               <Text style={styles.date}>{dDate} </Text>
               <Text style={styles.time}>{dTime}</Text>
             </View>
                )
              }
             }} 
           </View>
    );
  };
  
  const styles = {
    time:{
        fontSize:wp('4%'),
        color:'#808080',
        paddingBottom:hp('1%')
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
      DContainer:{
        flex:1,
        alignItems: 'flex-end',
        paddingTop:hp('2%'),
        paddingRight:wp('5%'),
        paddingBottom:hp('1%'),
        paddingLeft:wp('2%')
      },
      PContainer:{
        flex:1,
        paddingTop:hp('2%'),
        paddingLeft:wp('5%'),
        paddingRight:wp('2%'),
        paddingBottom:hp('1%')
      },
      PDContainer:{
        marginTop:hp('.5%'),
        flexDirection:'row',
        width:wp('100%'),
        backgroundColor:"#fff"
      },
  };
  
  export { PandDCard };
  