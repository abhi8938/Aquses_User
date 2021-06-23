import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class AddressSection extends Component {
    state={
        selected:10
    }
    getSelected(selected) {
        var selectedProps = selected? styles.selected: null;
        return {...styles.tick, ...selectedProps}
    }
    renderAddress() {
        if (this.props.addresses != undefined) {
            return this.props.addresses.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => this.setState({ selected:index},() => {return this.props.getselectedaddress(item)})}
                        style={styles.addressTouchable}
                        key={`address${index}`}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{ fontSize: wp('4%'), flex:1 }}
                        >{item.address}</Text>
                      <Image
                          source={require('../assets/images/check.png')}
                          style={this.getSelected(this.state.selected == index)}
                      /> 
                      </View>
                    </TouchableOpacity>
                )
            });
        } else {
            return (
                <View style={{ paddingTop: hp('1.5%') }}><Text style={{ fontSize: wp('4%') }}>No Address available</Text></View>
            )
        }
    }

    render() {
        
        return (
            <View style={{ padding: wp('4%'), borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: hp('1.5%') }}>
                    <Text style={styles.heading}>Delivery / Pickup Options</Text>
                    <TouchableOpacity
                        onPress={this.props.onPress}
                    >
                        <Text style={styles.addressText}>Change Address</Text>
                    </TouchableOpacity>
                </View>
                {this.renderAddress()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    selected:{
        width:20,
      height:20,
      display:'flex'
    },
    tick:{
        display:'none'
    },
    addressTouchable: {
        borderRadius: 4,
        paddingTop: hp('1%'),
        marginBottom: 7,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: hp('1.5%'),
        padding: wp('2%'),
    },
    heading: {
        fontSize: wp('4%'),
        fontWeight: '500'
    },
    addressText: {
        color: "#2196F3",
        fontWeight: '400'
    }
})
