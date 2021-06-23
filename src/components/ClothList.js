import React from 'react';
import { View, Text, Image, TouchableHighlight, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ClothList = (props) => {
    return (
         
        <View style={{ paddingBottom:hp('2%'),  backgroundColor:'#fff',  marginTop:hp('1%')}}>
        <View style={styles.ClothListContainer}>
              <Text style={styles.heading}>{props.children}</Text>
            </View>
             {/*flatlist Vertical Scroll*/}
          <View style={styles.FlatlistContainer}>
          <FlatList
               data={props.data}
               renderItem={props.renderItem}
           />
          </View>
          </View>
    );
  };
  
  const styles = {
    ClothListContainer:{
        flex:1,
        paddingTop:hp('2%'),
        paddingRight:wp('3%'),
        paddingBottom:hp('1%'),
        paddingLeft:wp('3%'),
       
      },
      heading:{
        fontSize:wp('5%'),
        color:'#A9A9A9',
        fontWeight:'400',
        paddingBottom:hp('1%')
      },
      
  };
  
  export { ClothList };
  