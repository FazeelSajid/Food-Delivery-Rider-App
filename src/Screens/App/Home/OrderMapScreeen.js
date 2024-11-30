// import React, { useEffect, useRef, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import MapView, {
//   Marker,
//   AnimatedRegion,
//   Polyline,
//   PROVIDER_GOOGLE,
// } from "react-native-maps";
// import haversine from "haversine";
// import Geolocation from "@react-native-community/geolocation";

// const LATITUDE_DELTA = 0.009;
// const LONGITUDE_DELTA = 0.009;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;

// const OrderMapScreen = () => {
//   const [latitude, setLatitude] = useState(LATITUDE);
//   const [longitude, setLongitude] = useState(LONGITUDE);
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [distanceTravelled, setDistanceTravelled] = useState(0);
//   const [prevLatLng, setPrevLatLng] = useState({});
  
//   const coordinate = useRef(
//     new AnimatedRegion({
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       latitudeDelta: 0,
//       longitudeDelta: 0,
//     })
//   ).current;

//   const markerRef = useRef(null);

//   useEffect(() => {
//     const watchID = Geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = { latitude, longitude };

//         if (Platform.OS === "android" && markerRef.current) {
//           markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         setLatitude(latitude);
//         setLongitude(longitude);
//         setRouteCoordinates((prev) => [...prev, newCoordinate]);
//         setDistanceTravelled((prev) => prev + calcDistance(newCoordinate));
//         setPrevLatLng(newCoordinate);
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//         distanceFilter: 10,
//       }
//     );

//     return () => {
//       Geolocation.clearWatch(watchID);
//     };
//   }, []);

//   const calcDistance = (newLatLng) => {
//     return haversine(prevLatLng, newLatLng) || 0;
//   };
//   console.log(distanceTravelled);
  

//   const getMapRegion = () => ({
//     latitude,
//     longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showUserLocation
//         followUserLocation
//         loadingEnabled
//         region={getMapRegion()}
//       >
//         <Polyline coordinates={routeCoordinates} strokeWidth={5} />
//         <Marker.Animated
//           ref={markerRef}
//           coordinate={coordinate}
//         />
//       </MapView>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={[styles.bubble, styles.button]}>
//           <Text style={styles.bottomBarContent}>
//             {parseFloat(distanceTravelled).toFixed(2)} km
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.7)",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//   },
//   latlng: {
//     width: 200,
//     alignItems: "stretch",
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     marginHorizontal: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginVertical: 20,
//     backgroundColor: "transparent",
//   },
// });

// export default OrderMapScreen;






import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import haversine from "haversine";
import { googleMapKey } from "../../../utils/globalVariables";
import Geolocation from "@react-native-community/geolocation";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
// const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key

const OrderMapScreen = () => {
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({});
  
  const coordinate = useRef(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;

  const markerRef = useRef(null);

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

        setLatitude(latitude);
        setLongitude(longitude);
        setRouteCoordinates((prev) => [...prev, newCoordinate]);
        setDistanceTravelled((prev) => prev + calcDistance(newCoordinate));
        setPrevLatLng(newCoordinate);
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
  }, []);

  const calcDistance = (newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  const getMapRegion = () => ({
    latitude,
    longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={getMapRegion()}
      >
        <MapViewDirections
          origin={{ latitude, longitude }}
          destination={routeCoordinates[routeCoordinates.length - 1] || { latitude, longitude }}
          apikey={googleMapKey}
          strokeWidth={5}
          strokeColor="blue"
        />
        <Marker.Animated
          ref={markerRef}
          coordinate={coordinate}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseFloat(distanceTravelled).toFixed(2)} km
          </Text>
        </TouchableOpacity>
      </View>
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
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});

export default OrderMapScreen;























// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, ScrollView, RefreshControl } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import { googleMapKey } from '../../../utils/globalVariables';
// import { Colors } from '../../../constants';
// import Feather from 'react-native-vector-icons/Feather';
// import Geolocation from '@react-native-community/geolocation';
// import { useSelector } from 'react-redux';

// // Helper function to calculate the distance between two coordinates
// // const calculateDistance = (coord1, coord2) => {
// //   const R = 6371; // Earth's radius in km
// //   const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
// //   const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);

// //   const a =
// //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //     Math.cos(coord1.latitude * (Math.PI / 180)) *
// //     Math.cos(coord2.latitude * (Math.PI / 180)) *
// //     Math.sin(dLon / 2) * Math.sin(dLon / 2);

// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //   return R * c * 1000; // Return distance in meters
// // };



// const OrderMapScreen = ({ navigation, route }) => {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const { rider_id, userAppOpenLocation } = useSelector((store) => store.auth);
//   const mapRef = useRef();
//   const markerRef = useRef()
//   const [currentRegion, setCurrentRegion] = useState(null);
//   const userLocation = useRef(
//     new AnimatedRegion({
//       latitude: orderDetails?.restaurantData?.latitude,
//     longitude: orderDetails?.restaurantData?.longitude,
//       latitudeDelta: 0,
//       longitudeDelta: 0,
//     })
//   ).current;

// //  console.log(userAppOpenLocation);

//   // const [userLocation, setUserLocation] = useState();
//   // const [userLocation, setUserLocation] = useState(userAppOpenLocation);

//   const [showPickupToDestination, setShowPickupToDestination] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const proximityThreshold = 50; // Proximity threshold in meters

//   useEffect(() => {
//     setOrderDetails(route?.params?.item);
//   }, [route?.params?.item]);

//   const pickupLocation = {
//     latitude: orderDetails?.restaurantData?.latitude,
//     longitude: orderDetails?.restaurantData?.longitude,
//   };
//   // const pickupLocation = {
//   //   latitude: 33.6489, 
//   //   longitude: 73.0798,
//   // };

//   const dropOffLocation = {
//     latitude: orderDetails?.locationData?.latitude,
//     longitude: orderDetails?.locationData?.longitude,
//   };

//   useEffect(() => {
//     // Focus map on pickup and drop-off locations initially
//     if (orderDetails && mapRef.current) {
//       mapRef.current.fitToCoordinates([pickupLocation, dropOffLocation], {
//         edgePadding: { top: 200, right: 50, bottom: 300, left: 50 },
//         animated: true,
//       });
//     }
//   }, [orderDetails, pickupLocation, dropOffLocation]);

//   // Track user location and dynamically update directions
//   useEffect(() => {
//     const startTracking = async () => {
//       let watchId = Geolocation.watchPosition(
//         (position) => {
//           const newCoordinate = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };

//           if (Platform.OS === "android" && markerRef.current) {
//             markerRef.current.animateMarkerToCoordiznate(newCoordinate, 500);
//           } else {
//             userLocation.timing(newCoordinate).start();
//           }

//           // Animate the marker to the new position
//           // setUserLocation(newCoordinate)

//           // Optionally, you can also move the map to the new position
//           // mapRef.current.animateToRegion({
//           //   latitude: newCoordinate.latitude,
//           //   longitude: newCoordinate.longitude,
//           //   latitudeDelta: 0.02,
//           //   longitudeDelta: 0.02,
//           // });

//           // Check distance to pickup location
//           // if (!showPickupToDestination) {
//           //   const distanceToPickup = calculateDistance(newCoordinate, pickupLocation);
//           //   if (distanceToPickup <= proximityThreshold) {
//           //     setShowPickupToDestination(true); // User arrived at pickup, show route to drop-off
//           //   }
//           // }
//         },
//         (error) => console.error(error),
//         {
//           enableHighAccuracy: true,
//           timeout: 20000,
//           maximumAge: 1000,
//           distanceFilter: 10,
//         } // Update every 10 meters
//       );

//       return () => {
//         if (watchId) Geolocation.clearWatch(watchId); // Clear watch on cleanup
//       };
//     };

//     startTracking();
//   }, [showPickupToDestination, pickupLocation]);

//   // Function to reset map to user’s current location
//   const centerMapOnUserLocation = () => {
//     if (mapRef.current && userLocation) {
//       mapRef.current.animateToRegion({
//         ...userLocation,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });

//       // Update directions to either pickup or drop-off
//       setShowPickupToDestination(showPickupToDestination ? dropOffLocation : pickupLocation);
//     }
//   };

//   return (
//     <ScrollView refreshControl={<RefreshControl refreshing={loading} />} contentContainerStyle={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Feather name={'chevron-left'} size={25} color={Colors.White} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Order# {orderDetails?.order_id}</Text>
//       </View>

//       {/* Map */}
//       {orderDetails && (
//         <MapView.Animated
//         mapType="terrain"
//           ref={mapRef}
//           style={styles.mapView}
//           onRegionChangeComplete={(region) => setCurrentRegion(region)}
//           initialRegion={{
//             latitude: (pickupLocation.latitude + dropOffLocation.latitude) / 2,
//             longitude: (pickupLocation.longitude + dropOffLocation.longitude) / 2,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           <Marker.Animated coordinate={pickupLocation} title="Pickup Location" />
//           {showPickupToDestination && <Marker.Animated coordinate={dropOffLocation} title="Drop-off Location" />}
//           {userLocation && <Marker.Animated coordinate={userLocation} ref={markerRef} title="Your Location" pinColor={Colors.Orange} />}

//           {/* Conditionally Render Directions */}
//           {userLocation && (
//             <MapViewDirections
//               origin={userLocation}
//               destination={showPickupToDestination ? dropOffLocation : pickupLocation}
//               apikey={googleMapKey}
//               strokeWidth={3}
//               strokeColor={Colors.Orange}
//             />
//           )}
//         </MapView.Animated>
//       )}

//       {/* Center Map Button */}
//       <View style={styles.centerButtonContainer}>
//         <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUserLocation}>
//           <Text style={styles.buttonText}>Center on Current Location</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Delivered Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.deliveredButton}>
//           <Text style={styles.buttonText}>Delivered</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: Colors.Orange,
//   },
//   backButton: { marginRight: 16 },
//   headerTitle: { color: Colors.White, fontSize: 18, flex: 1, textAlign: 'center' },
//   mapView: { flex: 1, width: '100%' },
//   centerButtonContainer: {
//     position: 'absolute',
//     top: 10,
//     alignSelf: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     padding: 10,
//     elevation: 3,
//   },
//   centerButton: {
//     backgroundColor: Colors.Orange,
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   deliveredButton: {
//     backgroundColor: Colors.Orange,
//     paddingVertical: 10,
//     paddingHorizontal: 50,
//     borderRadius: 25,
//   },
//   buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600', textAlign: 'center' },
// });

// export default OrderMapScreen;