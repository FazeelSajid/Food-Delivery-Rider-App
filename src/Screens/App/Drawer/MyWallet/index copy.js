import { StyleSheet, Text, View, FlatList, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { Colors, Icons, Images, Fonts } from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetWalletAmount } from '../../../../utils/helpers/walletApis';
import { BASE_URL, BASE_URL_IMAGE, STRIPE_PUBLISH_KEY } from '../../../../utils/globalVariables';
import Loader from '../../../../components/Loader';
import NoDataFound from '../../../../components/NotFound/NoDataFound';
import CButton from '../../../../components/Buttons/CButton';
import PaymentCard from '../../../../components/Cards/PaymentCard';
import CRBSheetComponent from '../../../../components/BottomSheet/CRBSheetComponent';
import CInput from '../../../../components/TextInput/CInput';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletTotalAmount } from '../../../../redux/AuthSlice';
import { handlePopup } from '../../../../utils/helpers/orderApis';
import PopUp from '../../../../components/Popup/PopUp';
import { AddPaymentToRiderWallet, GetCustomerStripeId } from '../../../../utils/helpers';
import {
  initStripe,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import ItemSeparator from '../../../../components/Separator/ItemSeparator';
import WebView from 'react-native-webview';

const MYWallet = ({ navigation, route }) => {
  const ref_RBTopUpSheet = useRef();
  const ref_RBWithdrawSheet = useRef();
  const { rider_id, totalWalletAmount } = useSelector(store => store.auth)
  const [transactions, setTrasactions] = useState([])
  const [accountLinkUrl, setAccountLinkUrl] = useState(null); 
  const dispatch = useDispatch()
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
  const [topUpAmount, setTopUpAmount] = useState();
  const btmSheetRef = useRef()
  const [connectedAccountId, setConnectedAccountId] = useState()
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const showBtmSheet = () => {
    btmSheetRef?.current?.open()
  }
  const closeBtmSheet = () => {
    btmSheetRef?.current?.close()
  }

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');


  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([

  ]);


  const toggleSelection = (param) => {
    if (param === 'stripe') {
      setSelectedPaymentMethod(param)
      // signUpWith === param ? dispatch(setSignUpWith('')) : dispatch(setSignUpWith(param))
      // navigation.navigate('SignUpWithstripe')
      // func()
      ref_RBTopUpSheet?.current?.open()
      setTimeout(() => {
        closeBtmSheet()
      }, 300);
    }
    if (param === 'paypal') {
      // signUpWith === 'paypal' ? dispatch(setSignUpWith('')) : dispatch(setSignUpWith(param))
      // navigation.navigate('SignUpWithEmail')
      setTimeout(() => {
        closeBtmSheet()
      }, 300);
      setSelectedPaymentMethod(param)
    }
  }

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


  // const createRiderWallet = async rider_id => {
  //   return new Promise(async (resolve, reject) => {
  //     fetch(api.create_rider_wallet, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         rider_id: rider_id,
  //       }),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(async response => {
  //         resolve(response);
  //       })
  //       .catch(err => {
  //         resolve(false);
  //       });
  //   });
  // };

  // const func = async() =>{

  //   let wallet = await createRiderWallet(rider_id);
  //               console.log('wallet  :  ', wallet);

  // }



  const createConnectedAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}payment/createConnectedAccount?customer_id=${rider_id}`, {
        method: "GET",

      });
      const result = await response.json();

      if (result.status) {

        setConnectedAccountId(result.accountId)

        return result.accountId // Return the connected account ID
      } else {
        handlePopup(dispatch, result.message, 'red')
      }
    } catch (error) {
      handlePopup(dispatch, 'Error while creating connnected account', 'red')

      console.error("Error creating connected account:", error);
      return null;
    }
    finally {
      setLoading(false);
    }
  };

  const WithDrawPayment = async (AccId) => {
    try {
      const response = await fetch(`${BASE_URL}payment/transferPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            amount: parseInt(withdrawAmount),
            currency: "usd",
            stripe_account_id: AccId
            // "stripe_customer_id": "acct_1QHethGaycPqTavv" // the customer to whom you will want to tranfer the payment
          }
        )
      });
      const result = await response.json();

      if (result.status) {
        // Open the Stripe onboarding URL in the browser
        handlePopup(dispatch, "Withdrawal successfull", 'green')
        dispatch(setWalletTotalAmount(parseInt(totalWalletAmount) - parseInt(withdrawAmount)))
        setAccountLinkUrl(null)
      } else {
        handlePopup(dispatch, result.message, 'red')
        // throw new Error(result.message);

      }
    } catch (error) {

      console.error("Error creating WithDraw:", error);
    }
    finally {
      setLoading(false);
      setWithdrawAmount(0)
    }
  };

  const createAccountLink = async () => {
    try {
        const response = await fetch(`${BASE_URL}payment/createAccountLink?customer_id=${rider_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        if (result.status) {
            // Alert.alert("Redirecting", "Please complete your account setup.");
            // Open the Stripe onboarding URL in the browser
            setAccountLinkUrl(result.result.url)
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        // Alert.alert("Error", error.message || "Failed to create account link.");
        console.error("Error creating account link:", error);
    }
};

  const handleAccountSetup = async () => {
    setLoading(true);
    const connectedAccountI = await createConnectedAccount(rider_id);
    console.log({ connectedAccountI });


    if (connectedAccountI) {
      
      await createAccountLink()
    }
  };

    
  const getTransactions = async () => {
    setLoading(true);
    try {
      let amount = await GetWalletAmount(rider_id);
      dispatch(setWalletTotalAmount(amount));
  
      const response = await fetch(api.getRiderTransactionHistory + rider_id);
      const data = await response.json();
  
      if (data.status === true) {
        let list = data?.transactions || [];
        setTrasactions(list);
        // console.log({list});
        
      } else {
        handlePopup(dispatch, data.message, 'red');
      }
    } catch (error) {
      handlePopup(dispatch, 'Something went wrong', 'red');
      console.log(error);
    } finally {
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
        showAlertLongLength(error.message);
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
          // primary: Colors.Orange,
          // background: '#FFFFFF',
          // componentBackground: '#FFFFFF',
          // componentBorder: '#000000',
          // componentDivider: '#000000',
          // primaryText: Colors.Orange,
          // secondaryText: Colors.Orange,
          // componentText: Colors.Orange,
          placeholderText: Colors.White,
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

  useFocusEffect(
    React.useCallback(() => {
      getTransactions();
      // setAccountLinkUrl(null)

    }, []),
  );

  const handleNavigationStateChange = (navState) => {
    console.log(navState.url, 'hvhvh');
    
    if (navState.url.includes('http://localhost:5173/wallet')) {
      WithDrawPayment(connectedAccountId)
      console.log('vhg');
      
      setAccountLinkUrl(null)
    } else if (navState.url.includes('http://localhost:5173/return')) {
      navigation.navigate('MyWallet');
      setAccountLinkUrl(null)
      // WithDrawPayment(connectedAccountId)
    }
  };
// console.log(accountLinkUrl);

  const SUCCESS_URL = "http://192.168.100.199:8081/account-setup-complete"; // Page to redirect to after successful onboarding
const REFRESH_URL = "http://192.168.100.199:8081/account-setup-refresh"; 

console.log({rider_id});


  return (

    
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
       {
        accountLinkUrl ? <WebView
        source={{ uri: accountLinkUrl }}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadEnd={() => setLoading(false)}
        // onError={(syntheticEvent) => {
        //   const { nativeEvent } = syntheticEvent;
        //   console.warn("WebView error: ", nativeEvent);
        //   Alert.alert("Error", "Failed to load the onboarding page.");
        // }}
        style={{ flex: 1 }}
      /> : <View>
           {/* <Loader loading={loading} /> */}
      {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
      <ScrollView refreshControl={<RefreshControl refreshing={loading} colors={[Colors.Orange]} onRefresh={() => {
        getTransactions()
      }} />} contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View style={styles.headerContainer}>
          <StackHeader
            title={'My Wallet'}
            titleColor={'white'}
            backIconColor={'white'}
            statusBarBG={Colors.Orange}
            statusBarStyle={'light-content'}
            headerView={{ marginTop: 10 }}
          />

          {/* <View style={styles.header}>
            <Text style={styles.priceText}>$ {totalAmount}</Text>
            <Text style={styles.totalAmount}>Total Amount</Text>
            </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Inter_SemiBold,
                  color: Colors.White,
                  fontSize: RFPercentage(4),
                  lineHeight: 45,
                }}>
                $ {totalWalletAmount}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.PlusJakartaSans_Medium,
                  color: Colors.White,
                  fontSize: RFPercentage(1.5),
                  opacity: 0.95,
                }}>
                Total Amount
              </Text>
            </View>
            <View>
              <CButton
                title="Withdraw"
                bgColor="#FFF"
                width={100}
                height={35}
                marginTop={-1}
                textStyle={{ color: Colors.Orange, textTransform: 'none' }}
                onPress={() => ref_RBWithdrawSheet?.current?.open()}
              />
              <CButton
                title="Top-up"
                bgColor="#FFF"
                width={100}
                height={35}
                marginTop={10}
                textStyle={{ color: Colors.Orange, textTransform: 'none' }}
                onPress={() => showBtmSheet()}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.heading1}>Payment Methods</Text> */}
          {/* <PaymentCard /> */}
          <Text style={styles.heading1}>Transaction History</Text>
          <FlatList
            data={transactions}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.transactionsContianer}
            // ListHeaderComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => <NoDataFound loading={loading} svgHeight={hp(30)} text={'No Record Found'} textStyle={{fontSize : RFPercentage(2.3)}} />}
            renderItem={({ item, index }) => {
              // console.log(item);
              
              return (
                <View style={{marginBottom: wp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <View style={{}} >
                  <Text style={styles.transactionId}>{item.transaction_id}</Text>
                  <Text style={styles.transactionType}>{item.transaction_type === 'deposit' ? 'Deposit' : 'Withdraw'}</Text>
                </View>
                <Text style={[styles.transactionsAmount, item.transaction_type === 'deposit' && {color:'#19BA46' }]} >{item.transaction_type === 'deposit' ? '+' : '-'} ${item.amount}</Text>
              </View>
              );
            }}
          />


        </View>
      </ScrollView>
      <CRBSheetComponent
        refRBSheet={ref_RBWithdrawSheet}
        height={hp(35)}
        content={
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ ...styles.rowViewSB, marginBottom: 20 }}>
                <Text
                  style={{
                    color: '#0A212B',
                    fontFamily: Fonts.PlusJakartaSans_Bold,
                    fontSize: RFPercentage(2.5),
                  }}>
                  Enter Amount for Withdraw
                </Text>
                <Text
                  style={{
                    color: Colors.Orange,
                    fontFamily: Fonts.PlusJakartaSans_Bold,
                    fontSize: RFPercentage(2.2),
                    marginTop: 10,
                  }}>
                  Current Balance: $ {totalWalletAmount}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10, marginTop: 0 }}>
                <CInput
                  placeholder="Enter Amount To Withdraw"
                  textAlignVertical="top"
                  onChangeText={(text) => setWithdrawAmount(text)}
                  value={withdrawAmount}
                  keyboardType="numeric"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    paddingHorizontal: 10,
                    marginTop: 0,
                  }}>
                  <CButton
                    title="CANCEL"
                    transparent={true}
                    width={wp(35)}
                    height={hp(5.5)}
                    onPress={() => ref_RBWithdrawSheet?.current?.close()}
                  />
                  <CButton
                    title="NEXT"
                    width={wp(35)}
                    height={hp(5.5)}
                    onPress={() => {
                      ref_RBWithdrawSheet?.current?.close();
                      handleAccountSetup()
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        }
      />

      <CRBSheetComponent
        refRBSheet={ref_RBTopUpSheet}
        height={hp(38)}
        content={
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ ...styles.rowViewSB, marginBottom: 20 }}>
                <Text
                  style={{
                    color: '#0A212B',
                    fontFamily: Fonts.PlusJakartaSans_Bold,
                    fontSize: RFPercentage(2.5),
                  }}>
                  Top-up
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    color: Colors.Orange,
                    fontFamily: Fonts.PlusJakartaSans_Bold,
                    fontSize: RFPercentage(2.2),
                    marginBottom: 14,
                  }}>
                  Current Balance: $ {totalWalletAmount}
                </Text>
                <CInput
                  placeholder="Top-up Amount"
                  textAlignVertical="top"
                  onChangeText={(text) => setTopUpAmount(text)}
                  value={topUpAmount}
                  keyboardType="numeric"
                />
                {/* <Text
                      style={{
                        color: '#A2A2A2',
                        marginTop: -15,
                        fontSize: RFPercentage(1.5),
                        marginLeft: 14,
                      }}>
                      Enter an amount from $ 100-$1,000
                    </Text> */}
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



      <CRBSheetComponent
        height={200}
        refRBSheet={btmSheetRef}
        content={
          <View style={{ width: wp(90) }} >
            <View style={styles.rowViewSB1}>
              <Text style={styles.rbSheetHeading}>Select an option</Text>
              <TouchableOpacity
                onPress={() => closeBtmSheet()}>
                <Ionicons name={'close'} size={22} color={'#1E2022'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.rowView} onPress={() => toggleSelection('stripe')} >
              <RadioButton color={Colors.Orange} uncheckedColor={Colors.Orange} status={selectedPaymentMethod === 'stripe' ? 'checked' : 'unchecked'} onPress={() => toggleSelection('stripe')} />
              <Text
                style={{
                  color: '#56585B',
                  fontFamily: Fonts.PlusJakartaSans_Regular,
                  fontSize: RFPercentage(2),
                  marginLeft: wp(4)
                }}>
                Stripe
              </Text>

            </TouchableOpacity  >
            <ItemSeparator />
            <TouchableOpacity style={styles.rowView} onPress={() => toggleSelection('paypal')}>
              <RadioButton color={Colors.Orange} uncheckedColor={Colors.Orange} status={selectedPaymentMethod === 'paypal' ? 'checked' : 'unchecked'} onPress={() => toggleSelection('paypal')} />
              <Text
                style={{
                  color: '#56585B',
                  fontFamily: Fonts.PlusJakartaSans_Regular,
                  fontSize: RFPercentage(2),
                  marginLeft: wp(4)
                }}>
                Paypal
              </Text>

            </TouchableOpacity  >
          </View>
        }

      />
     
      </View>
      }
   
    </View>
  );
};

export default MYWallet;

const styles = StyleSheet.create({
  heading1: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.3),
    marginHorizontal: 20,
    marginTop: hp(3),
    marginBottom: hp(1.4),
  },
  headerContainer: { backgroundColor: Colors.Orange, height: hp(23) },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  priceText: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.White,
    fontSize: RFPercentage(4),
    lineHeight: 45,
  },
  totalAmount: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: Colors.White,
    fontSize: RFPercentage(1.5),
    opacity: 0.95,
  },
  rbSheetHeading: {
    color: Colors.primary_text,
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2),
  },
  rowViewSB1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionsContianer:{
    borderColor:'#EBEBEB',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: wp(5),
    marginVertical: hp(0),
    flexGrow: 1,
    padding: hp(1),
    height: '10%'

  },
  transactionId:{
    color: Colors.primary_text,
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    fontSize: RFPercentage(1.8),
    marginLeft: 10,
  },
  transactionType:{
    color: Colors.darkTextColor,
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(1.7),
    marginLeft: 10,
  },
  transactionsAmount:{
    color: '#FF212E',
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    fontSize: RFPercentage(2),
    marginRight: 10,
  },
});
