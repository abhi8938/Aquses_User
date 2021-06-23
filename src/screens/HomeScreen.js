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
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ServiceItem } from '../components/ListItems/ServiceItem';
import { TouchableRipple } from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';
import { getUserCard } from '../ApiRequests/GetData';

const servicesName = [
  'Wash & Fold',
  'Wash & Iron',
  'Express Wash',
  'Dry Clean'
]
export default class HomeScreen extends React.Component {
  state = {
    resp: {},
    loading: false
  }
  static navigationOptions = {
    header: null
  };


  componentDidMount = () => {
    this.setState({ loading: true });
    getUserCard().then(resp => {
      this.setState({ resp: resp }, () => {
        this.setState({ loading: false });
      });

    }).catch(err => alert(err))
  };


  render() {
    const { resp } = this.state;
    return (
      <View style={{ backgroundColor: '#2196F3', flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Laundry Guru</Text>
        </View>
        <View style={styles.firstContainer}>
          <Text style={styles.text}>Hi!</Text>
          <Text style={[styles.text, { fontWeight: '500' }]}>{resp.fullName}</Text>
          <Text style={styles.text}>Choose a service Type</Text>
        </View>
        <View style={{ width: wp('100%'), height: hp('2%'), backgroundColor: '#2196F3' }} />
        <View style={styles.container}>
          {/* <View style={styles.container2}><ServiceItem
          disabled={this.state.loading}
            iconStyle={{
              width: wp('18%'),
              height: hp('10%')
            }}
            icon={require('../assets/images/wash-fold.png')}
            onPress={() => {
              setTimeout(() => {

                return this.props.navigation.navigate('SelectScreen', { resp, service: servicesName[0] })
              }, 1)
            }} price='Charged Per Piece' >{servicesName[0]}</ServiceItem></View> */}
          <View style={styles.container2}><ServiceItem
            disabled={this.state.loading}
            iconStyle={{
              width: wp('23%'),
              height: hp('10%')
            }}
            icon={require('../assets/images/iron.png')}
            onPress={() => {
              setTimeout(() => {

                return this.props.navigation.navigate('SelectScreen', { resp, service: servicesName[1] })
              }, 1)
            }} price='Charged Per Piece' >{servicesName[1]}</ServiceItem></View>
       <View style={styles.container2}>
            <ServiceItem
              disabled={this.state.loading}
              iconStyle={{
                width: wp('20%'),
                height: hp('10%')
              }}
              icon={require('../assets/images/dryClean.png')}
              onPress={() => {
                setTimeout(() => {
                  return this.props.navigation.navigate('SelectScreen', { resp, service: servicesName[3] })
                }, 1)
              }} price='Charged Per Piece'>{servicesName[3]}</ServiceItem></View>
        </View>
        </View>
     
    );
  }
}


const styles = StyleSheet.create({
  container2: { alignItems: 'center', flex: 1 },
  container: {
    alignItems: 'center',
    width: wp('100%'),
    flexDirection: 'row'
  },
  text: {
    fontSize: wp('4.5%'),
    color: '#fff',
    paddingLeft: wp('3%'),
    paddingBottom: hp('2%')
  },
  lottie: {
    width: wp('32%'),
    height: hp('17%')
  },
  firstContainer: {
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    backgroundColor: '#2196F3',
  },
  header: {
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: hp('8%'),
    justifyContent: 'center'
  },
  headerText: {
    width: '80%',
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: '500',
    textAlign: 'center'
  }
});
