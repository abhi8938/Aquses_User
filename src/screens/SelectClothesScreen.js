/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, PermissionsAndroid, Picker } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { List } from 'react-native-paper';
import { SelectableItem } from '../components/SelectableItem';
import { Header } from '../common';
import { getData } from '../data/clothesData';


export default class App extends Component {
  state = {
    value: 0,
    refresh: false,
    selectedData: [],
    isPresent: false,
    TotalItems:0,
    TotalCost:0,
    clothes:[]
  };
  componentDidMount() {
       this.setState({ clothes:getData(), selectedData:[],refresh:!this.state.refresh });
  
  }

  componentWillUnmount(){
  }
  
  increasevalue = (value) => {
    value = value + 1;
    return value
  }
  decreasevalue = (value) => {
    if (value == 0) {
      return value;
    } else {
      value = value - 1;
      return value
    }
  }

  increasePress = (data, price) => {
    if(price == 'NA'){
      return
    }
    data.item.Quantity = this.increasevalue(parseInt(data.item.Quantity));
    this.setState({ TotalItems: this.state.TotalItems + 1, TotalCost:this.state.TotalCost + price});
    this.setState({ refresh: !this.state.refresh })
  }
  decreasePress = (data, price) => {
    if(price == 'NA'){
      return
    }
    data.item.Quantity = this.decreasevalue(parseInt(data.item.Quantity));
    if(this.state.TotalItems == 0){
      return
    }else{
      this.setState({ TotalItems:this.state.TotalItems - 1})
    }
    if(this.state.TotalCost == 0){
      return
    }else{
      this.setState({ TotalCost: this.state.TotalCost - price})
    }
    this.setState({  refresh: !this.state.refresh })
  }
  renderItem = (data) => {
    const { resp, service } = this.props.navigation.state.params;
    let price;
    if(service == 'Wash & Fold'){
      price = data.item.Price.WAF
    }else if(service == 'Wash & Iron'){
      price = data.item.Price.WAI
    }else if(service == 'Express Wash'){
      price = data.item.Price.WAF
    }else if(service == 'Dry Clean'){
      price = data.item.Price.DC
    }
    return (
      <SelectableItem
        data={data}
        onPressI={() => this.increasePress(data, price)}
        onPressD={() => this.decreasePress(data, price)}
        price={price}
      >{data.item.Quantity}</SelectableItem>
    );
  }

  selectedItems = () => {
    const { resp, service } = this.props.navigation.state.params;
    let selectedData = new Array;
    const Men = this.state.clothes.Men;
    const Women = this.state.clothes.Women;
    const HouseHold = this.state.clothes.HouseHold;
    const Kids = this.state.clothes.Kids;
    Men.forEach(element => {
      if (element.Quantity > 0) {
        // console.log(`MT`,element)
        selectedData.push(element);
      }
    });
    Women.forEach(element => {
      if (element.Quantity > 0) {
        // console.log(`MB`,element);
        selectedData.push(element);
      }
    });
    HouseHold.forEach(element => {
      if (element.Quantity > 0) {
        // console.log(`W`,element);
        selectedData.push(element);
      }
    });
    Kids.forEach(element => {
      if (element.Quantity > 0) {
        selectedData.push(element);
      }
    });
    if (selectedData.length == 0) {
      alert('No clothes Selected');
    } else {
      this.props.navigation.navigate('OrderDetails', { selectedData, resp, service, finalAmount:this.state.TotalCost, totalItems:this.state.TotalItems });
    }
  }
  render() {
    const { resp, service } = this.props.navigation.state.params;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'space-between' }}>
        <ScrollView>
          <Header>Choose clothes</Header>
          <View style={styles.firstContainer}>
            <Text style={styles.text}>Service selected</Text>
            <Text style={[styles.text, { fontWeight: '500' }]}>*Guideline to follow for the product</Text>
            <Text style={styles.text}>{service}</Text>
          </View>
          <View style={{ paddingTop: hp('2%'), paddingLeft: wp('1%') }}>
            <List.Accordion
              color='#2196F3'
              title="Men"
              style={{ padding: wp('1%'), width: wp('99%'), paddingRight: wp('1%') }}
            >
              <FlatList
                data={this.state.clothes.Men}
                renderItem={this.renderItem}
                keyExtractor={(data) => data.Id}
                extraData={this.state.refresh}

              />
            </List.Accordion>
            <List.Accordion
              color='#2196F3'
              title="Women"
              style={{ padding: wp('1%'),  width: wp('99%'), paddingRight: wp('1%') }}
            >
              <FlatList
                data={this.state.clothes.Women}
                keyExtractor={(data) => data.Id}
                renderItem={this.renderItem}
                extraData={this.state.refresh}
              />
            </List.Accordion>
            <List.Accordion
              color='#2196F3'
              title="HouseHold's"
              style={{ padding: wp('1%'),  width: wp('99%'), paddingRight: wp('1%') }}
            >
              <FlatList
                data={this.state.clothes.HouseHold}
                keyExtractor={(data) => data.Id}
                renderItem={this.renderItem}
                extraData={this.state.refresh}
              />
            </List.Accordion>
            <List.Accordion
              color='#2196F3'
              title="Kids"
              style={{ padding: wp('1%'),  width: wp('99%'), paddingRight: wp('1%') }}
            >
              <FlatList
                data={this.state.clothes.Kids}
                keyExtractor={(data) => data.Id}
                renderItem={this.renderItem}
                extraData={this.state.refresh}
              />
            </List.Accordion>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={this.selectedItems}
          style={{ height: hp('8%'), flexDirection: 'row', width: wp('100%'), backgroundColor: '#808080' }}>
          <View style={{ flex: 1, paddingLeft: wp('1.5%'), alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ color: '#fff' }}>Total Items {this.state.TotalItems} </Text>
          <Text style={{ color:'#231104'}}>Total Cost: Rs. {this.state.TotalCost}</Text>
          </View>
          <View style={{ flex: 1, paddingRight: wp('1.5%'), justifyContent: 'center', alignItems: 'flex-end' }}><Text style={{ color: '#fff' }}>Proceed ></Text></View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    paddingLeft: wp('3%'),
    paddingBottom: hp('2%')
  },
  firstContainer: {
    marginLeft: wp('1.5%'),
    width: wp('97%'),
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 2,
    margin: wp('1%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    backgroundColor: '#fff',
  },

});
