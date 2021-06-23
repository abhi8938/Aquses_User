import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OrderAddressCard } from '../components/OrderAddressCard';
import { getUserCard } from '../ApiRequests/GetData';

export default class MyAddresses extends React.Component {

  state={
   data:[]
  }
renderItem= (data) => {
  
  return (
      <OrderAddressCard data={data.item}>{'Address'}</OrderAddressCard>
  )
}

componentDidMount() {
  this.setState({ loading: true});
  this.didBlurSubscription = this.props.navigation.addListener(
    'willFocus',
   async payload => {
      const user = await getUserCard();
     this.setState({ data:user.Addresses},() =>{
       console.log(this.state.data,'data');
     });
     this.setState({ loading: false});
    })
}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <FlatList 
            data={this.state.data}
            renderItem={this.renderItem}

          />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop:hp('1%'),
    backgroundColor:'#F2F2F2'
  },
});
