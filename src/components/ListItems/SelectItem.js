
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
 FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const SelectListItem = (props) => {
    return (
        <View style={styles.containerRight}> 
        <Icon onPress={props.onPressD}
              name = 'minus-circle-outline'
              color = {'#11C3F0'}
              size={32} 
            />
            <Text style={{ fontSize:wp('4%'), color:'#000', padding:wp('3%')}}>{props.children}</Text>
            <Icon
            onPress={props.onPressI}
              name = 'plus-circle-outline'
              color = {'#11C3F0'}
              size={32} 
            />
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    containerRight:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      },
  });
  
  export { SelectListItem };
  