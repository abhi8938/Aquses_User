import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  WebView
} from 'react-native';

import RazorpayCheckout from 'react-native-razorpay'; 
import  AnimatedLoader  from 'react-native-animated-loader';
import AlertModal from '../common/AlertModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField1, Button1} from '../common';
import { CreateRZPRequest, sendAuthorization, addTransaction, createOrder } from './../ApiRequests/UploadData';
import { getUserCard , countTransactions} from '../ApiRequests/GetData';
export default class PaymentScreen extends React.Component {
  state={
        TXN_AMOUNT:'0',
        TxnId: '',
        ack:'',
        CUST_ID:'',
        showModal: false,
        loading:false,
        error:false,
        showResponse:false,
        response:'',
  }
  //PAYTM
  async transactionData(){
    const { item } = this.props.navigation.state.params;
    const data = await getUserCard();
    const count = await countTransactions();
    const txn = `TXNN-${parseInt(count)}`;
    let amount = item.finalAmount;
    if(item.finalAmount < 250){
      amount = parseInt(amount) + 49;
    }
    this.setState({
       CUST_ID:data.customerId,
       TxnId:txn,
       TXN_AMOUNT:amount,
       loading:false,
     });
  }
  //PAYTM
  componentDidMount(){
    this.setState({ loading:true});
    this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
      await this.transactionData();
    }
    );
    }
    componentWillUnmount(){
      this.didBlurSubscription.remove();
  }

    generateOrder = async (Payment) => {
    this.setState({ loading: true });
    const { item } = this.props.navigation.state.params;
    return createOrder(item, Payment).then(response => {
      if (response.status == 200) {
        this.setState({ loading: false, showModal:false, showResponse:false, response:'', error:false })
        return this.props.navigation.navigate('success', { resp: response.data });
      } else {
        this.setState({ loading: false });
        return alert(response.data);
      }
    }
    ).catch(err => {
      alert(err);
    })
  }

  //PAYTM
  handleResponse = async (data) => {
  
    const { TxnId, CUST_ID, ack, TXN_AMOUNT} = this.state;

 console.log('data',data);
    if(data.title == 'true'){
       //TODO: Post transaction in database
       this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
      const Txnid = TxnId;
      const Amount = TXN_AMOUNT;
      const TxnStatus = 'SUCCESS';
      const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID);
      console.log(`transaction`, transaction);
      if(transaction.status == 200){
        const Payment = {
          paid:true,
          mode:'PAYTM',
          transactionId:transaction.data.TxnId
        }
        await this.generateOrder(Payment);
      }else{
        this.setState({ loading: false, showModal:false, showResponse:true, response:`Payment Failed`, error:false })
      }
       await this.transactionData();
      
    }else if(data.title == 'false'){
      this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
      const Txnid = TxnId;
      const Amount = TXN_AMOUNT;
      const TxnStatus = 'FAILIURE';
      const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID );
      await this.transactionData();
      this.setState({ loading: false, showModal:false, showResponse:true, response:`Payment Failed`, error:true });
    }else if(data.title == 'CANCELLED') {
      this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
      const Txnid = TxnId;
      const Amount = TXN_AMOUNT;
      const TxnStatus = 'CANCELLED';
      const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID);
      await this.transactionData();
      this.setState({ loading: false, showModal:false, showResponse:true, response:`Payment Cancelled`, error:true })
    };
  }

  //RAZORPAY
       checkout= async (response) => {
        const { item } = this.props.navigation.state.params;
        var options = {
          description: `For Service ${item.serviceType}`,
          currency: 'INR',
          key: 'rzp_live_o59qnpASZKWCz0',
          name: 'Laundry Guru',
          theme: {color: '#2196F3'},
         "order_id": response.data.RAZORPAY_ID
              }
   return RazorpayCheckout.open(options).then((data) => {
      return data;
      }).catch((error) => {
        this.setState({ loading: false, showResponse:true, response:`error: ${error.description}`, error:true })
     return null;
    });
       }
//RAZORPAY
    handleRZP = async () =>{   
      this.setState({ loading: true});
      const amountInPaisa = this.state.TXN_AMOUNT * 100;
      //TODO:Add orderId in function below
        const response = await CreateRZPRequest(amountInPaisa);
       const razorResponse = await this.checkout(response);  
       if(razorResponse != null){
      const paymentResult =  await sendAuthorization(razorResponse, response);
      if(paymentResult.status == 200){
        const Payment = {
          paid:true,
          mode:'NETBANKING/CARD',
          transactionId:paymentResult.data.RAZORPAY_ID
        }
        await this.generateOrder(Payment);
       }else{
      this.setState({ loading: false, showResponse:true, response:`${paymentResult.data}`, error:true });
      }
    }else{
      return
    }
    }
    //RENDER MODAL
    renderModal() {
     
      if(this.state.showResponse){
        return (
          <AlertModal 
           visible={this.state.showResponse}
              onRequestClose={() =>{
                 this.setState({ showResponse:false})
                 }}
                 onPress={() => {
                 this.setState({ showResponse:false});
             }}
             error={this.state.error}
             response={this.state.response}
                 />
        );
      }
    }
    COD = async () =>{
      const Payment = {
        paid:true,
        mode:'COD',
        transactionId:'NOT ASSIGNED'
      }
      await this.generateOrder(Payment); 
    }
  
    render() {
      const { showModal, ack, TxnId, TXN_AMOUNT, CUST_ID, loading} = this.state;
    return (
     
     <View styles={styles.container}>
       <View style={styles.PageHeading}>
         {/*Sign in now */}
         <Text style={styles.ForgotPasswordText}>Select Payment Method </Text>
       </View>
  
       <View style={styles.ButtonContainer}>
        {/** Touchable ForgotPassword */}
        <Button1
         onPress={this.handleRZP}
        >Pay with Debit Card/Credit Card</Button1>
       </View>
       <View style={styles.ButtonContainer}>
        {/** Touchable ForgotPassword */}
        <Button1
         onPress={this.handleRZP}
        >Pay with Netbanking</Button1>
       </View>
       <View style={styles.ButtonContainer}>
        {/** Touchable ForgotPassword */}
        <Button1
         onPress={() =>{ this.setState({ showModal:true})}}
        >Pay With Paytm</Button1>
       </View>
       <View style={styles.ButtonContainer}>
        {/** Touchable ForgotPassword */}
        <Button1
         onPress={this.COD}
        >Cash On Delivery</Button1>
       </View>
       <Modal
      visible={showModal}
      onRequestClose={() => {
        const data={
          title:'CANCELLED'
        }
        this.handleResponse(data);
        }}
      >
        <WebView
          ref={webview => {
              this.myWebView = webview;
                               }}     
          javaScriptEnabled = {true} 
          domStorageEnabled={true}  
          originWhitelist = {['*']}
          source={{uri:'https://aquses.herokuapp.com/api/paytm/request'}}
          injectedJavaScript={ `document.getElementById('ORDER_ID').value = "${TxnId}"; document.getElementById('TXN_AMOUNT').value = "${TXN_AMOUNT}"; document.getElementById('CUST_ID').value = "${CUST_ID}"; document.f1.submit()`}
          onNavigationStateChange ={data => {
            this.handleResponse(data)
            }}
            /> 
      </Modal>
       <AnimatedLoader
             visible={this.state.loading}
             overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../assets/svg/animate2.json')}
              />
       {this.renderModal()}
     </View>
    );
    
  }
}


const styles = StyleSheet.create({
  lottie: {
    width:wp('25%'),
    height:hp('12%')
  },
  registerTitle:{
     fontSize:wp('4.5%'),
     fontWeight:'bold'
  },
  PageHeading:{
   alignItems:'center',
   paddingBottom:hp('4%'),
   paddingLeft:wp('4%'),
   paddingRight:wp('4%')
  },
  ForgotPasswordText:{
      textAlign:'center',
    fontSize:wp('5%'),
    color:'#000',
    paddingTop:hp('10%'),
  },
  appName:{
      fontSize:wp('7%'),
      color:'#000',
      paddingTop:hp('4%'),
      fontWeight:'500'
  },
  ImageContainer:{
    // backgroundColor:'#ccc',
    width:wp('100%'),
    height:hp('18%'),
    alignItems:'center',
    justifyContent:'center' 
  },
  logo:{
    width:wp('20%'),
    height:hp('15%')
  },
  container: {
    borderTopWidth: 0,
    alignItems:'center',
    // justifyContent:'center' 
  },

});
