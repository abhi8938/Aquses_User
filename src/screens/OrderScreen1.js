import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button2, TextField2 } from '../common';
import { ClothListItem } from '../components/ListItems/ClothListItem';
import { OrderStatus } from '../components/OrderStatus';
import { PandDCard } from '../components/PandDCard';
import { OrderAddressCard } from '../components/OrderAddressCard';
import { ClothList } from '../components/ClothList';
import { createOrder } from './../ApiRequests/UploadData';
import AnimatedLoader from 'react-native-animated-loader';
import { STPCard } from '../components/STPCard';
import { getCoupons } from '../ApiRequests/GetData';
export default class OrderScreen1 extends React.Component {
  state = {
    emailAddress: '',
    loading: false,
    coupon:'Enter Code',
    validCoupons:[],
    finalAmount:'',
    applied:false
  }

  componentDidMount() {
    //get coupons
    const { item } = this.props.navigation.state.params;
    this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
      this.setState({ loading: true, finalAmount:item.finalAmount});
       const coupons = await getCoupons();
       this.setState({ validCoupons:coupons},() => console.log(`coupons`,this.state.validCoupons));
       this.setState({ loading: false});
      })
  }

  componentWillUnmount(){
    this.didBlurSubscription.remove();
  }

  renderItem = (data) => {
    return (
      <ClothListItem data={data} />
    );
  }

  apply = () =>{
    //apply coupon
    if(this.state.coupon == ''){
      return alert('Coupon code is empty');
    }
    if(this.state.applied){
      return alert('already applied');
    }
    let valid = false;
    this.state.validCoupons.map(element => {
      if(this.state.coupon == element.Code){
        valid = true;
        const discount = element.Discount;
        const total = this.state.finalAmount;
        let final = (discount/100) * total;
            final = final.toFixed(0);
        this.setState({ finalAmount:this.state.finalAmount - final, applied:true})
        this.props.navigation.state.params.item.finalAmount = this.state.finalAmount - final;
        alert('Discount applied of '+ 'Rs.' + final);
        return
      }
      return
    })
    if(!valid){
      return alert('Invalid Coupon')
    }
  }

  render() {
    const { item } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/*ClothList*/}

          <ClothList
            data={item.clothesItem}
            renderItem={this.renderItem}>Your Clothes</ClothList>
          {/*ClothList*/}

          {/*PickupandDeliveryCard*/}
          <PandDCard item={item} />
          {/*PickupandDeliveryCard*/}

          {/*AddressSection*/}
          <OrderAddressCard item={item}>Address</OrderAddressCard>
          {/*AddressSection*/}
          {/* Coupon TextField */}
          <View style={{ flexDirection:'row', width:'100%', justifyContent:'space-between',alignItems:'center', backgroundColor:'#fff',paddingLeft:wp('6%'), paddingRight:wp('6%'), paddingBottom:hp('1%')}}> 
            <TextInput
              style={{ fontSize:wp('5%'), paddingLeft:wp('2%'), backgroundColor:'#fff', width:wp('65%'), borderWidth:1, borderColor:'#2196F3', borderRadius:10, height:hp('6%'), lineHeight:hp('3.2%')}}
              onChangeText={(coupon) => this.setState({coupon})}
              value={this.state.coupon}
            />
            <TouchableOpacity disabled={this.state.applied} style={{padding:wp('2%'),backgroundColor:'#ccc', borderRadius:5, width:wp('19%'), alignItems:'center'}} onPress={this.apply}><Text style={{color:'#2196F3', fontSize:wp('4.5%'), fontWeight:'bold', width:'84%'}}>Apply</Text></TouchableOpacity>
          </View>
          {/* Coupon TextField */}
          {/*tax and sub total and paid*/}
          <STPCard finalAmount={this.state.finalAmount}>Total Amount</STPCard>
          {/*tax and sub total ad paid*/}
        </ScrollView>
        <Button2 onPress={() => setTimeout(() => this.props.navigation.navigate('Payment',{item}), 1)}>Pay and place order ></Button2>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(58, 104, 121,0.55)"
          animationStyle={styles.lottie}
          speed={1}
          source={require('../assets/svg/animate2.json')}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  lottie: {
    width: wp('25%'),
    height: hp('12%')
  },
  paidValue: {
    flex: 1,
    textAlign: 'right',
    paddingRight: wp('5.5%'),
    fontSize: wp('4.8%'),
    fontWeight: '500',
    color: '#000',
    alignItems: 'center'
  },
  paidText: {
    fontWeight: '500',
    flex: 2,
    fontSize: wp('4.5%'),
    color: '#11C3F0'
  },
  PaidTextContainer: {
    paddingBottom: hp('3%'),
    flexDirection: 'row',
  },
  moneytext: {
    flex: 1,
    fontSize: wp('4.8%'),
    fontWeight: '500',
    color: '#000',
    alignItems: 'center'
  },
  Money: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: wp('5.5%')
  },
  Total: {
    flex: 1
  },
  TotalContainer: {
    flexDirection: 'row',

  },
  heading: {
    fontSize: wp('5%'),
    color: '#A9A9A9',
    fontWeight: '400',
    paddingBottom: hp('1.5%')
  },
  container: {
    borderTopWidth: 0,

  },
  contentContainer: {
    backgroundColor: '#F2F2F2'
  },
});
