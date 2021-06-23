import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableRipple } from 'react-native-paper';

const ServiceItem = (props) => {
    return (
      <TouchableRipple
      disabled={props.disabled}
      borderless={false}
      rippleColor="rgba(0, 0, 0, .32)"
     style={{width:wp('35%'), height:hp('25%'), margin:wp('1.5%'), borderRadius:5, backgroundColor:'#fff',}}
     onPress={props.onPress}
     >
        <View style={styles.container}>    
        <Image
              source={props.icon}
              style={props.iconStyle}
               resizeMode={'stretch'}
                        />
           <View style={styles.serviceContainer}>
             <Text style={styles.serviceHeading}>{props.children}</Text>
             <Text style={styles.serviceSubTitle}>{props.price}</Text>
           </View>
        </View> 
        </TouchableRipple>
   
    );
  };
  
  const styles = {
  
    container:{
      height:hp('24%'), 
      width:wp('35%'), 
      alignItems:'center', 
      justifyContent:'center',
    },
    serviceSubTitle:{
        fontSize:wp('3%'),
        fontWeight:'500',
        color:'#7C7C7C',
        fontFamily:'Gotham'
        },
      serviceHeading:{
        fontSize:wp('4.2%'),
        fontWeight:'400',
        color:'#000',
        fontFamily:'Gotham'
      },
      serviceContainer:{
       paddingTop:hp('4%'),
       alignItems:'center'
    
      },
  };
  
  export { ServiceItem };
  