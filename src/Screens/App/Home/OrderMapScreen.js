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
import { Colors, Fonts } from "../../../constants";
import RBSheetConfirmation from "../../../components/BottomSheet/RBSheetConfirmation";
import { handelAcceptRejectOrder, updateOrderDeliveryStatus } from "../../../utils/helpers/orderApis";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const ARRIVAL_THRESHOLD = 1; // 50 meters in km for haversine function

const OrderMapScreen = ({ navigation, route }) => {
  const { rider_id, userAppOpenLocation } = useSelector((store) => store.auth);
  const { isOrderUpdate, updatedOrder } = useSelector(store => store.order);
  const [userCurrentLocation, setUserCurrentLocation] = useState({
    latitude: userAppOpenLocation.latitude,
    longitude: userAppOpenLocation.longitude,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [hasArrivedAtPickup, setHasArrivedAtPickup] = useState(false);
  const [deliveryStartTime, setDeliveryStartTime] = useState(null); // For delivery time calculation
  const [deliveryDuration, setDeliveryDuration] = useState(null); // Store the total delivery time
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

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };

        if (Platform.OS === "android" && markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
        } else {
          coordinate.timing(newCoordinate).start();
        }

        setRouteCoordinates((prev) => [...prev, newCoordinate]);
        setDistanceTravelled((prev) => prev + haversine(prev, newCoordinate) || 0);
        setUserCurrentLocation(newCoordinate);

        // Start timing if it's the first move
        if (!deliveryStartTime) setDeliveryStartTime(Date.now());

        // Check if user has arrived at pickup or drop-off
        if (!hasArrivedAtPickup) {
          checkArrival(latitude, longitude, pickupLocation, ()=> setHasArrivedAtPickup(true));
        } else {
          checkArrival(latitude, longitude, dropOffLocation, () => {
            const duration = ((Date.now() - deliveryStartTime) / 1000 / 60).toFixed(2);
            setDeliveryDuration(duration); // Set total time in minutes
            Alert.alert("Delivery Complete", `Delivery took ${duration} minutes.`);
          });
        }
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [hasArrivedAtPickup]);

  console.log({hasArrivedAtPickup});
  

  const checkArrival = (latitude, longitude, location, callback) => {
    const distance = haversine({ latitude, longitude }, location);
    if (distance < ARRIVAL_THRESHOLD) {
      callback();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={{
          ...userCurrentLocation,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapViewDirections
          origin={userCurrentLocation}
          destination={hasArrivedAtPickup ? dropOffLocation : pickupLocation}
          apikey={googleMapKey}
          strokeWidth={5}
          strokeColor={Colors.Orange}
        />
        <Marker.Animated coordinate={pickupLocation} title={"Pickup Location"} pinColor="blue" />
        <Marker.Animated coordinate={dropOffLocation} title={"Drop Location"} pinColor="green" />
        <Marker.Animated ref={markerRef} coordinate={coordinate} title={"Your Current Location"} />
      </MapView>

      <View style={styles.btncontainer} >
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
      </View>
     
      <RBSheetConfirmation
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
            />
    </View>
  );
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
    backgroundColor: Colors.White, // Background color of the container
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
    backgroundColor: Colors.Orange,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(25),
    borderRadius: wp(5),
    marginBottom: hp(1),
  },
  rejectButton: {
    borderColor: Colors.Orange,
    borderWidth: 2,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(25),
    borderRadius: wp(5),
  },
  buttonText: {
    color: Colors.White,
    fontSize: wp(4),
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    textAlign: 'center',
    width: '100%',
    // backgroundColor: 'green'
  },
  rejectButtonText: {
    color: Colors.Orange,
    fontSize: wp(4),
    fontWeight: '600',
    textAlign: 'center',
  },

});

export default OrderMapScreen;
