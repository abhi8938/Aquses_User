import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OrderListItem2 } from '../components/ListItems/OrderListItem2';
import { getOrders } from './../ApiRequests/GetData';
import { ActivityIndicator } from 'react-native-paper';
export default class MyOrders extends React.Component {

  static navigationOptions = {
    headerTitle:'Account', 
    headerStyle: {
      fontSize:wp('6%'),
      fontweight:'400',
      backgroundColor: '#fff',
      elevation: 1,
      height: hp('8%'),
      margin: 0,
    
    }   
          };

  state = {
    data: [],
    loading:true
  }

  componentDidMount() {
    this.setState({ loading: true});
    this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
       console.log('listener added');
       const orders = await getOrders();
       if(orders.status == 200){
        this.setState({ data:orders.data, loading:false});
       }else{
         alert(orders.data);
       }
  }
  )}

  componentWillUnmount(){
    this.didBlurSubscription.remove();
 }

  renderItem = (data) => {
    return (
      <OrderListItem2 data={data} onPress={() =>{
        setTimeout(() =>{
          this.props.navigation.navigate('Order2', {data})
        },1)
      }} />
    )
  }
  render() {
    if(this.state.loading){
      return(
        <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size={30} color='#347EBD' />
        </View>
      )
    }
    if(this.state.data.length == 0){
      return(
        <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text>No Orders</Text>
        </View>
      )
    }
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
    paddingTop: hp('.5%'),
    backgroundColor: '#F2F2F2'
  },
});
