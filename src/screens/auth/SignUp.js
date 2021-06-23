import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import KeyboardShift from '../../KeyboardShift';
import AnimatedLoader from 'react-native-animated-loader';
import { TextField1, Button1 } from '../../common';
import { CreateUser, sendOtp } from '../../ApiRequests/UploadData';
import { Modal1 } from '../../components/modal1';
export default class SignUp extends React.Component {

  state = {
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    error: false,
    showResponse: '',
    verified: false,
    response: '',
    loading: false,
    otp1: '',
    otp2: '',
    modalVisible: false
  }

  PostUser = () => {
    const { fullName, email, mobileNumber, password, confirmPassword, loading, showResponse, response, error } = this.state;
    if (this.state.verified == true) {
    if (password === confirmPassword) {
      this.setState({ loading: true });
      CreateUser(
        fullName,
        email,
        mobileNumber,
        password,
      ).then(response => {
        if (response.data.fullName != undefined) {
          this.setState({ loading: false });
          alert('Registration Success');
          this.props.navigation.navigate('SignIn');
        }
        else if (response.data.fullName == undefined) {
          this.setState({ loading: false });
          alert(response.data);
        }
      })
    } else {
      this.setState({ loading: false });
      alert('Password Mismatch');
    }
  }else {
    return alert('Mobile Number Not Verified')
}
  }
  verify = () => {
    if (this.state.otp1 == this.state.otp2) {
      return this.setState({
        verified: true,
        modalVisible: false,
        loading: false,
        showResponse: true,
        response: 'Mobile Number Verified', error: false
      });
    } else {
      return alert('Wrong Otp');
    }
  }
  verifyMobile = async () => {
    if (this.state.mobileNumber.length < 10) {
      return alert('Invalid Mobile Number');
    }
    this.setState({ loading: true, otp1: `${Math.floor(1000 + Math.random() * 9000)}` }, async () => {
      const res = await sendOtp(this.state.mobileNumber, this.state.otp1);
      if (res.status == 200) {
        return this.setState({ loading: false, modalVisible: true });
      } else {
        return this.setState({ loading: false, showResponse: true, response: 'OTP sent failiure! Retry', error: true });
      }
    })
  }
  renderVerifyText() {
    if (this.state.verified == false) {
      return <Text style={{ fontSize: wp('4.5%'), color: '#f2784a', fontWeight: '500' }}>Verify</Text>
    } else {
      return <Text style={{ fontSize: wp('4.5%'), color: '#1EC100', fontWeight: '500' }}>Verified</Text>
    }
  }


  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View style={styles.ImageContainer}>
              {/*Image*/}
              <Image
                style={styles.logo}
                source={require('../../assets/images/washingmachine.png')}
              />
              {/*App Name*/}
              <Text style={styles.appName}>Laundry <Text style={{ fontWeight: '400' }}>Guru</Text></Text>
            </View>
            <View style={styles.InputContainer}>
              <TextField1
                name={'face'}
                label={'Enter Full Name'}
                value={this.state.fullName}
                onChangeText={(fullName) => this.setState({ fullName: fullName })}
              />
              <TextField1
                name={'mail'}
                label={'Email Address'}
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
                keyboardType={'email-address'}
              />
              <View style={[styles.InputContainer, { flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <TextField1
                    name={'contact-phone'}
                    label='Mobile Number'
                    value={this.state.mobileNumber}
                    keyboardType={"phone-pad"}
                    onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                  />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight:wp('6%') }}>
                  <TouchableOpacity
                    onPress={this.verifyMobile}
                  >
                    {this.renderVerifyText()}
                  </TouchableOpacity>
                </View>
              </View>
              <TextField1
                name={'security'}
                label={'Create Password'}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password: password })}
                keyboardType={'visible-password'}
              />
              <TextField1
                name={'control-point-duplicate'}
                label={'Confirm Password'}
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword) => this.setState({ confirmPassword: confirmPassword })}
                keyboardType={'visible-password'}
              />
            </View>
            <View style={styles.ButtonContainer}>
              {/** Touchable SignIn */}
              <Button1
                onPress={this.PostUser}
              >Register</Button1>
            </View>
            <AnimatedLoader
              visible={this.state.loading}
              overlayColor="rgba(58, 104, 121,0.55)"
              animationStyle={styles.lottie}
              speed={1}
              source={require('../../assets/svg/animate2.json')}
            />
            <Modal1
              placeholder={'OTP'}
              Title={'Enter 4 digit OTP'}
              visible={this.state.modalVisible}
              onChangeText={(otp2) => this.setState({ otp2 })}
              value={this.state.otp2}
              onPressC={() => {
                this.setState({ modalVisible: false });
              }}
              onPressV={this.verify}
            >Verify</Modal1>
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
  ButtonContainer: {
    paddingTop: hp('5%')
  },
  appName: {
    fontSize: wp('6%'),
    color: '#000',
    paddingTop: hp('2.5%'),
    fontWeight: '500'
  },
  ImageContainer: {
    // backgroundColor:'#ccc',
    width: wp('100%'),
    height: hp('25%'),
    alignItems: 'center',
  },
  logo: {
    width: wp('20%'),
    height: hp('15%')
  },
  container: {
    borderTopWidth: 0,
    alignItems: 'center',
  },

});
