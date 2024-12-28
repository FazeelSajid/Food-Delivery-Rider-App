import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Fonts } from '../../../constants'
import DeliverySucces from '../../../Assets/svg/DeliverySuccess.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { BASE_URL, STRIPE_PUBLISH_KEY } from '../../../utils/globalVariables';
import { useDispatch, useSelector } from 'react-redux';
import { handlePopup } from '../../../utils/helpers/orderApis';
import PopUp from '../../../components/Popup/PopUp';
import CRBSheetComponent from '../../../components/BottomSheet/CRBSheetComponent';
import Alert from '../../../Assets/svg/alert.svg';
import CButton from '../../../components/Buttons/CButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddPaymentToRiderWallet, GetCustomerStripeId } from '../../../utils/helpers';
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import { setWalletTotalAmount } from '../../../redux/AuthSlice';
import CInput from '../../../components/TextInput/CInput';
import api from '../../../constants/api';

const DeliverySuccess = ({ navigation, route }) => {

    // console.log(route.params);
    const { rider_id, totalWalletAmount, Colors } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
    const WithDrawBtmSheet = useRef()
    const ref_RBTopUpSheet = useRef();
    const [topUpAmount, setTopUpAmount] = useState();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false)





    const addPaymentToRestaurantWallet = async () => {
        setLoading(true)

        const data = {
            restaurant_id: route?.params?.restaurantId,
            amount: route?.params?.amountToTransfer,
            payed_by: "rider",
            payed_by_id: rider_id,
            order_id: route?.params?.order_Id
        };

        try {
            const response = await fetch(BASE_URL + 'wallet/addPayment_restaurant_wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.status) {
                // Assuming the API returns a success status in the response body
                if (result.status) {
                    console.log('Payment Sent To Restaurent successfully:', result);
                    handlePopup(dispatch, result.message, 'green');
                    setLoading(false)
                    setTimeout(() => {
                        navigation.navigate('Drawer')
                    }, 800)
                    return result;
                } else {
                    console.error('Failed to add payment:', result);
                    //   return null;
                    handlePopup(dispatch, 'Something went wrong', 'red')
                }
            } else {
                console.error('Failed to add payment:', result.message);
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
        }
        finally{
            setLoading(false);
        }
    };

    // Example usage

    const distributePayment = async (orderId) => {
        try {
            setLoading(true)
          const response = await fetch( api.distribute_payment_order + route?.params?.order_Id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          // Check if response is successful
          if (!response.ok) {
            handlePopup(dispatch, 'Something went wrong', 'red')
          }
      
          // Parse the response JSON
          const data = await response.json();
          console.log("API Response:", data);
      
          if (data.status) {
            console.log("Message:", data.message);
            handlePopup(dispatch, 'Payment added to your wallet', 'green')
            setTimeout(() => {
                navigation.navigate('Drawer')
            },1100)
            // navigation.navigate('Drawer')
            return data.result;
          } else {
            handlePopup(dispatch, 'Something went wrong', 'red')
          }
      
        } catch (error) {
          console.error("Error in distributePayment:", error);
          return null;
        }
        finally{
            setLoading(false);
        }
      };
      

    const fetchPaymentSheetParams = async () => {
        // console.log('fetchPaymentSheetParams called...');

        let customer_stripe_id = await GetCustomerStripeId(rider_id);
        console.log({ customer_stripe_id });


        try {
            const response = await fetch(`${BASE_URL}payment/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseInt(topUpAmount) * 100,  // Amount in cents
                    currency: 'usd',
                    stripe_customer_id: customer_stripe_id
                }),
            });

            // console.log(response);


            // Check if the response is successful
            if (!response.ok) {
                console.error('Failed to fetch payment sheet parameters:', response.statusText);
                return null;
            }

            // Parse the response as JSON
            const responseData = await response.json();
            console.log(responseData);

            console.log('Parsed Payment Params:', {
                amount: parseInt(topUpAmount) * 100,  // Amount in cents
                currency: 'usd',
                customerId: customer_stripe_id
            });

            // Check if the API returned an error status in the response JSON
            if (responseData.status === false) {
                console.error('Error in response:', responseData.message);
                return null;
            }


            // Assuming the responseData contains the fields: paymentIntent, ephemeralKey, and customer
            const { paymentIntent, ephemeralKey, customer } = responseData;

            // console.log('Fetched Payment Params:', { paymentIntent, ephemeralKey, customer });

            return {
                paymentIntent,
                ephemeralKey,
                customer,
            };
        } catch (error) {
            console.error('Error in getting Stripe params from wallet screen:', error);
            return null;
        }
        finally {
            setLoading(false);
        }
    };



    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        setLoading(false);
        if (error) {
            console.log(error);

            // Alert.alert(`Error code: ${error.code}`, error.message);
            if (error.code == 'Canceled') {
                // user cancel payment
                // for now we do nothing...
            } else {
                handlePopup(dispatch, error.message, 'red')
            }
        } else {
            // handle success
            console.log('Success', 'Top-Up is confirmed!');
            // dispatch(setWalletTotalAmount(parseInt(totalWalletAmount) + parseInt(topUpAmount)))

            await AddPaymentToRiderWallet(topUpAmount, rider_id)
                .then(response => {
                    console.log('AddPaymentToCustomerWallet : ', response);
                    handlePopup(dispatch, 'Payment added successfully', 'green')

                    dispatch(setWalletTotalAmount(response?.result?.available_amount))
                    // setTimeout(() => {
                    //   showAlertLongLength('Payment added successfully', 'green');
                    // }, 300);
                    // setTotalAmount(response?.result?.available_amount);

                    setTopUpAmount('');
                    // onpress()

                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const initializePaymentSheet = async () => {
        setLoading(true);
        const { paymentIntent, ephemeralKey, customer } =
            await fetchPaymentSheetParams();
        console.log({ paymentIntent, ephemeralKey, customer }, 'initialize payment sheet params');


        initStripe({
            publishableKey: STRIPE_PUBLISH_KEY,
        });

        const { error } = await initPaymentSheet({
            appearance: {
                // shapes: {
                //   borderRadius: 12,
                //   borderWidth: 0.5,
                // },
                // primaryButton: {
                //   shapes: {
                //     borderRadius: 20,
                //   },
                // },
                colors: {
                    // primary:Colors.primary_color,
                    // background: '#FFFFFF',
                    // componentBackground: '#FFFFFF',
                    // componentBorder: '#000000',
                    // componentDivider: '#000000',
                    // primaryText:Colors.primary_color,
                    // secondaryText:Colors.primary_color,
                    // componentText:Colors.primary_color,
                    placeholderText: Colors.secondary_color,
                },
            },

            merchantDisplayName: 'Food Delivery',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            // allowsDelayedPaymentMethods: true,
            // defaultBillingDetails: {
            //   name: 'Jane Doe',
            // },
        });
        setLoading(false);
        if (!error) {
            // setLoading(true);
            console.log('openning.... payment sheet');
            openPaymentSheet();
        }
    };





    const onpress = () => {
        if (totalWalletAmount < route?.params?.amountToTransfer) {
            WithDrawBtmSheet?.current?.open()
        }
        else {
            addPaymentToRestaurantWallet()
        }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.secondary_color
        },
        heading: {
            color: Colors.primary_text,
            fontSize: RFPercentage(3),
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
            textAlign: 'center',
            width: wp(80),
            alignSelf: 'center'
    
        },
        contentContainer: {
            position: 'absolute',
            // alignSelf: 'center',
            top: hp(50),
            width: wp(100),
    
        },
        rowView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(3),
            width: wp(80),
            alignSelf: 'center'
            // width: 100
        },
        label: {
            color: Colors.secondary_text,
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
            fontSize: RFPercentage(2.1),
    
        },
        Value: {
            color: Colors.primary_text,
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
            fontSize: RFPercentage(2),
    
        },
        acceptButton: {
            backgroundColor:Colors.primary_color,
            paddingVertical: hp(1.8),
            // paddingHorizontal: wp(15),
            borderRadius: wp(10),
            marginBottom: hp(3),
            marginHorizontal: wp('5'),
            marginTop: wp('7'),
    
        },
        buttonText: {
            color: Colors.secondary_color,
            fontSize: wp(4),
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
            textAlign: 'center',
            width: '100%',
            // backgroundColor: 'green'
        },
        rowViewSB: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        rowViewSB1: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 10,
        },
        rbSheetHeading: {
            color: Colors.primary_text,
            fontFamily: Fonts.PlusJakartaSans_Bold,
            fontSize: RFPercentage(1.9),
        },
        btmsheettext: {
            color: Colors.secondary_text,
            fontFamily: Fonts.PlusJakartaSans_Regular,
            marginLeft: wp(5),
            fontSize: RFPercentage(1.9),
        },
    })


    return (
        <View style={styles.container} >
            {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
            <DeliverySucces width={wp(100)} height={hp(100)} />
            <View style={styles.contentContainer} >
                <Text style={styles.heading} >Order Delivered Successfully</Text>
                <View style={styles.rowView} >
                    <Text style={styles.label} >Order Amount</Text>
                    <Text style={styles.Value} >£{route?.params?.amount}</Text>
                </View>
                <View style={styles.rowView} >
                    <Text style={styles.label} >Amount To Transfer</Text>
                    <Text style={styles.Value} >£{route?.params?.amountToTransfer}</Text>
                </View>
                <View style={styles.rowView} >
                    <Text style={styles.label} >Earned Commission</Text>
                    <Text style={styles.Value} >£{route?.params?.commission}</Text>
                </View>
                {/* <View style={styles.rowView} >
                    <Text style={styles.label} >Delivery Time</Text>
                    <Text style={styles.Value} >25 min</Text>
                </View> */}
                <View style={styles.rowView} >
                    <Text style={styles.label} >Distance Travelled</Text>
                    <Text style={styles.Value} >15 Km</Text>
                </View>


                {route?.params?.payment_option === 'cash' ? <TouchableOpacity onPress={() => onpress()} style={[styles.acceptButton]}>
                    { loading ? <ActivityIndicator size={"small"} color={Colors.secondary_color} /> : <Text style={styles.buttonText}>Transfer payment to restaurant</Text>}
                </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => distributePayment()} style={[styles.acceptButton]}>
                          { loading ? <ActivityIndicator size={"small"} color={Colors.secondary_color} /> : <Text style={styles.buttonText}>Get Commission</Text>}
                    </TouchableOpacity>}
            </View>

            <CRBSheetComponent
                height={310}
                refRBSheet={WithDrawBtmSheet}
                content={
                    <View style={{ width: wp(90) }} >
                        <View style={[styles.rowViewSB1, { alignItems: 'flex-end' }]}>
                            <TouchableOpacity
                                onPress={() => WithDrawBtmSheet?.current?.close()}>
                                <Ionicons name={'close'} size={22} color={Colors.primary_text} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <Alert height={80} />
                            <Text style={{ marginTop: hp(3), fontSize: RFPercentage(2.4), color: Colors.primary_text, textAlign: 'center' }}>
                                You don't have enough amount in wallet</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: wp(80),
                                alignSelf: 'center'
                            }}>
                            <CButton
                                title={'Cancel'}
                                width={wp(36)}
                                height={hp(5.5)}
                                marginTop={hp(5)}
                                onPress={() => WithDrawBtmSheet?.current?.close()}
                                transparent={true}
                            />
                            <CButton
                                title={'Top-Up'}
                                width={wp(36)}
                                height={hp(5.5)}
                                marginTop={hp(5)}
                                onPress={() => {
                                    WithDrawBtmSheet?.current?.close()
                                    setTimeout(() => {
                                        ref_RBTopUpSheet?.current?.open()
                                    }, 200);

                                }}
                            />
                        </View>


                    </View>
                }
            />

            <CRBSheetComponent
                refRBSheet={ref_RBTopUpSheet}
                height={hp(38)}
                content={
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={{ paddingHorizontal: 20 }}>
                            <View style={{ ...styles.rowViewSB, marginBottom: 15 }}>
                                <Text
                                    style={{
                                        color:Colors.primary_text,
                                        fontFamily: Fonts.PlusJakartaSans_Bold,
                                        fontSize: RFPercentage(2.5),
                                    }}>
                                    Top-up
                                </Text>
                            </View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text
                                    style={{
                                        color:Colors.primary_color,
                                        fontFamily: Fonts.PlusJakartaSans_Bold,
                                        fontSize: RFPercentage(2.2),
                                        marginBottom: 6,
                                    }}>
                                    Current Balance: $ {totalWalletAmount}
                                </Text>
                                <Text
                                    style={{
                                        color:Colors.primary_color,
                                        fontFamily: Fonts.PlusJakartaSans_Bold,
                                        fontSize: RFPercentage(2.2),
                                        marginBottom: 14,
                                    }}>
                                    Amount To Pay: $ {route?.params?.amountToTransfer}
                                </Text>
                                <CInput
                                    placeholder="Top-up Amount"
                                    textAlignVertical="top"
                                    onChangeText={(text) => setTopUpAmount(text)}
                                    value={topUpAmount}
                                    keyboardType="numeric"
                                />
                               
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flex: 1,
                                        paddingHorizontal: 10,
                                        marginTop: 5,
                                    }}>
                                    <CButton
                                        title="CANCEL"
                                        transparent={true}
                                        width={wp(35)}
                                        height={hp(5.5)}
                                        onPress={() => ref_RBTopUpSheet?.current?.close()}
                                    />
                                    <CButton
                                        title="NEXT"
                                        width={wp(35)}
                                        height={hp(5.5)}
                                        onPress={() => {
                                            ref_RBTopUpSheet?.current?.close();
                                            setTimeout(() => {
                                                initializePaymentSheet()
                                            }, 200);


                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            />


        </View>
    )
}

export default DeliverySuccess

