import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { googleMapKey } from '../../../utils/globalVariables';
import { Colors, Fonts } from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';


const OrderMapScreen = ({navigation, route}) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const mapRef = useRef()


  // Coordinates for the route (adjust these as per your use case)
  const pickupLocation = {
    latitude: orderDetails?.restaurantData?.latitude, // Replace with destination latitude
    longitude: orderDetails?.restaurantData?.longitude, // Replace with origin longitude
};
const dropOffLocation = {
    latitude: orderDetails?.locationData?.latitude, // Replace with destination latitude
    longitude: orderDetails?.locationData?.longitude, // Replace with destination longitude
};

  useEffect(() => {
    if (orderDetails) {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates([pickupLocation, dropOffLocation], {
                edgePadding: { top: 200, right: 0, bottom: 300, left: 0 }, // Adjust padding as needed
                animated: true,
            });
        }
    }

}, [pickupLocation, dropOffLocation]);
useEffect(() => {
  setOrderDetails(route?.params?.item)
  
}, [])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    {/* Replace with an actual back icon if needed */}
                    <Feather
                        name={'chevron-left'}
                        size={25}
                        color={Colors.White}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order# {orderDetails?.order_id}</Text>
                <TouchableOpacity style={styles.chatButton}>
                    {/* Placeholder for chat icon */}
                    <Text style={styles.chatButtonText}>💬</Text>
                </TouchableOpacity>
            </View>

      {/* Map */}
      {
                    orderDetails && <MapView

                        ref={mapRef}
                        style={styles.mapView}
                        initialRegion={{
                            latitude: (pickupLocation?.latitude + dropOffLocation?.latitude) / 2,
                            longitude: (pickupLocation?.longitude + dropOffLocation?.longitude) / 2,
                            latitudeDelta: 1,
                            longitudeDelta: 1,
                        }}
                        focusable={true}
                    >
                        <Marker coordinate={pickupLocation} title="Pickup Location" />
                        <Marker coordinate={dropOffLocation} title="Drop-off Location" />

                        {/* Draw Route */}
                        <MapViewDirections
                            origin={pickupLocation}
                            destination={dropOffLocation}
                            apikey={googleMapKey}
                            strokeWidth={3}
                            strokeColor={Colors.Orange}
                        />
                    </MapView>

                }

      {/* Delivered Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deliveredButton}>
          <Text style={styles.buttonText}>Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: Colors.Orange,
},
backButton: {
    marginRight: wp(2),
},
backButtonText: {
    color: '#FFF',
    fontSize: wp(5),
},
headerTitle: {
    color: Colors.White,
    fontSize: wp(5),
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
},
chatButton: {
    marginLeft: wp(2),
},
chatButtonText: {
    fontSize: wp(5),
},
  mapView: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp(0),
    left: wp(0),
    right: wp(0),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    padding: hp(3),
    alignItems: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  deliveredButton: {
    backgroundColor: Colors.Orange,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(25),
    borderRadius: wp(5),
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(4),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OrderMapScreen;
