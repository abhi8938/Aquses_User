import React from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextField1 = (props) => {
    return (
      <View style={styles.textFieldContainer}>
      <View style={styles.icon}>
      <Icon 
          name = {props.name}
          color = '#2196F3'
          size={28} 
          />
      </View>
      <View style={styles.textfield}>
      <TextField
               id="input-with-icon-grid"
               label={props.label}
               fontSize={wp('4%')}
               value={props.value}
               textColor='#101010'
               baseColor='#999999'
               tintColor='#2196F3'
               onChangeText={props.onChangeText}
               keyboardType={props.keyboardType}
               />
      </View>
      </View>
    );
  };
  
  const styles = {
    icon:{
      width:wp('15%'),
      height:hp('6%'),
      paddingLeft:wp('5%'),
      paddingTop:hp('3.2%'),
      justifyContent:'center',
    },
    textfield:{
        flex:4,
        justifyContent:'center',
        marginLeft:wp('1%'),
        height:hp('5%'),
        marginRight:wp('5%')
    },
  textFieldContainer:{
    width:wp('100%'),
    height:hp('6%'),
    justifyContent:'center',
    flexDirection:'row',
    marginBottom:hp('2.5%')
  },
  };
  
  export { TextField1 };
  