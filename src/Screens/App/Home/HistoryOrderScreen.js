import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { googleMapKey } from '../../../utils/globalVariables';
import { Colors, Fonts } from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

const HistoryOrderDetailScreen = ({route, navigation}) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const mapRef = useRef()





    const pickupLocation = {
        latitude: orderDetails?.restaurantData?.latitude, // Replace with destination latitude
        longitude: orderDetails?.restaurantData?.longitude, // Replace with origin longitude
    };
    const dropoffLocation = {
        latitude: orderDetails?.locationData?.latitude, // Replace with destination latitude
        longitude: orderDetails?.locationData?.longitude, // Replace with destination longitude
    };




    useEffect(() => {
        setOrderDetails(route?.params?.item)
        // setOrderStatus(route?.params?.item?.order_status)
        // setAccepted(route.params?.item?.accepted_by_rider)

    }, [])
console.log(orderDetails?.comments);


    useEffect(() => {
        if (orderDetails) {
            if (mapRef.current) {
                mapRef.current.fitToCoordinates([pickupLocation, dropoffLocation], {
                    edgePadding: { top: 200, right: 100, bottom: 200, left: 100 }, // Adjust padding as needed
                    animated: true,
                });
            }
        }

    }, [pickupLocation, dropoffLocation]);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()} >
        <Feather
                        name={'chevron-left'}
                        size={25}
                        color={Colors.Orange}
                    />
        </TouchableOpacity>
        <View>
        <Text style={styles.orderTitle}>Order # {orderDetails?.order_id}</Text>
        <Text style={styles.orderDate}>{ moment(orderDetails?.created_at).format("MMM DD, YYYY, hh:mm A")}</Text>
        </View>
        
        <View style={[styles.statusBadge, orderDetails?.order_status === 'cancelled' ? {backgroundColor: '#FEB6B6'} : {backgroundColor : '#F2FFB9'} ]}>
          <Text style={[styles.statusText, orderDetails?.order_status ==='cancelled' ? {color: '#88260D'} : {color: '#384308'}]}>{orderDetails?.order_status === 'delivered' ? 'Delivered' : 'Cancelled'}</Text>
        </View>
      </View>

        <ScrollView contentContainerStyle={{flexGrow: 1,paddingBottom: wp(15)}} >
            

      {/* Map View */}
      {
                    orderDetails && 
                    <TouchableOpacity activeOpacity={0.8}>
                    <MapView
                       
                        ref={mapRef}
                        style={styles.mapView}
                        initialRegion={{
                            latitude: (pickupLocation?.latitude + dropoffLocation?.latitude) / 2,
                            longitude: (pickupLocation?.longitude + dropoffLocation?.longitude) / 2,
                            latitudeDelta: 1,
                            longitudeDelta: 1,
                        }}
                        focusable={true}
                    >
                        <Marker coordinate={pickupLocation} title="Pickup Location" />
                        <Marker coordinate={dropoffLocation} title="Drop-off Location" />

                        {/* Draw Route */}
                        <MapViewDirections
                            origin={pickupLocation}
                            destination={dropoffLocation}
                            apikey={googleMapKey}
                            strokeWidth={3}
                            strokeColor={Colors.Orange}
                        />
                    </MapView>
                    </TouchableOpacity>

                }

      {/* Delivery Addresses */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Deliver From:</Text>
        <Text style={styles.subTitle}>{orderDetails?.restaurantData?.user_name}</Text>
        <Text style={styles.addressText}>{orderDetails?.restaurantData?.buisness_address}</Text>

        <Text style={styles.sectionTitle}>Deliver to:</Text>
        <Text style={styles.subTitle}>{orderDetails?.customerData?.user_name}</Text>
        <Text style={styles.addressText}>{orderDetails?.locationData?.address}</Text>
      {/* </View> */}

      {/* Delivery Details */}
      {/* <View style={styles.infoContainer}> */}
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance Travelled</Text>
          <Text style={styles.detailValue}>4.2 miles</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Delivery Time</Text>
          <Text style={styles.detailValue}>{orderDetails?.estimated_delivery_time} mins</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Earning</Text>
          <Text style={styles.detailValue}>£{orderDetails?.delivery_charges}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ratings</Text>
          <Text style={styles.detailValue}>⭐ {orderDetails?.riderData?.rating}</Text>
        </View>
      {/* </View> */}

      {/* Feedback Section */}
      {/* <View style={styles.infoContainer}> */}
        <Text style={styles.sectionTitle}>Feedback</Text>
        <Text style={styles.feedbackText}>The delivery was smooth, and I appreciate you keeping me updated. Would love to have you deliver again!</Text>
      {/* </View> */}

      {/* Special Instructions */}
      {/* <View style={styles.infoContainer}> */}

      {orderDetails?.comments && <View>  
        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <Text style={styles.feedbackText}>{orderDetails?.comments}</Text>
        </View>}

      {/* </View> */}

      {/* Payment Details */}
      {/* <View style={styles.infoContainer}> */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{orderDetails?.payment_option ==='cash' && 'COD'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>£{orderDetails?.total_amount}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: wp(5),

  },
  header: {
    alignItems: 'center',
    marginBottom: hp(2),
    flexDirection : 'row', justifyContent:'space-between',
    paddingHorizontal: wp(3)
  },
  backButton: {
    // position: 'absolute',
    // left: 0,
    // top: hp(1),
  },
  backButtonText: {
    fontSize: wp(5),
    color: '#FF6D3F',
  },
  orderTitle: {
    fontSize: wp(4),
   
    color: Colors.Black,
    fontFamily: Fonts.PlusJakartaSans_Bold

  },
  orderDate: {
    fontSize: wp(3.5),
    color: '#888',
  },
  statusBadge: {
   
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
  },
  statusText: {
    fontFamily: Fonts.PlusJakartaSans_SemiBold ,
    fontSize: wp(3.5),
    // fontWeight: '600',
  },
  mapView: {
    width: '100%',
    height: hp(28),
    borderRadius: 8,
    marginBottom: hp(1),
},
  infoContainer: {
    backgroundColor: '#F7E8E3FF',
    padding: wp(4),
    borderRadius: wp(2),
    marginVertical: hp(1),
    marginHorizontal: wp(4)
  },
  sectionTitle: {
    fontSize: wp(4),
    color: Colors.Black,
    marginBottom: hp(0.3),
    fontFamily: Fonts.PlusJakartaSans_SemiBold
  },
  subTitle: {
    fontSize: wp(4),
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    color: Colors.Black
  },
  addressText: {
    fontSize: wp(3.5),
    color: Colors.grayText,
    marginVertical: hp(0.5),
    fontFamily: Fonts.PlusJakartaSans_Regular,
    marginBottom: hp(1.5)
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.5),
  },
  detailLabel: {
    fontSize: wp(3.5),
    color: Colors.grayText,
  },
  detailValue: {
    fontSize: wp(3.5),
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: Colors.Black,
  },
  feedbackText: {
    fontSize: wp(3.5),
    color: Colors.grayText,
    marginBottom: hp(0.8),
    fontFamily: Fonts.PlusJakartaSans_Regular
  },
});

export default HistoryOrderDetailScreen;
