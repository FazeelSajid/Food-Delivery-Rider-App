import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../../constants'
import StackHeader from '../../../../components/Header/StackHeader'
import RatingCard from '../../../../components/Cards/RatingCard'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import api from '../../../../constants/api'
import { useDispatch, useSelector } from 'react-redux'
import { handlePopup } from '../../../../utils/helpers/orderApis'
import PopUp from '../../../../components/Popup/PopUp'
import { useFocusEffect } from '@react-navigation/native'
import { RefreshControl } from 'react-native-gesture-handler'

const Ratings = () => {
  const [ratings, setRatings] = useState([])
  const dispatch = useDispatch()
  const rider_id = useSelector(store => store.auth.rider_id)
  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
  const [loading, setLoading] = useState(false);



  const getRatings = async () => {
    setLoading(true);
    try {
      const response = await fetch(api.GetRiderRating + rider_id);
      const data = await response.json();
  
      if (data.status === true) {
        let list = data?.result?.ratings || [];
        setRatings(list);
        console.log({list});
        
      } else {
        handlePopup(dispatch, data.message, 'red');
      }
    } catch (error) {
      handlePopup(dispatch, 'Something went wrong', 'red');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const refresh = () => {
  getRatings()
}
 useFocusEffect(
    React.useCallback(() => {
      getRatings()
    }, []),
  );
  return (
    <View style={styles.container} >
      <StackHeader title={'Ratings'} />
      {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
      <FlatList  
      contentContainerStyle={styles.FlatList}
      refreshControl={<RefreshControl refreshing={loading} colors={[Colors.Orange]} onRefresh={refresh} />}  data={ratings} renderItem={({item})=> {
        console.log(item);
        
        return <RatingCard  item={item}  />
      }}  />
        {/* <RatingCard/>
        <RatingCard/>
        <RatingCard/> */}
    </View>
  )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: widthPercentageToDP(4)
    },
    FlatList:{
      paddingHorizontal: widthPercentageToDP(3)
    }
})