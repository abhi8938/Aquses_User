import axios from 'axios';
import { getUserCard } from './GetData';
import AsyncStorage  from '@react-native-community/async-storage';

export const sendOtp = async (mobileNumber, otp) =>{
  const message = `Your one time password is ${otp}`;
  var config ={
      params:{
          "username": 'sachin.patel036' ,
      "password": "69120784",
      "source": 'LANGRU',
      "dmobile": `91${mobileNumber}`,
      "message":message
      }
  }
  return axios.post('https://www.txtguru.in/imobile/api.php',{
      mobileNumber
  },config).then(response =>{
     return response
  }).catch(err =>{
      return err.response
  })
}

export const sendResetRequest = async (email) =>{

  return axios.post('https://aquses.herokuapp.com/api/resetPassword',{
  email
}).then(response => {

  return response;
}).catch(error => {

  return error.response;
})
}

export const addAddress = async (address, HF, customerId, coords) =>{
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
    headers: {'Content-Type': 'application/json',
        'x-auth-token': userToken}
  };

  return axios.put('https://aquses.herokuapp.com/api/users/address',{
   customerId,
   HF,
   address,
   coords
  }).then(response =>{
    return response;
  }).catch(err =>{
    return err.response
  })
}

//START
export const addTransaction = async (TxnId,Amount,TxnStatus,customerId, orderId) =>{
  const userToken = await AsyncStorage.getItem('userToken');
var config = {
  headers: {'Content-Type': 'application/json',
      'x-auth-token': userToken}
};
  return axios.post('https://aquses.herokuapp.com/api/transactions',{
     TxnId,
     Amount,
     TxnStatus,
     customerId,
     orderId
  },config).then(response =>{
      return response
  }).catch(err =>{
      return err.response
  })
}
//END
//START

export const createOrder = async (item, Payment ) => {
 const expectedDelivery = item.expectedDelivery;
 const serviceType = item.serviceType;
 const pickUp = item.pickUp;
 const customerId = item.customerId;
 const clothesItem = item.clothesItem;
 const orderAddress = item.orderAddress;
 const mode = Payment.mode;
 const paid = Payment.paid;
 const transactionId = Payment.transactionId;
 const finalAmount = item.finalAmount;
  return axios.post('https://aquses.herokuapp.com/api/orders', {
    expectedDelivery,
    serviceType,
    pickUp,
    orderAddress,
    clothesItem,
    customerId,
    mode,
    paid,
    transactionId,
    finalAmount
  })
    .then(response => {
      return response
    })
    .catch(error => { 
      return error.response });
}
export const updatePassword = async (
  customerId,
  oldPassword,
  newPassword
) => {
  // alert(customerId);
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken
    }
  };
  return axios.put('https://aquses.herokuapp.com/api/users/password', {
    customerId,
    oldPassword,
    newPassword

  }, config)
    .then(response => {
      return response.data
    })
    .catch(error => { return error.response.data });
}
//end

//start
export const updateUserDetails = async (
  customerId,
  firstName,
  lastName,
  mobileNumber,
) => {
  // alert(customerId);
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken
    }
  };
  return axios.put('https://aquses.herokuapp.com/api/users/details', {
    customerId,
    firstName,
    lastName,
    mobileNumber,

  }, config)
    .then(response => {
      return response.data
    })
    .catch(error => { return error.response.data });
}

//end
//START
//start
export const sendAuthorization = async (razorResponse, response) => {
  const success = 'MoneyAdd SuccessFull';
  const razorpay_order_id = razorResponse.razorpay_order_id;
  const razorpay_payment_id = razorResponse.razorpay_payment_id;
  const razorpay_signature = razorResponse.razorpay_signature;
  const customer_Id = response.data.customer_Id;  
  const amount = response.data.amount;
  const orderId = response.data.orderId;
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
      headers: {'Content-Type': 'application/json',
          'x-auth-token': userToken}
  };
  return axios.put('https://aquses.herokuapp.com/api/rzptransactions',{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_Id,
      amount,
      orderId
  },config).then(response => {
      
      return response;
  }).catch(err => {
      return err.response;
  });
  }


//The end

//END
export const CreateRZPRequest = async (
  amount
  
) => {

  //call post request with data and create player log response
  const userData = await getUserCard();
  const customer_Id = userData.customerId;
  const customerEmailId = userData.emailAddress;
  const customerMobile = userData.mobileNumber;
  //send order request to route
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken
    }
  };
  return axios.post('https://aquses.herokuapp.com/api/rzptransactions', {
    customer_Id,
    amount,
    customerEmailId,
    customerMobile,
  }, config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error.response.data);
      return error;
    });
}
//Create new user
export const CreateUser = async (
  fullName,
  emailAddress,
  mobileNumber,
  password,
) => {
  const success = 'Success';
  return axios.post('https://aquses.herokuapp.com/api/users', {
    fullName: fullName,
    emailAddress: emailAddress,
    mobileNumber: mobileNumber,
    password: password
  })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.response
    });
}

export const createUserToken = async (
  emailAddress,
  password
) => {

  return axios.post('https://aquses.herokuapp.com/api/auth/user', {
    emailAddress: emailAddress,
    password: password
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}


