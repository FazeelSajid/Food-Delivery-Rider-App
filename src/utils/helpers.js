// helpers.js

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import {firebase_server_key} from './globalVariables';

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
  return new Promise(async (resolve, reject) => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        const fcmToken = await messaging().getToken();
        resolve(fcmToken);
      } else {
        resolve('');
      }
    } catch (error) {
      resolve('');
    }
  });
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
