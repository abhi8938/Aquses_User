import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserCard from '../components/UserCard';
import NavList from '../components/NavList';
import { getUserCard } from '../ApiRequests/GetData';
export default class AccountScreen extends React.Component {
 
 state={
   user:{}
 } 
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

  componentDidMount() {
    this.setState({ loading: true});
    this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
       const user = await getUserCard();
       this.setState({ user:user});
       this.setState({ loading: false});
      })
  }

  componentWillUnmount(){
    this.didBlurSubscription.remove();
  }
  goToProfile = () =>{
    return this.props.navigation.navigate('profile',{userData:this.state.user})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
           <UserCard onPress={this.goToProfile} name={this.state.user.fullName} />
           <NavList navigation={this.props.navigation} />
           <View style={styles.lastContainer}>
              <Text style={styles.copyrightText}>Developed At Assistech</Text>
           </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  copyrightText:{
    fontSize:wp('4%'),
  color:'#A9A9A9'
  },
  lastContainer:{
    flex:1,
    height:hp('5%'),
    alignItems:'center',
    // justifyContent:'center'
  },
  container: {
  },
  contentContainer: {
    backgroundColor:"#F2F2F2"
  },
});
