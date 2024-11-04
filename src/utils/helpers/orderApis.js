import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constants/api';
import { getCurrentLocation } from './location';
import { setShowPopUp, setPopUpColor, setPopUpMesage } from '../../redux/MySlice';
import { useDispatch } from 'react-redux';
import { setAssignedOrders, setIsOrderUpdate, setOrderRequests } from '../../redux/OrderSlice';
import { showAlert } from '../helpers';

export const GetNearestOrders = id => {
  console.log('GetNearestOrders_____________________________________');
  return new Promise(async (resolve, reject) => {
    try {
      let { latitude, longitude } = await getCurrentLocation();
      // console.log('latitude : ', latitude, longitude);
      // resolve([]);

      // // let url =api.get_nearest_orders + `?longitude=73.065753&latitude=33.688447`
      let url =
        api.get_nearest_orders + `?longitude=${longitude}&latitude=${latitude}`;
      console.log('url  to get nearest orders :', url);
      fetch(url)
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
      const rider_id = useSelector(store => store.auth.rider_id)

      fetch(api.get_rider_assigned_orders + rider_id)
        .then(response => response.json())
        .then(response => {
          if (response?.error == false) resolve(response?.result);
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

export const GetRiderOrders = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const rider_id = useSelector(store => store.auth.rider_id)

      console.log('rider_id________________________ : ', rider_id);
      fetch(api.get_rider_orders + rider_id)
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
      console.log('error  : ', error);
      resolve([]);
    }
  });
};



export const getAllOrders = async (dispatch, setLoading, setRefreshing,) => {
  fetch(api.get_all_orders)
    .then(response => response.json())
    .then(response => {
      // console.log(response);

      if (response.error) {
        dispatch(setShowPopUp(true))
        dispatch(setPopUpColor('red'))
        dispatch(setPopUpMesage('Something is went wrong, While getting orders'))
        setTimeout(() => {
          dispatch(setShowPopUp(false))
          dispatch(setPopUpColor(''))
          dispatch(setPopUpMesage(''))
        }, 1000)
      } else {
        let list = response?.result ? response?.result : [];
        const filter = list.filter(item =>
          item.accepted_by_restaurant === true &&
          item.accepted_by_rider === false &&
          // item.rider_id === null &&
          item.order_status === 'placed'
        )
        dispatch(setOrderRequests(filter));
        // console.log(filter);
        
        // console.log({ filter }, 'orders');

      }

    })
    .catch(err => {
      console.log(err, 'errr');
      dispatch(setShowPopUp(true))
      dispatch(setPopUpColor('red'))
      dispatch(setPopUpMesage('Something is went wrong, While getting orders'))
      setTimeout(() => {
        dispatch(setShowPopUp(false))
        dispatch(setPopUpColor(''))
        dispatch(setPopUpMesage(''))
      }, 1000)
    })
    .finally(() => {
      setLoading && setLoading(false);
      setRefreshing && setRefreshing(false);
    });
};
export const getAssignedOrders = async (rider_id, dispatch, setLoading, setRefreshing) => {
  // console.log(rider_id);
  
  fetch(api.get_rider_assigned_orders + rider_id)
    .then(response => response.json())
    .then(response => {
      // console.log(response);

      if (response.error) {
        dispatch(setAssignedOrders([]));

        // dispatch(setShowPopUp(true))
        // dispatch(setPopUpColor('red'))
        // dispatch(setPopUpMesage('Something is went wrong, While getting assiged orders'))
        // setTimeout(() => {
        //   dispatch(setShowPopUp(false))
        //   dispatch(setPopUpColor(''))
        // dispatch(setPopUpMesage(''))
        // }, 1000)
      } else {
        let list = response?.result
        // console.log({list});
        dispatch(setAssignedOrders(list));
      }
    })
    .catch(err => {
      console.log(err, 'errr');
      dispatch(setShowPopUp(true))
      dispatch(setPopUpColor('red'))
      dispatch(setPopUpMesage('Something is went wrong, While getting assiged orders'))
      setTimeout(() => {
        dispatch(setShowPopUp(false))
        dispatch(setPopUpColor(''))
        dispatch(setPopUpMesage(''))
      }, 1000)
    })
    .finally(() => {
      setLoading && setLoading(false);
      setRefreshing && setRefreshing(false);
    });
};

export const handelAcceptRejectOrder = async (status, order_id, rider_id, dispatch, isOrderUpdate) => {
  console.log({isOrderUpdate});
  
  let data = {
    rider_id: rider_id,
    order_id: order_id,
    action: status,
    reason: 'Reason',
  };
  console.log({ data, });
  // console.log({ isOrderUpdate });
  fetch(api.accept_reject_order_by_rider, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(async response => {
      console.log('response  :  ', response);
      if (response?.error == true) {
        dispatch(setShowPopUp(true))
        dispatch(setPopUpColor('red'))
        dispatch(setPopUpMesage('Something is went wrong, While updating orders'))

        setTimeout(() => {
          dispatch(setShowPopUp(false))
          dispatch(setPopUpColor(''))
          dispatch(setPopUpMesage(''))
        }, 1000);
      } else {
        dispatch(setIsOrderUpdate(!isOrderUpdate))
      }
    })
    .catch(err => {
      console.log('Error in accept/reject order :  ', err);
      showAlert('Something went wrong');
    })
    .finally(() => {

    });
};


export const updateOrderDeliveryStatus = async (status, order_id, rider_id, dispatch, isOrderUpdate) => {
  let data = {
    order_id: order_id,
    order_status: status, //out_for_delivery, delivered
    rider_id: rider_id
}
  console.log({ data, });
  console.log({ isOrderUpdate });
  fetch(api.updateOrderStatusByRider, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(async response => {
      console.log('response  :  ', response);
      if (response?.error == true) {
        dispatch(setShowPopUp(true))
        dispatch(setPopUpColor('red'))
        dispatch(setPopUpMesage('Something is went wrong, While updating orders'))

        setTimeout(() => {
          dispatch(setShowPopUp(false))
          dispatch(setPopUpColor(''))
          dispatch(setPopUpMesage(''))
        }, 1000);
      } else {
        dispatch(setIsOrderUpdate(!isOrderUpdate))
      }
    })
    .catch(err => {
      console.log('Error in accept/reject order :  ', err);
      showAlert('Something went wrong');
    })
    .finally(() => {

    });
};

