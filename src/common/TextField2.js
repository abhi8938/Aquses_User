import React from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextField2 = (props) => {
    return (
      <View style={styles.textfield}>
      <TextField
               style={{ lineHeight:8}}
               label={props.label}
               fontSize={wp('5%')}
               value={props.value}
               textColor='#101010'
               baseColor='#999999'
               tintColor='#11C3F0'
               onChangeText={props.onChangeText}
               keyboardType={props.keyboardType}
               />
      </View>
    );
  };
  
  const styles = {
 
    textfield:{
      height:hp('6%'),
        marginBottom:hp('3%')
    },
 
  };
  
  export { TextField2 };
  