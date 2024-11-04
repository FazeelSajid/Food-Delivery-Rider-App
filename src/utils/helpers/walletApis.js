import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';
import { useSelector } from 'react-redux';

export const GetWalletAmount = async (rider_id) => {
  return new Promise(async (resolve, reject) => {
    // let rider_id = await AsyncStorage.getItem('rider_id');
    // const { rider_id } = useSelector(store => store.auth)
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
