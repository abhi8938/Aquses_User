import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const NotificationListItem = (props) => {
    return (
        <View style={styles.container}>
             <View style={styles.OrderStatusProgressContainer}>
                <Image
                  source={require('../../assets/images/dlogo.png')}
                     style={{
                 width:wp('8%'), 
                 height:hp('5%'),
            //    overflow:'hidden',
                 padding: 0,
                   position:'absolute'
                         }}
                  resizeMode={'stretch'}
                     />
                <AnimatedCircularProgress
               size={75}
               width={3}
               fill={25}
               tintColor="#00e0ff"
               onAnimationComplete={() => console.log('onAnimationComplete')}
               backgroundColor="#F2F2F2" />
             </View>
           <View style={styles.NotificationContainer}>
             <View style={styles.HeadingContainer}>
             <Text style={styles.Heading}>{props.data.item}</Text>
             <Text style={styles.time}>09:00 PM</Text>
             </View>
             <Text style={styles.SubHeading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
             </Text>
           </View>
        </View>    
    );
  };
  
  const styles = StyleSheet.create({
      HeadingContainer:{
       flexDirection:'row',
      },
      time:{
          flex:1,
         fontSize:wp('3.5%'),
         color:'#8C8C8C',
      },
    OrderStatusProgressContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:hp('.5%')
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
          flex:3,
        fontSize:wp('4.5%'),
        fontWeight:'500',
        color:'#000',
        fontFamily:'Gotham',
        paddingBottom:hp('.5%')
      },
      NotificationContainer:{
       paddingTop:hp('2%'),
       flex:3,
       paddingLeft:wp('1%')
      },
  });
  
  export { NotificationListItem };
  