import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

export default class ClothesList extends Component {
    renderItem(data){
        if(data.item.Quantity > 0){
     return(
         <View style={{ width:wp('90%'), paddingTop:hp('.5%'), paddingBottom:hp('.5%'), flexDirection:'row', justifyContent:'space-between'}}>
         <Text style={{ fontSize:wp('4.5%'), fontWeight:'400', paddingTop:hp('.4%')}}>{data.item.Item}</Text>
         <View style={{ borderRadius:30, borderColor:'#2196F3', borderWidth:2, paddingLeft:wp('1.5%'), paddingRight:wp('1.5%')}}>
         <Text 
         style={{ fontSize:wp('4.5%'), fontWeight:'400'}}
         >{data.item.Quantity}
         </Text>
         </View>
         </View>
     )
    }
    }
    renderList(data){
        return(
            <FlatList
                 data={data}
            keyExtractor={(data) => data.Id}
            renderItem={this.renderItem}
            />
        )
    }
    render() {
                const {selectedData} = this.props.data;

        return (
            <View style={{ padding:wp('4%')}}>
            <Text style={{ color:'#000', fontSize:wp('5.5%'), paddingBottom:hp('1.5%') }}>Clothes</Text>
            {this.renderList(selectedData)}
            <View style={{ width:wp('90%'), alignItems:'center', paddingTop:hp('1.5%'), height:hp('7%'), justifyContent:"center"}}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SelectScreen')}
            style={{ backgroundColor:"#2196F3", padding:wp('3.5%'), borderRadius:5}}
            >
            <Text style={{ color:'#fff', fontSize:wp('3.5%')}}>Add more clothes</Text>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({})
