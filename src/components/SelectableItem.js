
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
import Icon from "react-native-vector-icons/EvilIcons";
const SelectableItem = (props) => {
    return (
      <View style={styles.totalContainer}>
      <View style={styles.containerLeft}>
         <Text style={{ fontSize:wp('4%'), color:'#000', width:wp('45%') }}>{props.data.item.Item}</Text>   
         <Text style={{marginLeft:wp('3%')}}>{props.price}/unit</Text>
      </View>
        <View style={styles.containerRight}> 
        <Icon onPress={props.onPressD}
              name = 'minus'
              color = {'#11C3F0'}
              size={30} 
            />
            <Text style={{ fontSize:wp('4%'), color:'#000', padding:wp('3%')}}>{props.children}</Text>
            <Icon
            onPress={props.onPressI}
              name = 'plus'
              color = {'#11C3F0'}
              size={30} 
            />
        </View>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    totalContainer:{
      backgroundColor:"#fff",
      marginBottom:hp('1%'),
      width:wp('100%'),
      height:hp('6%'),
      flexDirection:'row',
      alignItems:'center',
      paddingTop:hp('2%'),
      paddingBottom:hp('2%'),
      paddingLeft:wp('4%'),
      paddingRight:wp('4%')
  
    },
    containerLeft:{
      flexDirection:'row',
      flex:1,
      justifyContent:'space-between',
    },
    containerRight:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
      },
  });
  
  export { SelectableItem };
  