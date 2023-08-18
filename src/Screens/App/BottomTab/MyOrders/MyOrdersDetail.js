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
import PromoCodeCard from '../../../../components/Cards/PromoCodeCard';
import CButton from '../../../../components/Buttons/CButton';
import SuccessModal from '../../../../components/Modal/SuccessModal';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import OrdersCard from '../../../../components/Cards/OrdersCard';
import CustomerCard from '../../../../components/Cards/CustomerCard';
import HeaderImageSlider from '../../../../components/Slider/HeaderImageSlider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyOrdersDetail = ({navigation, route}) => {
  const [selected, setSelected] = useState(0);
  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    getSliderImages();
  }, []);

  const getSliderImages = useCallback(() => {
    setData([
      {
        id: 0,
        image: Images.food8,
      },
      {
        id: 1,
        image: Images.shake,
      },
      {
        id: 2,
        image: Images.pasta,
      },
      {
        id: 3,
        image: Images.chinese,
      },
      {
        id: 4,
        image: Images.biryani,
      },
    ]);
  }, [data]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        <HeaderImageSlider data={data} />
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <View style={{...styles.rowViewSB, marginBottom: 15}}>
            <Text style={styles.heading1}>Shrimp Pad Thai Sauce </Text>
            <Text style={styles.priceText}>$ 9.67</Text>
          </View>
          <View style={{marginBottom: 5}}>
            <Text style={{...styles.heading, color: Colors.Orange}}>
              Customer’s Details
            </Text>
            <CustomerCard
              disabled={true}
              onChatPress={() => {
                navigation?.navigate('Conversation', {
                  userId: 'customer',
                  name: 'John Doe',
                  image: Images.user6,
                });
              }}
              profile={Images.user6}
              name={'John Doe'}
              phoneNo={'0000-0000000'}
              // location={'Amet minim mollit non deserunt'}
              showChatIcon={true}
            />
          </View>

          <View style={{marginBottom: 5}}>
            <Text style={{...styles.heading, color: Colors.Orange}}>
              Restaurant Details
            </Text>
            <CustomerCard
              disabled={true}
              onChatPress={() => {
                navigation?.navigate('Conversation', {
                  userId: 'restaurant',
                  name: 'Restaurant Name',
                  image: Images.restaurant1,
                });
              }}
              profile={Images.restaurant1}
              name={'Restaurant Name'}
              // phoneNo={'0000-0000000'}
              location={'Amet minim mollit non deserunt'}
              showChatIcon={true}
            />
          </View>

          {route?.params?.type == 'earning' && (
            <>
              <Text style={styles.heading}>Customer Details</Text>
              <CustomerCard
                disabled={true}
                profile={Images.user6}
                name={'John Doe'}
                phoneNo={'0000-0000000'}
                location={'Amet minim mollit non deserunt'}
                showChatIcon={false}
              />
            </>
          )}
          <Text style={{...styles.heading, color: Colors.Orange}}>
            Other Details
          </Text>
          <Text style={styles.sub_heading}>Special Instructions</Text>
          <Text style={styles.description1}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consat du veniam
          </Text>
          {route?.params?.type == 'order_history' ? (
            <View style={styles.rowViewSB}>
              <Text style={{...styles.sub_heading, marginVertical: 15}}>
                Date of Order:
              </Text>
              <Text style={styles.description1}>01/08/2023</Text>
            </View>
          ) : (
            <>
              <View style={styles.location_container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.circle}>
                    <Icons.MapMarker />
                  </View>
                  <View>
                    <Text style={styles.location_heading}>Pickup Location</Text>
                    <Text style={styles.location_description}>
                      Amet minim mollit non deserunt ullamco
                    </Text>
                  </View>
                </View>
                <View style={styles.verticalDottedLine} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.circle}>
                    <Icons.MapMarker />
                  </View>
                  <View>
                    <Text style={styles.location_heading}>Pickup Location</Text>
                    <Text style={styles.location_description}>
                      Amet minim mollit non deserunt ullamco
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginVertical: 10, marginTop: 5}}>
                <View style={styles.rowViewSB}>
                  <Text style={{...styles.sub_heading, marginVertical: 5}}>
                    Time
                  </Text>
                  <Text style={styles.description1}>03:00 PM</Text>
                </View>
                <View style={styles.rowViewSB}>
                  <Text style={{...styles.sub_heading, marginVertical: 5}}>
                    Rider’s Commission
                  </Text>
                  <Text style={styles.description1}>$ 2.05</Text>
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
                  style={{alignItems: 'center'}}
                  onPress={() => setSelected(0)}>
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
                    Order Placed
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalLine} />
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => setSelected(1)}>
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
                  setVisible(true);
                }}
              />
              <CButton
                title="Accept"
                width={wp(40)}
                height={hp(5.4)}
                onPress={() => {
                  setModalText('Order Accepted');
                  setVisible(true);
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
        onOK={() => navigation.goBack()}
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
    height: 45,
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
  },
});
