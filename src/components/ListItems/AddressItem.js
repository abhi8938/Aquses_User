import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AddressItem = (props) => {
    return (
        <View style={styles.container}>
        <Image
              source={require('../../assets/images/sampleImage.jpg')}
              style={{
                    width:wp('10%'), 
                    height:hp('7.5%'),
               //    overflow:'hidden',
                    padding: 0,
                            }}
               resizeMode={'stretch'}
                        />
           <View style={styles.serviceContainer}>
             <Text style={styles.serviceHeading}>{props.data.item}</Text>
           </View>
        </View>    
    );
  };
  
  const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        height:hp('18%'), 
        width:wp('38%'), 
        alignItems:'center', 
        margin:wp('4%'), 
        justifyContent:'center',
        marginBottom:hp('3%'),
        backgroundColor:'#11C3F0'
      },
      serviceHeading:{
        fontSize:wp('4.5%'),
        fontWeight:'500',
        color:'#fff',
        fontFamily:'Gotham'
      },
      serviceContainer:{
       paddingTop:hp('2%'),
       alignItems:'center'
    
      },
  });
  
  export { AddressItem };
  