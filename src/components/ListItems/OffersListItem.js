import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OffersListItem = (props) => {
    return (
        <View style={styles.container}>
           <View style={styles.OffersContainer}>
             <Text style={styles.Heading}>{props.data.item}</Text>
             <Text style={styles.SubHeading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             </Text>
             <View style={styles.codeContainer}>
               <Text style={styles.code}>NEWFREE3</Text>
             </View>
           </View>
        </View>    
    );
  };
  
  const styles = StyleSheet.create({
      codeContainer:{
          borderRadius:3,
        borderWidth:2,
        borderColor:'#F2F2F2',
        width:wp('34%'),
        paddingBottom:hp('1%'),
        height:hp('6%'),
        justifyContent:'center',
        alignItems:'center'
      },
      code:{
          paddingTop:hp('1%'),
          color:'#11C3F0',
           fontSize:wp('4.5%'),
           fontWeight:'500'
      },
      SubHeading:{
          fontSize:wp('3.5%'),
          paddingBottom:hp('1%')
      },
    container:{
      width:wp('100%'),
      marginBottom:hp('1%'),
      backgroundColor:'#fff',
      paddingLeft:wp('3%'),
      paddingBottom:hp('2%'),
      },
      Heading:{
        fontSize:wp('5%'),
        fontWeight:'500',
        color:'#000',
        fontFamily:'Gotham',
        paddingBottom:hp('.5%')
      },
      OffersContainer:{
       paddingTop:hp('2%'),
    
      },
  });
  
  export { OffersListItem };
  