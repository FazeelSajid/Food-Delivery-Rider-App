import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {googleMapKey} from '../globalVariables';
import { setUserAppOpenLocation } from '../../redux/AuthSlice';

const removePlusCode = (address) => {
  
  
  const addressParts = address.split(',');
  
  // Check if the first part looks like a plus code (e.g., "M32J+RM")
  const firstPart = addressParts[0].trim();
  
  const plusCodePattern = /^[A-Z0-9]+\+[A-Z0-9]+$/;
  
  // If the first part matches the plus code pattern, remove it
  if (plusCodePattern.test(firstPart)) {
    addressParts.shift();  // Remove the first part
  }

  // Join the remaining parts back into a single address string
  return addressParts.join(',').trim();
};
export const getCurrentLocation = async (dispatch) => {
  try {
    const info = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });

    const latitude = info.coords.latitude;
    const longitude = info.coords.longitude;

    // Initialize the Geocoder if not already initialized
    if (!Geocoder.isInit) {
      Geocoder.init(googleMapKey);
    }

    const json = await Geocoder.from(latitude, longitude);
    const fullAddress = json.results[0].formatted_address;

    // Remove the plus code if present
    const filteredAddress = removePlusCode(fullAddress);
    const shortAddress = removePlusCode(json.results[2].formatted_address);

    const locationData = {
      latitude: latitude,
      longitude: longitude,
      address: filteredAddress,
      shortAddress: shortAddress,
    };
    // console.log(locationData, 'googleMap');
    dispatch && dispatch(setUserAppOpenLocation(locationData))

    return locationData;
  } catch (error) {
    console.log('Error:', error);
    return {
      latitude: 0.0,
      longitude: 0.0,
      address: '',
    };
  }
};


export const startLocationTracking = (onLocationUpdate) => {
  let watchId = null;

  if (!Geocoder.isInit) {
    Geocoder.init(googleMapKey); // Initialize the Geocoder with a valid API key
  }

  watchId = Geolocation.watchPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // Perform reverse geocoding to get the address
        const geocodeResponse = await Geocoder.from(latitude, longitude);
        const fullAddress = geocodeResponse.results[0].formatted_address;
        const filteredAddress = removePlusCode(fullAddress);
        const shortAddress = removePlusCode(geocodeResponse.results[2].formatted_address);

        // Create a location object with the obtained data
        const locationData = {
          latitude,
          longitude,
          address: filteredAddress,
          shortAddress,
        };

        // Call the callback function with the updated location data
        onLocationUpdate(locationData);
      } catch (error) {
        console.log('Error during geocoding:', error);

        // Handle any errors that might occur during geocoding
        onLocationUpdate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: '',
          shortAddress: '',
        });
      }
    },
    (error) => {
      console.log('Location tracking error:', error);
      onLocationUpdate({
        latitude: 0.0,
        longitude: 0.0,
        address: '',
        shortAddress: '',
      });
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Minimum distance (in meters) before location update
      interval: 5000, // Fetch location every 5 seconds (optional)
      fastestInterval: 2000, // Fastest interval for location updates (optional)
    }
  );

  // Return the watchId so that the calling code can use it to stop tracking
  return watchId;
};

export const stopLocationTracking = (watchId) => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
  }
};


export const getAddressFromLatLng = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('latitude, longitude', latitude, longitude);
      // Initialize the module (needs to be done only once)
      if (Geocoder.isInit == false) {
        Geocoder.init(googleMapKey); // use a valid API key
      }

      Geocoder.from(latitude?.toFixed(4), longitude?.toFixed(4))
        .then(json => {
          resolve(json.results[0].formatted_address);
        })
        .catch(error => {
          console.log('error  getAddressFromLatLng :  ', error);
          resolve('');
        });
    } catch (error) {
      resolve('');
    }
  });
};
