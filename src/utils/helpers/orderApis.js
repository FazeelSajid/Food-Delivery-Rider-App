import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';

export const GetNearestOrders = id => {
  return new Promise((resolve, reject) => {
    try {
      fetch(api.get_nearest_orders + `?longitude=73.065753&latitude=33.688447`)
        .then(response => response.json())
        .then(response => {
          if (response?.status == true) resolve(response?.result);
          else resolve([]);
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

export const GetAssignedOrders = id => {
  return new Promise(async (resolve, reject) => {
    try {
      let rider_id = await AsyncStorage.getItem('rider_id');
      fetch(api.get_rider_assigned_orders + rider_id)
        .then(response => response.json())
        .then(response => {
          if (response?.status == true) resolve(response?.result);
          else resolve([]);
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
