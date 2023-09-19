import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {googleMapKey} from '../globalVariables';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(info => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;
        //getting address
        // Initialize the module (needs to be done only once)
        if (Geocoder.isInit == false) {
          Geocoder.init(googleMapKey); // use a valid API key
        }
        // Search by geo-location (reverse geo-code)
        Geocoder.from(latitude, longitude)
          .then(json => {
            let obj = {
              latitude: latitude,
              longitude: longitude,
              address: json.results[0].formatted_address,
            };
            resolve(obj);
          })
          .catch(error => {
            console.log('error  :  ', error);
            let obj = {
              latitude: 0.0,
              longitude: 0.0,
              address: '',
            };
            resolve(obj);
          });
      });
    } catch (error) {
      console.log('error  :  ', error);
      let obj = {
        latitude: 0.0,
        longitude: 0.0,
        address: '',
      };
      resolve(obj);
    }
  });
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
