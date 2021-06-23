import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const getOrders = async () => {
    const userData = await getUserCard();
    console.log('userdarta',userData);
    const customerId = userData.customerId;
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken,
            'customerid': customerId
           }
    };
   return axios.get('https://aquses.herokuapp.com/api/orders/customer', config)
   .then(response => {

       return response;
   })
   .catch( error => {
       return error.response;
   })
}

export const getUserCard = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': Token}
    };
   return axios.get('https://aquses.herokuapp.com/api/users/me', config)
   .then(response => {

       return response.data;
   })
   .catch( error => {
    console.log(error.response.data);  
    return error;
   })
}
//START
export const countTransactions = async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken },
        data:{}
    };
    return axios.get('https://aquses.herokuapp.com/api/transactions/count',config)
    .then(response => {
       return response.data;
    })
    .catch( error => {
        console.log(error.response.data);
        return error.response.data;
    });
}
//END

//START
export const getCoupons = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken },
        data:{}
    };
    return axios.get('https://aquses.herokuapp.com/api/coupons',config)
    .then(response => {
       return response.data;
    })
    .catch( error => {
        console.log(error.response.data);
        return error.response.data;
    });
}
//END
