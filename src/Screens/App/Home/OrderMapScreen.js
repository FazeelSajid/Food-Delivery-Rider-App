import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import haversine from "haversine";
import { googleMapKey } from "../../../utils/globalVariables";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import {  Fonts } from "../../../constants";
import RBSheetConfirmation from "../../../components/BottomSheet/RBSheetConfirmation";
import { handelAcceptRejectOrder, updateOrderDeliveryStatus } from "../../../utils/helpers/orderApis";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const ARRIVAL_THRESHOLD = 0.5; // 50 meters in km for haversine function

const OrderMapScreen = ({ navigation, route }) => {
  const { rider_id, userAppOpenLocation,Colors } = useSelector((store) => store.auth);
  const { isOrderUpdate, updatedOrder } = useSelector(store => store.order);
  const [userCurrentLocation, setUserCurrentLocation] = useState({
    latitude: userAppOpenLocation.latitude,
    longitude: userAppOpenLocation.longitude,
  });
 
  const [atPickup, setAtPickup] = useState(updatedOrder.order_status === 'out_for_delivery');

  const ref_RBSheet = useRef()
  const [BtmSheetValues, setBtmSheetValues] = useState({
    title: '',
    btnText: '',
    order_Id: 0,
    status: '',
    restaurantId: '',
    amountToTransfer: 0,
    payment_option: ''
  })


  const openBtmSheet = (obj) => {
    ref_RBSheet?.current?.open()
    setBtmSheetValues(obj)

  }

  const dispatch = useDispatch();

  const pickupLocation = {
    latitude: updatedOrder?.restaurantData?.latitude,
    longitude: updatedOrder?.restaurantData?.longitude,
  };

  const dropOffLocation = {
    latitude: updatedOrder?.locationData?.latitude,
    longitude: updatedOrder?.locationData?.longitude,
  };

  const markerRef = useRef(null);
  const coordinate = useRef(
    new AnimatedRegion({
      latitude: userAppOpenLocation.latitude,
      longitude: userAppOpenLocation.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;

const [hasLeftPickup, setHasLeftPickup] = useState(false);

useEffect(() => {
  const distanceToPickup = haversine(userAppOpenLocation, pickupLocation);
  const distanceToDropOff = haversine(userAppOpenLocation, dropOffLocation);

  if (!atPickup && distanceToPickup < ARRIVAL_THRESHOLD) {
    setAtPickup(true);
    console.log("Rider has reached the pickup location.");
  }

  // Avoid toggling atPickup back to false once it's true
  if (atPickup && !hasLeftPickup && distanceToPickup > ARRIVAL_THRESHOLD) {
    setHasLeftPickup(true);
    console.log("Rider has left the pickup location.");
  }

  if (hasLeftPickup && distanceToDropOff < ARRIVAL_THRESHOLD) {
    console.log("Rider has reached the drop-off location.");
  }

  // console.log({
  //   // currentLocation: userAppOpenLocation,
  //   distanceToPickup,
  //   distanceToDropOff,
  //   atPickup,
  //   hasLeftPickup,
  // });
}, [userAppOpenLocation, atPickup, hasLeftPickup, pickupLocation, dropOffLocation]);


  // const checkArrival = (latitude, longitude, location, callback) => {
  //   const distance = haversine({ latitude, longitude }, location);
  //   if (distance < ARRIVAL_THRESHOLD) {
  //     callback();
  //     console.log({ distance });

  //   }
  // };

  // const handleButtonAction = (status) => {
  //   const actions = {
  //     accept: () =>
  //       handelAcceptRejectOrder(
  //         'accept',
  //         BtmSheetValues.order_Id,
  //         rider_id,
  //         dispatch,
  //         isOrderUpdate
  //       ),
  //     reject: () =>
  //       handelAcceptRejectOrder(
  //         'reject',
  //         BtmSheetValues.order_Id,
  //         rider_id,
  //         dispatch,
  //         isOrderUpdate
  //       ),
  //     out_for_delivery: () =>
  //       updateOrderDeliveryStatus(
  //         'out_for_delivery',
  //         BtmSheetValues.order_Id,
  //         rider_id,
  //         dispatch,
  //         isOrderUpdate
  //       ),
  //     delivered: () =>
  //       updateOrderDeliveryStatus(
  //         'delivered',
  //         BtmSheetValues.order_Id,
  //         rider_id,
  //         dispatch,
  //         isOrderUpdate,
  //         () =>
  //           navigation.navigate('DeliverySuccess', {
  //             commission: BtmSheetValues?.commission,
  //             amount: BtmSheetValues?.amount,
  //             restaurantId: BtmSheetValues?.restaurantId,
  //             amountToTransfer: BtmSheetValues?.amountToTransfer,
  //             order_Id: BtmSheetValues?.order_Id,
  //             payment_option: BtmSheetValues?.payment_option,
  //           })
  //       ),
  //   };

  //   // Execute the corresponding action based on the status
  //   actions[status]?.();
  // };
  
  const handleButtonAction = (status) => {
    const actions = {
      accept: () =>
        openBtmSheet({
          title: 'Are you sure to Accept this order?',
          btnText: 'Accept',
          order_Id: updatedOrder?.order_id,
          status: 'accept',
        }),
      reject: () =>
        openBtmSheet({
          title: 'Are you sure to Reject this order?',
          btnText: 'Reject',
          order_Id: updatedOrder?.order_id,
          status: 'reject',
        }),
      out_for_delivery: () =>
        openBtmSheet({
          title: 'Out For Delivery',
          btnText: 'Out For Delivery',
          order_Id: updatedOrder?.order_id,
          status: 'out_for_delivery',
        }),
      delivered: () =>
        openBtmSheet({
          title: 'Delivered',
          btnText: 'Delivered',
          order_Id: updatedOrder?.order_id,
          status: 'delivered',
          amount: updatedOrder?.total_amount,
          restaurantId: updatedOrder?.restaurant_id,
          amountToTransfer: updatedOrder?.gst + updatedOrder?.sub_total,
          commission: updatedOrder?.delivery_charges,
          payment_option: updatedOrder?.payment_option,
        }),
    };

    actions[status]?.();
  };

  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    durationContainer: {
      position: "absolute",
      top: 20,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: 10,
      borderRadius: 10,
      zIndex: 10,
    },
    btncontainer: {
      backgroundColor: Colors.secondary_color, // Background color of the container
      borderTopRightRadius: wp(10), // Rounded corners for the container
      borderTopLeftRadius: wp(10), // Rounded corners for the container
      paddingVertical: hp(2), // Vertical padding inside the container
      paddingHorizontal: wp(8), // Horizontal padding inside the container
      // alignItems: 'center', // Center align items
      shadowColor: '#000', // Shadow color for iOS
      shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
      shadowOpacity: 2, // Shadow opacity for iOS
      shadowRadius: 15, // Shadow radius for iOS
      elevation: 10, // Shadow for Android
      // alignSelf : 
      // marginHorizontal: wp(5), // Horizontal margin around the container
      bottom: 2,
      position: 'absolute'
    },
    acceptButton: {
      backgroundColor: Colors.primary_color,
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(25),
      borderRadius: wp(5),
      marginBottom: hp(1),
    },
    rejectButton: {
      borderColor: Colors.primary_color,
      borderWidth: 2,
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(25),
      borderRadius: wp(5),
    },
    buttonText: {
      color: Colors.secondary_color,
      fontSize: wp(4),
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      textAlign: 'center',
      width: '100%',
      // backgroundColor: 'green'
    },
    rejectButtonText: {
      color: Colors.primary_color,
      fontSize: wp(4),
      fontWeight: '600',
      textAlign: 'center',
    },
  
  });

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={{
          
    latitude: userAppOpenLocation.latitude,
    longitude: userAppOpenLocation.longitude,
  
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapViewDirections
          origin={{
    latitude: userAppOpenLocation.latitude,
    longitude: userAppOpenLocation.longitude,
  }}
          destination={hasArrivedAtPickup ? dropOffLocation : pickupLocation}
          apikey={googleMapKey}
          strokeWidth={5}
          strokeColor={Colors.primary_color}
        />
        <Marker.Animated coordinate={pickupLocation} title={"Pickup Location"} pinColor="blue" />
        <Marker.Animated coordinate={dropOffLocation} title={"Drop Location"} pinColor="green" />
        <Marker.Animated ref={markerRef} coordinate={coordinate} title={"Your Current Location"} pinColor={Colors.primary_color} />
      </MapView> */}

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={{
          latitude: userAppOpenLocation.latitude,
          longitude: userAppOpenLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {!atPickup && (
          <>
            <MapViewDirections
              origin={{
                latitude: userAppOpenLocation.latitude,
                longitude: userAppOpenLocation.longitude,
              }}
              destination={pickupLocation}
              apikey={googleMapKey}
              strokeWidth={5}
              strokeColor={Colors.primary_color}
            />
            <Marker.Animated
              coordinate={pickupLocation}
              title={"Pickup Location"}
              pinColor="blue"
            />
          </>
        )}
        {atPickup && (
          <>
            <MapViewDirections
              origin={{
                latitude: userAppOpenLocation.latitude,
                longitude: userAppOpenLocation.longitude,
              }}
              destination={dropOffLocation}
              apikey={googleMapKey}
              strokeWidth={5}
              strokeColor={Colors.primary_color}
            />
            <Marker.Animated
              coordinate={dropOffLocation}
              title={"Drop-off Location"}
              pinColor="green"
            />
          </>
        )}
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: userAppOpenLocation.latitude,
            longitude: userAppOpenLocation.longitude,
          }}
          title={"Your Current Location"}
          pinColor={Colors.primary_color}
        />
      </MapView>


      {/* <View style={styles.btncontainer} >
        {
          updatedOrder?.accepted_by_rider ?
            <View style={{}} >
              <TouchableOpacity onPress={() => updatedOrder?.order_status === 'placed' ? openBtmSheet({
                title: 'Out For Delivery',
                btnText: 'Out For Delivery',
                order_Id: updatedOrder.order_id,
                status: 'out_for_delivery'
              }) : openBtmSheet({
                title: 'Delivered',
                btnText: 'Delivered',
                order_Id: updatedOrder.order_id,
                status: 'delivered',
                amount: updatedOrder.total_amount,
                restaurantId: updatedOrder.restaurant_id,
                amountToTransfer : updatedOrder.gst+updatedOrder.sub_total,
                commission: updatedOrder.delivery_charges,
                payment_option: updatedOrder.payment_option
                
              })} style={[styles.acceptButton]}>
                <Text style={styles.buttonText}>{updatedOrder?.order_status === 'placed' ? "Out For Delivery" : 'Delivered'}</Text>
              </TouchableOpacity>
            </View>
            : <View style={{}}  >

              <TouchableOpacity activeOpacity={0.8} onPress={() => openBtmSheet({
                title: 'Are you sure to Accept this order?',
                btnText: 'Accept',
                order_Id: updatedOrder?.order_id,
                status: 'accept'
              })} style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => openBtmSheet({
                title: 'Are you sure to Reject this order?',
                btnText: 'Reject',
                order_Id: updatedOrder?.order_id,
                status: 'reject'
              })} style={styles.rejectButton}>
                <Text style={styles.rejectButtonText}>Reject (00:60)</Text>
              </TouchableOpacity>
            </View>
        }
      </View> */}
      <View style={styles.btncontainer}>
        {updatedOrder?.accepted_by_rider ? (
          <View>
            <TouchableOpacity
              onPress={() =>
                updatedOrder?.order_status === 'placed'
                  ? handleButtonAction('out_for_delivery')
                  : handleButtonAction('delivered')
              }
              style={[styles.acceptButton]}
            >
              <Text style={styles.buttonText}>
                {updatedOrder?.order_status === 'placed' ? 'Out For Delivery' : 'Delivered'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleButtonAction('accept')}
              style={styles.acceptButton}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleButtonAction('reject')}
              style={styles.rejectButton}
            >
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>


      {/* <RBSheetConfirmation
                refRBSheet={ref_RBSheet}
                title={BtmSheetValues.title}
                // description={'Do you want to logout?'}
                okText={BtmSheetValues.btnText}
                height={360}
                onOk={async () => {
                    ref_RBSheet?.current?.close();
                    if (BtmSheetValues.status === 'reject') {
                       handelAcceptRejectOrder('reject', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate,)
                        // setupdatedOrder(Details)
          
                        
                    } else if (BtmSheetValues.status === "accept") {
                        handelAcceptRejectOrder('accept', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
                        
                    } else if (BtmSheetValues.status === 'out_for_delivery') {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
                    } else if (BtmSheetValues.status === "delivered") {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate, ()=> navigation.navigate('DeliverySuccess', {
                            commission: BtmSheetValues?.commission,
                            amount: BtmSheetValues?.amount,
                            restaurantId: BtmSheetValues?.restaurantId,
                            amountToTransfer: BtmSheetValues?.amountToTransfer,
                            order_Id: BtmSheetValues?.order_Id,
                            payment_option: BtmSheetValues?.payment_option
                        }))
                    }

                }}
            /> */}

      <RBSheetConfirmation
        refRBSheet={ref_RBSheet}
        title={BtmSheetValues.title}
        okText={BtmSheetValues.btnText}
        height={360}
        onOk={async () => {
          ref_RBSheet?.current?.close();
          const { status, order_Id, commission, amount, restaurantId, amountToTransfer, payment_option } = BtmSheetValues;

          switch (status) {
            case 'reject':
              await handelAcceptRejectOrder('reject', order_Id, rider_id, dispatch, isOrderUpdate);
              break;
            case 'accept':
              await handelAcceptRejectOrder('accept', order_Id, rider_id, dispatch, isOrderUpdate);
              break;
            case 'out_for_delivery':
              await updateOrderDeliveryStatus('out_for_delivery', order_Id, rider_id, dispatch, isOrderUpdate);
              break;
            case 'delivered':
              await updateOrderDeliveryStatus('delivered', order_Id, rider_id, dispatch, isOrderUpdate, () =>
                navigation.navigate('DeliverySuccess', {
                  commission,
                  amount,
                  restaurantId,
                  amountToTransfer,
                  order_Id,
                  payment_option,
                })
              );
              break;
            default:
              console.warn('Unknown action');
              break;
          }
        }}
      />

    </View>
  );
};



export default OrderMapScreen;
