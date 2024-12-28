import { Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Fonts } from '../../../../constants'
import OrderCard from '../../../../components/Cards/OrderCard'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../../../components/Popup/PopUp';
import { RefreshControl } from 'react-native-gesture-handler';
import { getAllOrders, handelAcceptRejectOrder } from '../../../../utils/helpers/orderApis';
import { useFocusEffect } from '@react-navigation/native';
import { getOrWatchUserPosition } from '../../../../utils/helpers/location';
import { setUserAppOpenLocation } from '../../../../redux/AuthSlice';
import RBSheetConfirmation from '../../../../components/BottomSheet/RBSheetConfirmation';
import { useNavigation } from '@react-navigation/native';
import NoOrderReq from '../../../../Assets/svg/NoOrderReq.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { GetWalletAmount } from '../../../../utils/helpers/walletApis';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';

const Requests = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { rider_id, Colors } = useSelector(store => store.auth)
  let { order_requests, isOrderUpdate } = useSelector(store => store.order);
  const ref_RBSheet = useRef()
  const [BtmSheetValues, setBtmSheetValues] = useState({
    title: '',
    btnText: '',
    order_Id: 0,
    status: ''
  })


  const onRefresh = () => {
    setRefreshing(true);
    getAllOrders(dispatch, null, setRefreshing)
   handleEnabledPressed()
    GetWalletAmount(rider_id, dispatch)
  };


  useEffect(() => {
    setRefreshing(false);
    getAllOrders(dispatch, null, setRefreshing) 
    GetWalletAmount(rider_id, dispatch)
   handleEnabledPressed()
  }, [isOrderUpdate])

  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      console.log('checkEnabled', checkEnabled)
    }
  }
  async function handleEnabledPressed() {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        getOrWatchUserPosition(dispatch)
   
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          
        }
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.secondary_color,
    },
    ListEmptyComponent:{
       flex:1, 
       alignSelf:'center',
       paddingTop: hp(8)
  
    },
    ListEmptyComponentText: {
      fontSize: RFPercentage(2.5),
      color: Colors.primary_text,
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      paddingTop: hp(3)
    }
  })
  return (
    <View style={styles.container} >
      <FlatList refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={[Colors.primary_color]}
          onRefresh={onRefresh}
        />
      }
        contentContainerStyle={{ paddingVertical: hp(2) }}
        data={order_requests}
        style={{  height: '100%',  }}
        ListEmptyComponent={
          order_requests.length === 0 && refreshing === false ?
              <View style={styles.ListEmptyComponent} >
          <NoOrderReq/>
          <Text style={styles.ListEmptyComponentText} >Empty! No Order's Requests</Text>
          </View> :null
          
          }
        renderItem={({ item }) => {
          return (
            < OrderCard item={item} status={false} refe={ref_RBSheet} setBtmSheetValues={setBtmSheetValues} />
          )
        }} />

      <RBSheetConfirmation
        refRBSheet={ref_RBSheet}
        title={BtmSheetValues.title}
        okText={BtmSheetValues.btnText}
        height={360}
        onOk={async () => {
          ref_RBSheet?.current?.close();
          if (BtmSheetValues.status === 'reject') {
            handelAcceptRejectOrder('reject', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
          } else if (BtmSheetValues.status === "accept") {
            handelAcceptRejectOrder('accept', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
          }

        }}
      />
    </View>
  )
}

export default Requests

