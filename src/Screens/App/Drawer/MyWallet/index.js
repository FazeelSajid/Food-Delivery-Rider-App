import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors, Icons, Images, Fonts} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import {useFocusEffect} from '@react-navigation/native';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetWalletAmount} from '../../../../utils/helpers/walletApis';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import Loader from '../../../../components/Loader';
import NoDataFound from '../../../../components/NotFound/NoDataFound';
import CButton from '../../../../components/Buttons/CButton';
import PaymentCard from '../../../../components/Cards/PaymentCard';
import CRBSheetComponent from '../../../../components/BottomSheet/CRBSheetComponent';
import CInput from '../../../../components/TextInput/CInput';

const MYWallet = ({navigation, route}) => {
  const ref_RBTopUpSheet = useRef();
  const ref_RBWithdrawSheet = useRef();

  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([
    // {
    //   id: 0,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 1,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 2,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 3,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 4,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 5,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 6,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 7,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
  ]);

  const getData = async () => {
    setLoading(true);
    let amount = await GetWalletAmount();
    console.log({amount});
    setTotalAmount(amount);
    // setLoading(false);
    let rider_id = await AsyncStorage.getItem('rider_id');
    fetch(api.get_rider_orders + rider_id)
      .then(response => response.json())
      .then(response => {
        let list = response?.result ? response?.result : [];
        let filteredData = list?.filter(
          item => item?.cart_items_Data?.length > 0,
        );
        filteredData = filteredData?.filter(
          item =>
            item?.order_status == 'delievered' ||
            item?.order_status == 'delivered',
        );
        setData(filteredData);
      })
      .catch(err => console.log('error : ', err))
      .finally(() => setLoading(false));
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        <View style={styles.headerContainer}>
          <StackHeader
            title={'My Wallet'}
            titleColor={'white'}
            backIconColor={'white'}
            statusBarBG={Colors.Orange}
            statusBarStyle={'light-content'}
            headerView={{marginTop: 10}}
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
                $ {totalAmount}
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
                textStyle={{color: Colors.Orange, textTransform: 'none'}}
                onPress={() => ref_RBWithdrawSheet?.current?.open()}
              />
              <CButton
                title="Top-up"
                bgColor="#FFF"
                width={100}
                height={35}
                marginTop={10}
                textStyle={{color: Colors.Orange, textTransform: 'none'}}
                onPress={() => ref_RBTopUpSheet?.current?.open()}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.heading1}>Payment Methods</Text>
          <PaymentCard />
          <Text style={styles.heading1}>Recent Activities</Text>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListHeaderComponent={() => <View style={{height: 10}} />}
            ListEmptyComponent={() => <NoDataFound loading={loading} />}
            renderItem={({item, index}) => {
              let cart_item =
                item?.cart_items_Data?.length > 0
                  ? item?.cart_items_Data[0]
                  : null;
              return (
                <FoodCardWithRating
                  disabled={false}
                  onPress={() => {
                    navigation.navigate('MyOrdersDetail', {
                      type: 'order_history',
                      id: item?.order_id,
                    });
                  }}
                  // title={item?.title}
                  // image={item?.image}
                  // description={item?.description}
                  // price={item?.price}
                  image={
                    cart_item && cart_item?.itemData?.images?.length > 0
                      ? BASE_URL_IMAGE + cart_item?.itemData?.images[0]
                      : ''
                  }
                  title={
                    cart_item
                      ? cart_item?.item_type == 'deal'
                        ? cart_item?.itemData?.name
                        : cart_item?.itemData?.item_name
                      : ''
                  }
                  // price={cart_item ? cart_item?.itemData?.price : ''}
                  price={item?.total_amount}
                  cardStyle={{marginTop: 15}}
                  showNextButton={false}
                  // showRatingOnBottom={true}
                  showRating={false}
                />
              );
            }}
          />

          <CRBSheetComponent
            refRBSheet={ref_RBWithdrawSheet}
            height={hp(35)}
            content={
              <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{paddingHorizontal: 20}}>
                  <View style={{...styles.rowViewSB, marginBottom: 20}}>
                    <Text
                      style={{
                        color: '#0A212B',
                        fontFamily: Fonts.PlusJakartaSans_Bold,
                        fontSize: RFPercentage(2.5),
                      }}>
                      Enter Amount for Withdraw
                    </Text>
                  </View>
                  <View style={{paddingHorizontal: 10, marginTop: 15}}>
                    <CInput
                      placeholder="Enter Amount"
                      textAlignVertical="top"
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1,
                        paddingHorizontal: 10,
                        marginTop: 10,
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
                          navigation.navigate('CardForWithdraw', {
                            type: 'top_up',
                          });
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
                <View style={{paddingHorizontal: 20}}>
                  <View style={{...styles.rowViewSB, marginBottom: 20}}>
                    <Text
                      style={{
                        color: '#0A212B',
                        fontFamily: Fonts.PlusJakartaSans_Bold,
                        fontSize: RFPercentage(2.5),
                      }}>
                      Top-up
                    </Text>
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <Text
                      style={{
                        color: Colors.Orange,
                        fontFamily: Fonts.PlusJakartaSans_Bold,
                        fontSize: RFPercentage(2.2),
                        marginBottom: 14,
                      }}>
                      Current Balance: $ {totalAmount}
                    </Text>
                    <CInput
                      placeholder="Top-up Amount"
                      textAlignVertical="top"
                    />
                    <Text
                      style={{
                        color: '#A2A2A2',
                        marginTop: -15,
                        fontSize: RFPercentage(1.5),
                        marginLeft: 14,
                      }}>
                      Enter an amount from $ 100-$1,000
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1,
                        paddingHorizontal: 10,
                        marginTop: 15,
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
                          navigation.navigate('CardForTopUp', {
                            type: 'top_up',
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            }
          />
        </View>
      </ScrollView>
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
  },
  headerContainer: {backgroundColor: Colors.Orange, height: hp(23)},
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
});
