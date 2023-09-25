import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';

export const GetWalletAmount = async () => {
  return new Promise(async (resolve, reject) => {
    let rider_id = await AsyncStorage.getItem('rider_id');
    fetch(api.get_available_payment_of_rider + rider_id)
      .then(response => response.json())
      .then(response => {
        console.log('response : ', response);
        if (response?.status == false) {
          resolve(0);
        } else {
          resolve(response?.result?.available_amount);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        resolve(0);
      });
  });
};
