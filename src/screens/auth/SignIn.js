import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField1, Button1 } from '../../common';
import { TouchableRipple, Button } from 'react-native-paper';
import KeyboardShift from '../../KeyboardShift';
import { createUserToken } from './../../ApiRequests/UploadData';
import AnimatedLoader from 'react-native-animated-loader';
import { getUserCard } from '../../ApiRequests/GetData';
import { PasswordInput } from '../../common/PasswordInput';
export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    showResponse: false,
    error: false,
    response: ''
  }

  signInAsync = async () => {
    this.setState({ loading: true });
    createUserToken(this.state.email, this.state.password)
      .then(async Token => {
        if (Token.status == 400) {
          this.setState({ loading: false});
          alert(Token.data);
        } else if (Token.status == 200) {
           AsyncStorage.setItem('userToken', Token.data)
           .then( resp => {
             getUserCard()
             .then(resp =>{
              this.setState({ loading: false});
              this.props.navigation.navigate('Home',{resp});
             })
             .catch(err =>{
              alert('userData Error', err);
             })
            
           })
           .catch(err =>{
            alert(err);
           })
          
        } else {
          this.setState({ loading: false});
          alert('something went wrong');
        }
      });

  }
  render() {
    return (
      <KeyboardShift>
        {() => (
          <View styles={styles.container}>
            <View style={styles.ImageContainer}>
              {/*Image*/}
              <Image
                style={styles.logo}
                source={require('../../assets/images/washingmachine.png')}
              />
              {/*App Name*/}
              <Text style={styles.appName}>Laundry <Text style={{ fontWeight: '400' }}>Guru</Text></Text>
            </View>
            <View style={styles.PageHeading}>
              {/*Sign in now */}
              <Text style={styles.signInText}>Sign in now</Text>
            </View>
            <View style={styles.InputContainer}>
              <TextField1
                name={'email'}
                label={'Email/ Mobile Number'}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
                keyboardType={'email-address'}
              />
              <PasswordInput
                name={'security'}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password: password })}
              />
            </View>
            <View style={styles.forgotSection}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('Forgot')}
              >
                <Text style={{ fontSize: wp('3.4%'), color: '#2196F3', fontWeight: '500' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer}>
              {/** Touchable SignIn */}
              <Button1
                onPress={this.signInAsync}
              >Sign in</Button1>
            </View>
            <View style={styles.registerContainer}>
              {/** Oh! Not Registerd yet */}
              <Text style={styles.registerTitle}>Oh! Not Registered yet?</Text>
              {/** Register Button */}
              <View style={styles.TouchableContainer}>
                <TouchableRipple
                  style={styles.touchable}
                  rippleColor="rgba(0,0,0, 0.3)"

                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.text}>Register Now</Text>
                </TouchableRipple>
              </View>
            </View>
            <AnimatedLoader
              visible={this.state.loading}
              overlayColor="rgba(58, 104, 121,0.55)"
              animationStyle={styles.lottie}
              speed={1}
              source={require('../../assets/svg/animate2.json')}
            />
         
          </View>
        )}

      </KeyboardShift>
    );

  }
}


const styles = StyleSheet.create({
  lottie: {
    width: wp('25%'),
    height: hp('12%')
  },
  forgotSection: {
    width: wp('100%'),
    alignItems: 'flex-end',
    paddingRight: wp('6%'),
    paddingTop: hp('0.2%'),
    paddingBottom: hp('0.2%')
  },
  text: {
    color: '#2196F3',
    fontSize: wp('5%'),
    fontWeight: '400'
  },
  touchable: {
    width: wp('90%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2196F3'
  },
  TouchableContainer: {
    width: wp('100%'),
    height: hp('9%'),
    paddingTop: hp('4%'),
    paddingBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('1.5%')
  },
  registerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold'
  },
  PageHeading: {
    alignItems: 'center',
    paddingBottom: hp('4%')
  },
  signInText: {
    fontSize: wp('6.5%'),
    color: '#000',
    paddingTop: hp('10%'),
  },
  appName: {
    fontSize: wp('7%'),
    color: '#000',
    paddingTop: hp('4%'),
    fontWeight: '500'
  },
  ImageContainer: {
    // backgroundColor:'#ccc',
    width: wp('100%'),
    height: hp('18%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: wp('20%'),
    height: hp('15%')
  },
  container: {
    borderTopWidth: 0,
    alignItems: 'center',
    // justifyContent:'center' 
  },

});
