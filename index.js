/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification, {Importance} from 'react-native-push-notification';

import messaging from '@react-native-firebase/messaging';
import Add from './src/Assets/svg/add.svg';
import { BASE_URL } from './src/utils/globalVariables';
import { useDispatch } from 'react-redux';
import { MYStore } from './src/redux/MyStore';
import { navigate } from './src/utils/helpers';





// Function to get FCM token
// async function getFCMToken() {
//   const token = await messaging().getToken();
//   if (token) {
//     console.log('FCM Token:', token);
//   } else {
//     console.log('Failed to get FCM Token');
//   }
// }

// // Call getFCMToken when the app initializes
// getFCMToken();

// Listen for incoming foreground messages
messaging().onMessage(async remoteMessage => {
  // Display the notification manually
  // You can use your UI components here
  console.log('remoteMessage rider :  ', remoteMessage);
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token);
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        // icon : <Add/>
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    let data = notification?.data;
    console.log('notification  ::: ', notification);
    if (notification.userInteraction) {
      // Navigate to the Notifications screen and pass the title and message
      if (data.type === 'order') {
        navigate('OrdersDetail', {
            // type: 'all',
            id: data?.orderId,
            // item: ,
          });
        
      } else if (data.type === 'wallet') {
        navigate('MyWallet', {
          title: notification.title,
          message: notification.message,
        });
      } 
      if (data.type === 'chat'){
    
        if (/^\d/.test(data.senderId)) {
          const contac = { "customer_id": data.senderId,  "receiver_id":data.senderId,  "rider_id": MYStore.getState().auth.rider_id, "room_id": data.roomId, "sender_id": MYStore.getState().store.rider_id, "sender_type": "customer",'restaurant_id': null }
          navigate('Conversation', {
            contact: contac,
            name: data.senderName,
          });
        }
        else if (data.senderId.startsWith('res')) {
          const contac = { "customer_id": null,  "receiver_id":data.senderId,  "rider_id": MYStore.getState().store.rider_id, 'restaurant_id' : data.senderId , "room_id": data.roomId, "sender_id": MYStore.getState().store.rider_id, "sender_type": "rider", }
          navigate('Conversation', {
            contact: contac,
            name: data.senderName,
          });
        }
        // navigate('Conversation'{
      
        // })
      }
      
    }
  },
  //   requestPermissions: Platform.OS === 'ios',

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage.data);
const data = remoteMessage.data
if (data.type === 'order') {
  navigate('OrdersDetail', {
      // type: 'all',
      id: data?.orderId,
      // item: ,
    });
  
} else if (data.type === 'wallet') {
  navigate('MyWallet', {
    title: data.title,
    message: data.message,
  });
}else  if (data.type === 'chat'){
    
  if (/^\d/.test(data.senderId)) {
    const contac = { "customer_id": data.senderId,  "receiver_id":data.senderId,  "rider_id": MYStore.getState().auth.rider_id, "room_id": data.roomId, "sender_id": MYStore.getState().store.rider_id, "sender_type": "customer",'restaurant_id': null }
    navigate('Conversation', {
      contact: contac,
      name: data.senderName,
    });
  }
  else if (data.senderId.startsWith('res')) {
    const contac = { "customer_id": null,  "receiver_id":data.senderId,  "rider_id": MYStore.getState().store.rider_id, 'restaurant_id' : data.senderId , "room_id": data.roomId, "sender_id": MYStore.getState().store.rider_id, "sender_type": "rider", }
    navigate('Conversation', {
      contact: contac,
      name: data.senderName,
    });
  }
  // navigate('Conversation'{

  // })
}

;
    

  



  // yaha par Handle background notification navigation here
  // navigate('NotificationUser', {notificationData: remoteMessage.data});
  
  // console.log('setBackgroundMessageHandler', remoteMessage.data);
  
  // if (remoteMessage) {
  //   navigate('NotificationUser', {
  //     title: remoteMessage.notification.title,
  //     body: remoteMessage.notification.body,
  //   });
  // }
});


AppRegistry.registerComponent(appName, () => App);
