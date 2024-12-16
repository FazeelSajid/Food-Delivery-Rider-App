import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';

export const GetAllNotifications = async (rider_id) => {
  console.log('Notifications Response______________________: ' , api.get_all_notifications + rider_id);

  return new Promise(async (resolve, reject) => {
    try {
      // let rider_id = await AsyncStorage.getItem('rider_id');
      // console.log({rider_id});

      fetch(api.get_all_notifications + rider_id)
        .then(response => response.json())
        
        .then(response => {
          console.log({response}, "Notification");

          if (response?.status == false) {
            console.log({response});
            resolve([]);
          } else {
            console.log(response);
            
            let list = response?.result ? response?.result : [];
            resolve(list?.reverse());
          }
        })
        .catch(err => {
          console.log('error : ', err);
          resolve([]);
        });
    } catch (error) {
      resolve([]);
    }
  });
};
