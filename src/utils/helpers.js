// helpers.js

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import {BASE_URL, firebase_server_key} from './globalVariables';
import Snackbar from 'react-native-snackbar';
import api from '../constants/api';
import { handlePopup } from './helpers/orderApis';

export const chooseImageFromCamera = async () => {
  return new Promise(async (resolve, reject) => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    await launchCamera(options)
      .then(async res => {
        console.log('response :  ', res);

        if (res.didCancel) {
          console.log('User cancelled image picker');
          resolve(false);
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
          resolve(false);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          resolve(false);
        } else {
          let image = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          resolve(image);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

// -------------------------------------- Firebase Notification _________________________________


export const getUserFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    console.log(authStatus, 'authStatus');

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log(enabled, 'enabled');

    if (enabled) {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'token');

      if (fcmToken) {
        return fcmToken;
      } else {
        console.log('FCM Token is empty');
        return '';
      }
    } else {
      console.log('Permission not granted');
      return '';
    }
  } catch (error) {
    if (error.message.includes("FIS_AUTH_ERROR")) {
      console.error('Specific Error: FIS_AUTH_ERROR - Authentication failed with Firebase Instance ID.');
    } else {
      console.error('Error fetching FCM Token:', error);
    }
    throw error;  // Rethrow error to allow external handling
  }
};


export const send_Push_Notification = async body => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${firebase_server_key}`,
    },
    body: JSON.stringify(body),
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(response => {
      let res = JSON.parse(response);
      console.log('push notification response :  ', res);
    })
    .catch(err => {
      console.log('error :  ', err);
    });
};

export const showAlert = (message, bgColor, numberOfLines) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: bgColor ? bgColor : 'red',
    numberOfLines: numberOfLines ? numberOfLines : 2,
    // marginBottom:20,
  });
};

export const uploadImage = image => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };

    const formData = new FormData();
    // let profile_Obj = {
    //   uri: image,
    //   name: imageName,
    //   type: imageType,
    // };
    // console.log('image passed________________   :  ', image);
    // formData.append('file_type', 'image');
    formData.append('image', image);
    await fetch(api.upload_image, {
      method: 'POST',
      headers: headers,
      body: formData,
    })
      .then(response => response.json())
      .then(async response => {
        // console.log(response);
        
        if (response?.status == true) {
          resolve(response?.image_url);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        console.log('error uploadImage : ', error);
        resolve(false);
      });
  });
};




export const GetCustomerStripeId = async (customer_id) => {
  return new Promise(async (resolve, reject) => {
    // let customer_id = await AsyncStorage.getItem('customer_id');
    // console.log('customer_id  :   ', customer_id);
    fetch( BASE_URL + 'payment/getCustomerStripeId?customer_id=' + customer_id)
      .then(response => response.json())
      .then(async response => {
        // console.log('response GetCustomerStripeId: ', response);
        if (response?.status == true) {
          let customer_id = response?.result?.customer_Stripe_Id;
          
          resolve(customer_id);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        console.log('error :   ', err);
        resolve(false);
      });
  });
};

export const AddPaymentToRiderWallet = (amount,rider_id, dispatch ) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {
        rider_id:rider_id,
        amount: amount
    }
      fetch(api.add_payment_to_Rider_wallet, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          if (response.status === true) {
          resolve(response);
          handlePopup(dispatch, response.message, 'green')
          }
          else {
            handlePopup(dispatch, response.message, 'red')
          }
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};


export const fetchApis = async (endPoint, method, setLoading, header, payload, dispatch) => {

  setLoading(true)
  try {
    const response = await fetch(endPoint, {
      method: method,
      headers: header,
      body: JSON.stringify(payload)  // Convert payload to JSON string
    });
    // console.log('Fetched apis...',  response.json());
    // Check if the response is OK (status code 200 or 201)
    if (response.status === 200) {

      // Successfully processed request
      const jsonResponse = await response.json();
      setLoading(false);
      console.log('Fetched APIs:', jsonResponse); // Correctly log the response

      // console.log(jsonResponse.Response.apiResponse, 'jsonResponse');

      return jsonResponse;
    } else if (response.status === 400) {
      const errorData = await response.json();
      setLoading(false)
      // showAlert(`Bad Request: ${errorData.message || 'Invalid data sent.'}`);
      handlePopup(dispatch, 'Something is went wrong', 'red')
      console.log(errorData.message);


    } else if (response.status === 401) {
      // Unauthorized - invalid or missing token
      setLoading(false)
      // showAlert( 'Unauthorized: Invalid or missing token.');s
      handlePopup(dispatch, 'Something is went wrong', 'red')
      // console.log('fetchapi func, Unauthorized: Invalid or missing token');

      throw new Error('Unauthorized: Invalid or missing token.');
    } else if (response.status === 403) {
      // showAlert('Forbidden: You do not have permission to perform this action.');
      handlePopup(dispatch, 'Something is went wrong', 'red')
      // console.log('fetchapi func, Forbidden: You do not have permission to perform this action.' )
      setLoading(false)

      // Forbidden - you do not have permission
      // throw new Error('Forbidden: You do not have permission to perform this actio n.');
    } else if (response.status === 404) {
      // console.log(endPoint);

      // showAlert( 'Not Found: The requested resource was not found.');
      setLoading(false)
      handlePopup(dispatch, 'Something is went wrong', 'red')

      // console.log('fetchapi func, Not Found: The requested resource was not found.');
      // console.log(response.payload);


      // Not Found - invalid URL
      // throw new Error('Not Found: The requested resource was not found.');
    } else if (response.status === 500) {
      // showAlert( 'Server Error: An error occurred on the server.');
      setLoading(false)
      // console.log('Server Error: An error occurred on the server.');
      handlePopup(dispatch, 'Something is went wrong', 'red')
      // Internal Server Error - server-side error
      // throw new Error('Server Error: An error occurred on the server.');
    } else {
      // showAlert( `Unexpected error: ${response.statusText}`);
      handlePopup(dispatch, 'Something is went wrong', 'red')
      setLoading(false)
      // Handle other status codes
      // throw new Error(`Unexpected error: ${response.statusText}`);
      console.log(`Unexpected error: ${response.statusText}`);

    }
    // setLoading(false)


    // setTimeout(() => {
    //   showAlert({
    //     isLoading: false,
    //     errorPop: false,
    //     errorPopMsg: ``
    //   });
    // }, 1000);z

  } catch (error) {
    // console.log(error instanceof TypeError);
    handlePopup(dispatch, 'Something is went wrong', 'red')
    setLoading(false)


    if (error instanceof TypeError && error.TypeError === 'Network request failed') {
      console.log(error, 'error');

      
      handlePopup(dispatch,`Please check your internet connection.`, 'red')
      setLoading(false)


      return
    }


  }
  // finally{
  //   setLoading(false)
  // }

};
