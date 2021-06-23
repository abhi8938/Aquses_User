
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
import { TouchableRipple } from 'react-native-paper';
const OrderListItem2 = (props) => {
  const { item } = props.data;
  let amount = '₹' + item.finalAmount;
  if (item.finalAmount == undefined) {
    amount = 'TBA'
  }
  const date = item.orderPlaced;
  return (
    <TouchableRipple
      onPress={props.onPress}
      style={{ backgroundColor: '#fff', marginBottom: hp('.8%') }}
    >
      <View style={styles.OrderItem}>
        <View style={styles.OrderImageContainer}>
          <Image
            source={require('../../assets/images/dlogo.png')}
            style={{
              width: wp('7%'),
              height: hp('5%'),
              //    overflow:'hidden',
              padding: 0,
              position: 'absolute'
            }}
            resizeMode={'stretch'}
          />
          <AnimatedCircularProgress
            size={70}
            width={3}
            fill={100}
            tintColor="#2196F3"
            backgroundColor="#F2F2F2" />
        </View>
        <View style={styles.OrderHeadingContainer}>
          <Text style={styles.OrderHeadingText}>Order Id: {item.orderId}</Text>
          <Text style={styles.OrderStatusText}>Order {item.orderStatus}</Text>
        </View>
        <View style={styles.OrderPaymentContainer}>
          <Text style={styles.OrderValueText}>{amount}</Text>
          <Text style={styles.OrderDateText}>{date.slice(0, 10)}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  OrderDateText: {
    fontSize: wp('3%'),
  },
  OrderValueText: {
    fontSize: wp('4.2%'),
    color: '#000',
    paddingBottom: hp('0.5%')
  },
  OrderStatusText: {
    fontSize: wp('3.5%'),
    color: '#2196F3',
  },
  OrderHeadingText: {
    fontSize: wp('4.2%'),
    color: '#000',
    paddingBottom: hp('0.5%')
  },
  OrderPaymentContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: wp('1.8%')
  },
  OrderHeadingContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: wp('2.5%')
  },
  OrderImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  OrderItem: {
    flexDirection: 'row',
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    paddingRight: wp('1.5%'),
    paddingLeft: wp('2%'),

  },
});

export { OrderListItem2 };
