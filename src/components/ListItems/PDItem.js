import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PDItem = (props) => {
    return (
        <View style={styles.container}>
        <TouchableNativeFeedback
              onPress={() => console.log('pressed')}
             background={TouchableNativeFeedback.SelectableBackground()}
           >
           <View style={styles.touchable}>
             <Text style={{color:'#000', fontSize:wp('3.5%'), fontWeight:'500'}}>{props.data.item}</Text>
           </View>
           </TouchableNativeFeedback>
        </View>    
    );
  };
  
  const styles = StyleSheet.create({
    container:{
    borderWidth:1,
        borderRadius:5,
        paddingTop:hp('1.3%'),
        paddingBottom:hp('1.3%'),
        width:wp('40%'),
        alignItems:'center', 
        margin:wp('4%'), 
        justifyContent:'center',
        marginBottom:hp('.5%'),
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
  
  export { PDItem };
  