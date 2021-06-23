import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackActions, NavigationActions } from 'react-navigation';
export default class Success extends Component {

    render() {
        const { resp } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', height: hp('60%'), justifyContent: 'space-evenly' }}>
                    <Image
                        source={require('../assets/images/orderImage.png')}
                        style={styles.Image}
                    />
                    <Text style={{ fontSize: wp('8%'), fontWeight: '800', color: '#347EBD' }}>Order Placed</Text>
                    <Text style={{ fontSize: wp('6%'), fontWeight: '500', color: '#000' }}> Your OrderID: <Text style={{ fontSize: wp('5%'), fontWeight: '400', color: '#000' }}>{resp.orderId}</Text></Text>
                    <Text style={{ fontSize: wp('6%'), fontWeight: '500', color: '#000' }}>We will make your pickup soon.</Text>
                    <Text style={{ marginRight: wp('2%'), marginLeft: wp('7%'), fontSize: wp('4.5%'), fontWeight: '500', color: '#808080' }}>Please visit MyOrders page to track your order's status.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                            const navigateAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({
                                    routeName: "Main",
                                    action: NavigationActions.navigate({ routeName: "OrderScreen" })
                                })],
                            });
                           return this.props.navigation.dispatch(navigateAction);

                    }} style={styles.button}><Text style={styles.buttonText}>My Orders</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      const navigateAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({
                                    routeName: "Main"
                                })],
                            });
                           return this.props.navigation.dispatch(navigateAction);
                    }} style={[styles.button, { backgroundColor: '#fff', borderColor: '#347EBD', borderWidth: 2 }]}><Text style={[styles.buttonText, { color: '#000' }]}>Home</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: '400'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#347EBD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        height: hp('7%'),
        margin: wp('5%')
    },
    buttonContainer: {

        flexDirection: 'row'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    Image: {
        width: wp('40%'),
        height: hp('25%')
    }
})
