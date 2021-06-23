import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView  from 'lottie-react-native';
import {getUserCard } from '../ApiRequests/GetData';
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }
  componentDidMount() {
    this.animation.play();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    setTimeout( async ()=>{
      const userToken = await AsyncStorage.getItem('userToken');
           if(userToken){
            return this.props.navigation.navigate('Home');
            
           }else{
            return this.props.navigation.navigate('Auth');
           }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    },200);
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex:1, padding:0, justifyContent:'center', alignItems:'center', backgroundColor:'#3490DC'}}>
       <LottieView 
        ref={animation => {
          this.animation = animation;
        }}
        style={styles.lottie} 
        source={require('../assets/svg/machine.json')}
        speed={0.8}
        loop />
        <View style={{ width:wp('100%'), paddingTop:hp('5%'), alignItems:'center'}}>
          <Text style ={{ color:'#474646', paddingLeft:wp('2.5%'), fontFamily:'Gotham', fontWeight:'800', fontSize:wp('8%')}}>Laundry Guru <Text style={{ paddingBottom:hp('1%'), fontSize:wp('4%')}}>©</Text></Text>
        </View>
      </View>
    );
  }
}
const styles =  StyleSheet.create({
  lottie: {
    width:wp('100%'),
    height:hp('60%'),

  },
})
