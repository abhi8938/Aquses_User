import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Modal, PermissionsAndroid, TextInput, TouchableOpacity } from 'react-native'
import { Header, Button2 } from '../common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AddressSection from './../components/AddressSection';
import ClothesList from './../components/ClothesList';
import PickupSection from './../components/PickupSection';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { STPCard } from '../components/STPCard';
import { createOrder, addAddress } from './../ApiRequests/UploadData';
import AnimatedLoader from 'react-native-animated-loader';
import { getUserCard } from '../ApiRequests/GetData';
var Today = new Date().getTime();
const data1 = [
  { id: 1, label: new Date(Today).toDateString() },
  { id: 2, label: new Date(Today + 86400000).toDateString() },
  { id: 3, label: new Date(Today + 172800000).toDateString() },
  { id: 4, label: new Date(Today + 259200000).toDateString() },
  { id: 5, label: new Date(Today + 345600000).toDateString() },
];
const data2 = [
  { id: 1, label: `9AM - 11AM` },
  { id: 2, label: `11AM - 1PM` },
  { id: 3, label: `1PM - 3PM` },
  { id: 4, label: `3PM - 5PM` },
  { id: 5, label: `5PM - 7PM` },
];
Geocoder.init("AIzaSyAREt27dBOp63-CqQ6AOKcr_oBDteGL1jM");

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'Location Is required ' +
          'So you can add you address.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      alert('Location permission denied');
    }
  } catch (err) {
   alert(err);
  }
}
let error = false;
export default class OrderDetailsScreen extends Component {
  state = {
    selected: false,
    Address: '',
    House: '',
    language: '',
    location: '',
    showModal: false,
    x: {
      latitude: 0,
      longitude: 0
    },
    selectedAddress: undefined,
    expectedDelivery: 'Please select pickup date',
    loading: false,
    userAddresses: [],
    timeSlots: data2
  }

  componentDidMount() {
    const { resp } = this.props.navigation.state.params;

    this.setState({ userAddresses: resp.Addresses })
  }


  getselectedAddress = (item) => {
    return this.setState({ selectedAddress: item });
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "M") { dist = dist * 0.8684 }
    return dist
  }

  addLocation = async () => {
    const { resp } = this.props.navigation.state.params;
    if (this.state.Address == '') {
      return alert('Address empty');
    }
    if (this.state.House == '') {
      return alert('House/Floor Empty');
    }
    if (this.state.x.latitude == 0) {
      return alert('Unable to get coordinates');
    }
    this.setState({ loading: true });
    const Add = await addAddress(this.state.Address, this.state.House, resp.customerId, this.state.x);
    console.log(`add`, Add);
    if (Add.status == 200) {
      const userData = await getUserCard();
      this.setState({ userAddresses: userData.Addresses, loading: false, showModal: false });
      alert('Address Added Successfully');
    } else {
      this.setState({ loading: false });
      alert(Add.data);
    }
  }

  handleSubmit() {
    const { selectedData, resp, service } = this.props.navigation.state.params;
    if (this.tag1.itemsSelected.length == 0) {
      error = true;
      alert('Please select pickup date')
      return
    }
    if (this.tag2.itemsSelected.length == 0) {
      error = true;
      alert('Please select pickup time')
      return
    }
    if (selectedData.length == 0) {
      error = true;
      alert('Something wrong with selected clothes, select again')
      return
    }
    if (resp.customerId == undefined) {
      error = true;
      alert('Network issue, Restart App')
      return
    }
    if (this.state.expectedDelivery == 'Please select pickup date') {
      error = true;
      alert('expected delivery date not found please select pickup date')
      return
    }
    if (this.state.selectedAddress == undefined) {
      error = true;
      alert('Please select address');
      return
    }
  }

  blockTimeSlots = (date) => {
    const date1 = new Date(date);
    const today = new Date();
    let timeData = new Array;
    let now = new Date().getHours();
    if (date1.toDateString() === today.toDateString()) {
      this.state.timeSlots.map((Element) => {
        if (now >= 9 && now < 11) {
          timeData.push(Element);
        } else if (now > 11 && now < 13) {
          if (Element.id == 1) {
            return
          }
          timeData.push(Element);
        } else if (now >= 13 && now < 15) {
          if (Element.id == 1 || Element.id == 2) {
            return
          }
          timeData.push(Element);
        } else if (now >= 15 && now < 17) {
          if (Element.id == 1 || Element.id == 2 || Element.id == 3) {
            return
          }
          timeData.push(Element);
        } else if (now >= 17 && now < 19) {
          if (Element.id == 1 || Element.id == 2 || Element.id == 3 || Element.id == 4) {
            return
          }
          timeData.push(Element);
        } else {
          timeData = new Array
        }
      })
      return this.setState({ timeSlots: timeData });
    } else {
      return this.setState({ timeSlots: data2 });
    }


  }

  generateExpected = () => {

    if (this.tag1.itemsSelected.length == 0) {
      return this.setState({ expectedDelivery: 'Please select pickup date' })
    } else if (this.tag1.itemsSelected.length > 0) {
      const pickupdateSelected = this.tag1.itemsSelected[0].label;
      this.blockTimeSlots(pickupdateSelected);
      let date = new Date(pickupdateSelected).getTime();

      let expectedDate = date + 172800000;
      expectedDate = new Date(expectedDate).toDateString();
      return this.setState({ expectedDelivery: expectedDate });
    }
  }
  postOrder = () => {
    this.handleSubmit();
    if (error) {
      error = false;
      return
    }
    const { selectedData, resp, service, finalAmount, totalItems } = this.props.navigation.state.params;
    console.log(
      'Selected items:',
      `DATE`, JSON.stringify(this.tag1.itemsSelected),
      `TIME`, JSON.stringify(this.tag2.itemsSelected),
      `CLOTHES`, selectedData,
      `SELECTED ADDRESS`, this.state.selectedAddress,
      `SERIVCE`, service,
      `CUSTOMERID`, resp.customerId,
      `EXPECTED DELIVERY`, this.state.expectedDelivery);
    const pickUp = {
      pickupTime: this.tag2.itemsSelected[0].label, //pickup time
      pickupDate: this.tag1.itemsSelected[0].label//pickup date
    };
    const orderAddress = {
      formatedAddress: this.state.selectedAddress.address,//customer saved Address
      latitude: this.state.selectedAddress.coordinates.latitude,//customer saved this.state.selectedAddress latitude
      longitude: this.state.selectedAddress.coordinates.longitude,//customer saved this.state.selectedAddress longitude
      houseFloor: this.state.selectedAddress.houseFloor
    };
    const item = {
      clothesItem: selectedData,
      serviceType: service,
      pickUp: pickUp,
      orderAddress: orderAddress,
      customerId: resp.customerId,
      expectedDelivery: this.state.expectedDelivery,
      finalAmount: finalAmount,
      totalItems: totalItems
    }
    return this.props.navigation.navigate('Order1', { item: item });
  }

  showMap = () => {
    requestLocationPermission().then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          const distance = this.distance(position.coords.latitude, position.coords.longitude, 28.831798, 78.752457, 'K');
          if (distance >= 50) {
            return alert('No service in this area');
          }
          this.setState({ x: { latitude: position.coords.latitude, longitude: position.coords.longitude, } },
            () => {
              Geocoder.from(this.state.x)
                .then(json => {
                  console.log(json.results[0].formatted_address);
                  this.setState({ showModal: true, Address: json.results[0].formatted_address })
                })
                .catch(error => {
                  this.setState({ showModal: true });
                  console.warn(error)
                });
            })
        },
        (error) => {
          // See error code charts below.
          console.log(`err`,error)
        alert(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000}
      );
    }).catch(err => alert(err))
  }


  renderMap() {
    return (
      <Modal
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.state.x.latitude,
              longitude: this.state.x.longitude,
              latitudeDelta: 0.0345,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              draggable
              onPress={() => alert('hold and drag')}
              coordinate={{
                latitude: this.state.x.latitude,
                longitude: this.state.x.longitude
              }}
              onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate }, () => {
                console.log(this.state.x)
                const distance = this.distance(this.state.x.latitude, this.state.x.longitude, 28.831798, 78.752457, 'K');
                if (distance > 50) {
                  return alert('No service in this area');
                }
                Geocoder.from(this.state.x)
                  .then(json => {
                    this.setState({ Address: json.results[0].formatted_address })
                  })
                  .catch(error => console.warn(error));
              })}
            />
          </MapView>
        </View>
        <View style={{ width: wp('95%'), backgroundColor: '#fff', height: hp('22%'), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, marginTop: hp('4%') }}>
          <TextInput
            placeholder='Address'
            style={styles.input}
            onChangeText={(Address) => this.setState({ Address })}
            value={this.state.Address}
          />
          <TextInput
            placeholder='House/Floor'
            style={[styles.input, { marginTop: hp('1.5%') }]}
            onChangeText={(House) => this.setState({ House })}
            value={this.state.House}
          />
        </View>
        <TouchableOpacity
          onPress={this.addLocation}
          style={{
            alignSelf: 'center',
            backgroundColor: '#2196F3',
            padding: wp('4%'),
            borderRadius: 5,
            position: 'absolute',
            bottom: hp('5%')
          }}
        >
          <Text style={{ color: '#fff', fontSize: wp('4.5%'), }}>Add Address</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderExpected() {
    return (
      <View style={{ padding: wp('4%') }}>
        <Text style={{ fontSize: wp('4.4%'), fontWeight: '400', paddingBottom: hp('1.5%') }}>Expected Delivery Time</Text>
        <Text style={{ fontSize: wp('4%'), color: "#000", paddingLeft: wp('3%') }}>{this.state.expectedDelivery}</Text>
      </View>
    )
  }
  render() {
    const { resp, service, finalAmount } = this.props.navigation.state.params;
    console.log(`res`, resp);
    return (
      <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'space-between' }}>
        <Header>Place Order</Header>
        <ScrollView>
          {/*Address section */}
          <AddressSection getselectedaddress={this.getselectedAddress} addresses={this.state.userAddresses} onPress={this.showMap} />
          {/*pickup Date Section */}
          <PickupSection
            service={service}
            createExpected={this.generateExpected}
            data1={data1}
            data2={this.state.timeSlots}
            ref2={(tag2) => { this.tag2 = tag2; }}
            ref1={(tag1) => { this.tag1 = tag1 }} />
          {this.renderExpected()}
          {/*ClothesList */}
          <ClothesList data={this.props.navigation.state.params} navigation={this.props.navigation} />
          <STPCard finalAmount={finalAmount}>Total Amount</STPCard>
        </ScrollView>
        <Button2 onPress={this.postOrder}>Place Order</Button2>
        {this.renderMap()}
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(58, 104, 121,0.55)"
          animationStyle={styles.lottie}
          speed={1}
          source={require('../assets/svg/animate2.json')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: wp('25%'),
    height: hp('12%')
  },
  input: {
    paddingLeft: wp('3%'),
    height: hp('7.5%'),
    borderRadius: 5,
    backgroundColor: '#fff',
    width: wp('90%'),
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: hp('96%'),
    width: wp('100%'),
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});