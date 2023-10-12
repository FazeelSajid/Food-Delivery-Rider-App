import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CButton from '../../../../components/Buttons/CButton';
import SuccessModal from '../../../../components/Modal/SuccessModal';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import CustomerCard from '../../../../components/Cards/CustomerCard';
import HeaderImageSlider from '../../../../components/Slider/HeaderImageSlider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getUserFcmToken,
  send_Push_Notification,
  showAlert,
} from '../../../../utils/helpers';
import api from '../../../../constants/api';
import Loader from '../../../../components/Loader';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import {useDispatch, useSelector} from 'react-redux';
import {setIsOrderUpdate} from '../../../../redux/OrderSlice';
import SectionSeparator from '../../../../components/Separator/SectionSeparator';
import ItemSeparator from '../../../../components/Separator/ItemSeparator';

const MyOrdersDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  let {isOrderUpdate} = useSelector(store => store.order);

  const [selected, setSelected] = useState(0);
  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [fistCartItemDetail, setFistCartItemDetail] = useState(null);
  const [itemImages, setItemImages] = useState([]);

  // useEffect(() => {
  //   getSliderImages();
  // }, []);

  // const getSliderImages = useCallback(() => {
  //   setData([
  //     {
  //       id: 0,
  //       image: Images.food8,
  //     },
  //     {
  //       id: 1,
  //       image: Images.shake,
  //     },
  //     {
  //       id: 2,
  //       image: Images.pasta,
  //     },
  //     {
  //       id: 3,
  //       image: Images.chinese,
  //     },
  //     {
  //       id: 4,
  //       image: Images.biryani,
  //     },
  //   ]);
  // }, [data]);

  const handelAcceptRejectOrder = async status => {
    // setVisible(true);
    setLoading(true);
    let rider_id = await AsyncStorage.getItem('rider_id');
    let data = {
      rider_id: rider_id,
      order_id: route?.params?.id,
      action: status,
      reason: 'hardcoded reason',
    };
    console.log(data);
    fetch(api.accept_reject_order_by_rider, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response  :  ', response);
        if (response?.status == true) {
          setVisible(true);
          // dispatch(setIsOrderUpdate(!isOrderUpdate));
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('Error in accept/reject order :  ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOrderDelivered = async () => {
    // console.log('handleOrderDelivered   called.....');
    // let title = 'Order Delivered';
    // let text = 'Your Order is delivered successfully!';
    // //send notification to customer when order is delivered
    // //Note: send notification to restaurant that your order is completed
    // handleSendPushNotification(text, title);

    setLoading(true);
    let data = {
      order_id: route?.params?.id,
      order_status: 'delivered',
    };
    console.log(data);
    fetch(api.update_order_status, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response  :  ', response);
        // setSelected(1);
        if (response?.status == true) {
          setSelected(1);
          // dispatch(setIsOrderUpdate(!isOrderUpdate));
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('Error in accept/reject order :  ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOrderOutForDelivery = async () => {
    // console.log('handleOrderDelivered   called.....');
    // let title = 'Order Delivered';
    // let text = 'Your Order is delivered successfully!';
    // //send notification to customer when order is delivered
    // //Note: send notification to restaurant that your order is completed
    // handleSendPushNotification(text, title);

    setLoading(true);
    let data = {
      order_id: route?.params?.id,
      order_status: 'out_for_delivery',
    };
    console.log(data);
    fetch(api.update_order_status, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response  :  ', response);
        if (response?.status == true) {
          setSelected(0);
          // dispatch(setIsOrderUpdate(!isOrderUpdate));
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('Error in accept/reject order :  ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOrderStatusUpdate = index => {
    // setSelected(index);
    if (index === 0) {
      handleOrderOutForDelivery();
    } else if (index === 1) {
      handleOrderDelivered();
    }
  };

  const handleSendPushNotification = async (text, title) => {
    const receiver_fcm = await getUserFcmToken();
    if (receiver_fcm) {
      let body = {
        to: receiver_fcm,
        notification: {
          title: title ? title : '',
          body: text ? text : '',
          // mutable_content: true,
          sound: 'default',
        },
        data: {
          // user_id: user,
          type: 'order',
        },
        priority: 'high',
      };

      send_Push_Notification(body);
    } else {
      console.log('receiver_fcm not found');
    }
  };

  const getDetail = id => {
    setLoading(true);
    fetch(api.get_order_by_id + id)
      .then(response => response.json())
      .then(response => {
        if (response.status == true) {
          setOrderDetails(response.result);
          if (response?.result?.order_status == 'out_for_delivery') {
            setSelected(0);
          } else if (response?.result?.order_status == 'delievered') {
            setSelected(1);
          } else {
            setSelected(-1);
          }

          let cart_item =
            response.result?.cart_items_Data?.length > 0
              ? response.result?.cart_items_Data[0]
              : null;
          setItemImages(cart_item?.itemData?.images);
          setFistCartItemDetail(cart_item);
        } else {
          setOrderDetails(null);
        }
      })
      .catch(err => console.log('error : ', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let id = route?.params?.id;
    console.log('order details id :  ', id);
    if (id) {
      getDetail(id);
    }
  }, []);

  const calculateSubtotal = (total, platform_fee, delivery_charges) => {
    let service_charges = platform_fee + delivery_charges;
    let subTotal =
      service_charges > total
        ? service_charges - total
        : total - service_charges;
    return subTotal;
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        {/* <HeaderImageSlider data={data} /> */}
        <HeaderImageSlider data={itemImages && itemImages} />
        <View style={{flex: 1, paddingHorizontal: 20}}>
          {/* __________________________ updated  _______________________________ */}
          <View style={{...styles.rowViewSB}}>
            <View>
              <Text
                style={{
                  color: '#191A26',
                  fontFamily: Fonts.PlusJakartaSans_Bold,
                  fontSize: RFPercentage(2),
                  lineHeight: 30,
                }}>
                Order #{orderDetails?.order_id}
              </Text>
              {route?.params?.type == 'cancelled' ? (
                <Text
                  style={{
                    color: '#6C6C6C',
                    fontFamily: Fonts.PlusJakartaSans_Regular,
                    fontSize: RFPercentage(1.7),
                  }}>
                  {/* Cancelled on 02 Oct, 2023 */}
                  Cancelled on{' '}
                  {moment(new Date(orderDetails?.updated_at)).format(
                    'Do,MMM YYYY',
                  )}
                </Text>
              ) : route?.params?.type == 'completed' ? (
                <Text
                  style={{
                    color: '#6C6C6C',
                    fontFamily: Fonts.PlusJakartaSans_Regular,
                    fontSize: RFPercentage(1.7),
                  }}>
                  {/* Delivered on 02 Oct, 2023 */}
                  Delivered on{' '}
                  {moment(new Date(orderDetails?.updated_at)).format(
                    'Do,MMM YYYY',
                  )}
                </Text>
              ) : (
                <>
                  <Text
                    style={{
                      color: '#6C6C6C',
                      fontFamily: Fonts.PlusJakartaSans_Regular,
                      fontSize: RFPercentage(1.7),
                    }}>
                    Order Status:{' '}
                    <Text
                      style={{
                        color: Colors.Orange,
                        fontFamily: Fonts.PlusJakartaSans_SemiBold,
                        fontSize: RFPercentage(1.7),
                        textTransform: 'capitalize',
                      }}>
                      {orderDetails?.order_status}
                    </Text>
                  </Text>
                </>
              )}
            </View>
            <Text style={styles.priceText}>$ {orderDetails?.total_amount}</Text>
          </View>

          <View style={styles.location_container}>
            <View style={{flexDirection: 'row'}}>
              <Icons.MapPinActive />
              <View style={{marginTop: 0}}>
                <Text style={styles.location_description}>Order from</Text>
                <Text style={styles.location_heading}>
                  {orderDetails?.restaurantData?.user_name}
                </Text>
              </View>
            </View>
            <View style={styles.verticalDottedLine} />
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <Icons.MapPinActive />
              <View style={{}}>
                <Text style={styles.location_description}>Delivered to</Text>
                <Text style={styles.location_heading}>
                  {orderDetails?.locationData?.address}
                </Text>
              </View>
            </View>
          </View>

          <ItemSeparator />
          <View style={{}}>
            {orderDetails?.cart_items_Data &&
              orderDetails?.cart_items_Data?.map((item, key) => (
                <View style={{...styles.rowView, marginBottom: 5}}>
                  <Ionicons
                    name={'close'}
                    size={15}
                    color={Colors.Orange}
                    style={{marginBottom: -3}}
                  />
                  <Text
                    style={{
                      color: Colors.Orange,
                      fontFamily: Fonts.PlusJakartaSans_Bold,
                      fontSize: RFPercentage(2),
                      marginLeft: 5,
                      marginHorizontal: 10,
                    }}>
                    {item?.quantity}
                  </Text>
                  <Text
                    style={{
                      color: '#191A26',
                      fontFamily: Fonts.PlusJakartaSans_Bold,
                      fontSize: RFPercentage(2),
                    }}>
                    {item
                      ? item?.item_type == 'deal'
                        ? item?.itemData?.name
                        : item?.itemData?.item_name
                      : ''}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      color: Colors.Orange,
                      fontFamily: Fonts.PlusJakartaSans_SemiBold,
                      fontSize: RFPercentage(2),
                    }}>
                    $ {item?.itemData?.price * item?.quantity}
                  </Text>
                </View>
              ))}
          </View>
          <ItemSeparator />

          {route?.params?.type == 'cancelled' ? null : (
            <>
              <View style={{paddingBottom: 20}}>
                <View style={styles.rowViewSB}>
                  <Text style={styles.subText2}>Subtotal</Text>
                  <Text style={styles.subText2}>
                    $
                    {/* {orderDetails?.total_amount -
                     ( orderDetails?.platform_fees -
                      orderDetails?.delivery_charges)} */}
                    {calculateSubtotal(
                      orderDetails?.total_amount,
                      orderDetails?.platform_fees,
                      orderDetails?.delivery_charges,
                    )}
                  </Text>
                </View>

                <View style={styles.rowViewSB}>
                  <Text style={styles.subText2}>Service Charges</Text>
                  <Text style={styles.subText2}>
                    $
                    {orderDetails?.platform_fees +
                      orderDetails?.delivery_charges}
                  </Text>
                </View>
                <ItemSeparator />
                <View style={{...styles.rowViewSB, marginTop: -5}}>
                  <Text style={styles.total_amountText}>Total</Text>
                  <Text style={styles.total_amountText}>
                    $ {orderDetails?.total_amount}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* _________________________ updated __________________________________ */}

          <Text
            style={{
              ...styles.heading,
              color: Colors.Orange,
              marginVertical: 20,
              marginBottom: 20,
            }}>
            Other Details
          </Text>

          {/* <View style={{...styles.rowViewSB, marginBottom: 15}}>
            <Text style={styles.heading1}>
              {fistCartItemDetail
                ? fistCartItemDetail?.item_type == 'deal'
                  ? fistCartItemDetail?.itemData?.name
                  : fistCartItemDetail?.itemData?.item_name
                : ''}
            </Text>
            <Text style={styles.priceText}>{orderDetails?.total_amount}</Text>
          </View> */}

          {orderDetails?.customerData?.customer_id && (
            <View style={{marginBottom: 5}}>
              <Text style={{...styles.heading, color: Colors.Orange}}>
                Customer’s Details
              </Text>

              <CustomerCard
                disabled={true}
                onChatPress={() => {
                  navigation?.navigate('Conversation', {
                    // userId: 'customer',
                    // name: 'John Doe',
                    // image: Images.user6,
                    type: 'customer',
                    userId: orderDetails?.customerData?.customer_id,
                    name: orderDetails?.customerData?.user_name,
                    image: null,
                    fcm_token: orderDetails?.customerData?.fcm_token,
                  });
                }}
                // profile={null}
                showNameProfile={orderDetails?.customerData?.user_name}
                // name={'John Doe'}
                // phoneNo={'0000-0000000'}
                name={orderDetails?.customerData?.user_name}
                phoneNo={orderDetails?.customerData?.phone_no}
                showChatIcon={true}
              />
            </View>
          )}

          {orderDetails?.restaurantData?.restaurant_id && (
            <View style={{marginBottom: 5}}>
              <Text style={{...styles.heading, color: Colors.Orange}}>
                Restaurant Details
              </Text>
              <CustomerCard
                disabled={true}
                onChatPress={() => {
                  navigation?.navigate('Conversation', {
                    // userId: 'restaurant',
                    // name: 'Restaurant Name',
                    // image: Images.restaurant1,

                    type: 'restaurant',
                    userId: orderDetails?.restaurantData?.restaurant_id,
                    name: orderDetails?.restaurantData?.user_name,
                    image:
                      orderDetails?.restaurantData?.images?.length > 0
                        ? BASE_URL_IMAGE +
                          orderDetails?.restaurantData?.images[0]
                        : null,
                    fcm_token: orderDetails?.restaurantData?.fcm_token,
                  });
                }}
                profile={
                  orderDetails?.restaurantData?.images?.length > 0
                    ? BASE_URL_IMAGE + orderDetails?.restaurantData?.images[0]
                    : null
                }
                name={orderDetails?.restaurantData?.user_name}
                // phoneNo={'0000-0000000'}
                location={orderDetails?.restaurantData?.location}
                showChatIcon={true}
              />
            </View>
          )}

          {route?.params?.type == 'earning' && (
            <>
              <Text style={styles.heading}>Customer Details</Text>
              <CustomerCard
                disabled={true}
                showNameProfile={orderDetails?.customerData?.user_name}
                // name={'John Doe'}
                // phoneNo={'0000-0000000'}
                name={orderDetails?.customerData?.user_name}
                phoneNo={orderDetails?.customerData?.phone_no}
                location={orderDetails?.customerData?.location}
                showChatIcon={false}
              />
            </>
          )}
          {/* <Text style={{...styles.heading, color: Colors.Orange}}>
            Other Details
          </Text> */}

          <Text style={styles.sub_heading}>Special Instructions</Text>
          <Text style={styles.description1}>
            {/* Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consat du veniam */}
            {orderDetails?.locationData?.instructions}
          </Text>

          {route?.params?.type == 'order_history' ? (
            <View style={styles.rowViewSB}>
              <Text style={{...styles.sub_heading, marginVertical: 15}}>
                Date of Order:
              </Text>
              <Text style={styles.description1}>
                {/* 01/08/2023 */}
                {orderDetails?.created_at
                  ? moment(orderDetails?.created_at).format('DD/MM/YYYY')
                  : ''}
              </Text>
            </View>
          ) : (
            <>
              {/* <View style={styles.location_container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.circle}>
                    <Icons.MapMarker />
                  </View>
                  <View>
                    <Text style={styles.location_heading}>Pickup Location</Text>
                    <Text style={styles.location_description}>
                     
                      {orderDetails?.restaurantData?.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.verticalDottedLine} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.circle}>
                    <Icons.MapMarker />
                  </View>
                  <View>
                    <Text style={styles.location_heading}>
                      Dropoff Location
                    </Text>
                    <Text style={styles.location_description}>
                      {orderDetails?.locationData?.address}
                    </Text>
                  </View>
                </View>
              </View> */}

              <View style={{marginVertical: 10, marginTop: 5}}>
                <View style={styles.rowViewSB}>
                  <Text style={{...styles.sub_heading, marginVertical: 5}}>
                    Time
                  </Text>
                  <Text style={styles.description1}>
                    {/* 03:00 PM */}
                    {orderDetails
                      ? moment(orderDetails?.created_at).format('hh:mm A')
                      : ''}
                  </Text>
                </View>
                {/* <View style={styles.rowViewSB}>
                  <Text style={{...styles.sub_heading, marginVertical: 5}}>
                    Rider’s Commission
                  </Text>
                  <Text style={styles.description1}>$ 2.05</Text>
                </View> */}

                <View style={styles.rowViewSB}>
                  <Text style={{...styles.sub_heading, marginVertical: 5}}>
                    Delivery Charges
                  </Text>
                  <Text style={styles.description1}>
                    $ {orderDetails?.delivery_charges}
                  </Text>
                </View>
              </View>
            </>
          )}

          {route?.params?.type == 'assigned_orders' && (
            <>
              <Text
                style={{
                  color: Colors.Orange,
                  fontFamily: Fonts.Inter_Bold,
                  fontSize: RFPercentage(2),
                }}>
                Change Order Status
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 20,
                  marginTop: 15,
                  justifyContent: 'center',
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity
                  disabled={selected == 0 ? true : false}
                  style={{alignItems: 'center'}}
                  onPress={() => handleOrderStatusUpdate(0)}>
                  <View
                    style={{
                      ...styles.orderCard,
                      borderColor: selected == 0 ? Colors.Orange : '#A0A0A6',
                      backgroundColor:
                        selected == 0 ? Colors.Orange : 'transparent',
                    }}>
                    {selected == 0 ? (
                      <Icons.orderDeliveryWhite />
                    ) : (
                      <Icons.orderDelivery />
                    )}
                  </View>
                  <Text
                    style={{
                      ...styles.orderCardText,
                      color: selected == 0 ? Colors.Orange : '#A0A0A6',
                    }}>
                    {/* Order Placed */}
                    Out for Delivery
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalLine} />
                <TouchableOpacity
                  disabled={selected == 1 ? true : false}
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    // setSelected(1);
                    handleOrderStatusUpdate(1);
                  }}>
                  <View
                    style={{
                      ...styles.orderCard,
                      borderColor: selected == 1 ? Colors.Orange : '#A0A0A6',
                      backgroundColor:
                        selected == 1 ? Colors.Orange : 'transparent',
                    }}>
                    <Ionicons
                      name="checkmark-circle"
                      color={selected == 1 ? Colors.White : '#A0A0A6'}
                      size={25}
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.orderCardText,
                      color: selected == 1 ? Colors.Orange : '#A0A0A6',
                    }}>
                    Order Delivered
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {route?.params?.type == 'order_request' && (
            <View
              style={{
                ...styles.rowViewSB,
                marginTop: 30,
                width: wp(85),
                alignSelf: 'center',
              }}>
              <CButton
                title="Reject"
                transparent={true}
                width={wp(40)}
                height={hp(5.4)}
                onPress={() => {
                  setModalText('Order Rejected');
                  // setVisible(true);
                  handelAcceptRejectOrder('reject');
                }}
              />
              <CButton
                title="Accept"
                width={wp(40)}
                height={hp(5.4)}
                onPress={() => {
                  setModalText('Order Accepted');
                  // setVisible(true);
                  handelAcceptRejectOrder('accept');
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <SuccessModal
        visible={visible}
        setVisible={setVisible}
        description={modalText}
        onOK={() => {
          dispatch(setIsOrderUpdate(!isOrderUpdate));
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default MyOrdersDetail;

const styles = StyleSheet.create({
  heading1: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#191A26',
    fontSize: RFPercentage(2.2),
  },
  priceText: {
    fontFamily: Fonts.PlusJakartaSans_ExtraBold,
    color: Colors.Orange,
    fontSize: RFPercentage(2.5),
  },
  heading: {
    fontFamily: Fonts.Inter_Bold,
    color: '#191A26',
    marginBottom: 2,
    fontSize: RFPercentage(1.9),
  },
  sub_heading: {
    fontFamily: Fonts.Inter_SemiBold,
    color: '#191A26',
    marginVertical: 10,
    fontSize: RFPercentage(1.9),
  },
  description1: {
    fontFamily: Fonts.Inter_Regular,
    color: '#808D9E',
    fontSize: RFPercentage(1.5),
    lineHeight: 20,
  },

  title: {
    fontFamily: Fonts.Inter_Medium,
    color: Colors.Text,
    fontSize: RFPercentage(2),
    lineHeight: 25,
  },
  description: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: '#7E8CA0',
    fontSize: RFPercentage(1.5),
    lineHeight: 25,
    marginLeft: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderCard: {
    borderWidth: 1,
    borderColor: Colors.Orange,
    backgroundColor: Colors.Orange,
    borderRadius: 15,
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderCardText: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(1.4),
    marginTop: 10,
  },
  horizontalLine: {
    height: 1.5,
    backgroundColor: '#E5E5E6',
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 20,
  },

  location_container: {
    marginVertical: 15,
    flex: 1,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'red',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verticalDottedLine: {
    // height: 45,
    minHeight: 45,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.Orange,
    borderStyle: 'dashed',
    width: 1,
    marginLeft: 19,
  },
  location_heading: {
    color: Colors.Orange,
    fontFamily: Fonts.Inter_Medium,
    fontSize: RFPercentage(2),
  },
  location_description: {
    color: '#808D9E',
    fontFamily: Fonts.Inter_Regular,
    fontSize: RFPercentage(1.5),
    width: wp(70),
  },

  //

  location_container: {
    marginVertical: 15,
    // flex: 1,
    // paddingHorizontal: 20,
  },
  circle: {
    // height: 40,
    // width: 40,
    // borderRadius: 40 / 2,
    // // backgroundColor: 'red',
    // marginRight: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  verticalDottedLine: {
    // height: 45,
    minHeight: 47,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.Orange,
    borderStyle: 'dashed',
    width: 1,
    // marginLeft: 19,
    marginLeft: 1,
    position: 'absolute',
    left: 5.9,
    top: 13,
  },
  location_heading: {
    color: Colors.Orange,
    fontFamily: Fonts.Inter_Medium,
    fontSize: RFPercentage(2),
    width: wp(70),
    marginLeft: 15,
  },
  location_description: {
    color: '#808D9E',
    fontFamily: Fonts.Inter_Regular,
    fontSize: RFPercentage(1.5),
    width: wp(70),
    marginLeft: 15,
  },
  subText2: {
    color: '#0C0B0B',
    fontFamily: Fonts.Inter_Regular,
    fontSize: RFPercentage(2),
    lineHeight: 30,
  },
  total_amountText: {
    color: '#292323',
    fontFamily: Fonts.Inter_Bold,
    fontSize: RFPercentage(2),
    // lineHeight: 30,
  },

  //

  itemView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#F6F6F6',
    backgroundColor: '#F5F6FA',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FF572233',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
