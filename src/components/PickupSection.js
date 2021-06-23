import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TagSelect } from 'react-native-tag-select';


export default class PickupSection extends Component {
    
    render() {
        return (
        <View style={{padding:wp('4%')}}>
         <Text style={styles.heading}>{this.props.service} - Details</Text>
        <View style={styles.containerInner}>
        <Text style={styles.text}>Pick up Date</Text>
       
        <ScrollView
         contentContainerStyle={styles.SelectableContainer}
         horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
        <View>
        <TagSelect
          data={this.props.data1}
          max={1}
          ref={this.props.ref1}
          onMaxError={() => {
            alert('UnSelect the Selected Date');
          }}
          onItemPress= {this.props.createExpected}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
        </View>
        </ScrollView>
        </View>
        <View style={styles.containerInner}>
        <Text style={styles.text}>Pick up Time</Text>
        <ScrollView
         contentContainerStyle={styles.SelectableContainer}
         horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
        <View>
        <TagSelect
          data={this.props.data2}
          max={1}
          ref={this.props.ref2}
          onMaxError={() => {
            alert('UnSelect the Selected Time');
          }}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
        </View>
        </ScrollView>
        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
      labelText: {
        color: '#333',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 15,
      },
      item: {
        borderWidth: 1,
        borderColor: '#2196F3',    
        backgroundColor: '#FFF',
        borderRadius:30
      },
      label: {
          fontSize:wp('2.5%'),
        color: '#333'
      },
      itemSelected: {
        backgroundColor: '#2196F3',
      },
      labelSelected: {
        color: '#FFF',
      },
    heading:{
        fontSize:wp('5%'),
        fontWeight:'500'
    },
    containerInner:{
        paddingTop:hp('1.5%')
    },
    text:{
        fontSize:wp('4%'),
        color:'#000'
    },
    SelectableContainer:{
        marginTop: hp('1.5%'),
        height:hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    
    }
})
