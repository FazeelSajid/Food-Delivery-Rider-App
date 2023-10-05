import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';

import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import CustomStatusBar from '../../../../components/CustomStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetAssignedOrders,
  GetNearestOrders,
  GetRiderOrders,
} from '../../../../utils/helpers/orderApis';
import Loader from '../../../../components/Loader';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAssignedOrders,
  setOrderHistory,
  setOrderRequests,
} from '../../../../redux/OrderSlice';
import NoDataFound from '../../../../components/NotFound/NoDataFound';

const Dashboard = ({navigation, route}) => {
  const dispatch = useDispatch();
  let {order_requests, order_history, assigned_orders, isOrderUpdate} =
    useSelector(store => store.order);

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [riderInfo, setRiderInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   console.log('isFocused : ', isFocused);
  //   // StatusBar.setTranslucent(false);
  //   StatusBar.setBackgroundColor(Colors.White);
  //   StatusBar.setBarStyle('dark-content');
  // }, [isFocused]);

  // const [orderRequests, setOrderRequests] = useState([
  //   // {
  //   //   id: 0,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  //   // {
  //   //   id: 1,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  // ]);

  // const [assignedOrders, setAssignedOrders] = useState([
  //   // {
  //   //   id: 0,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  //   // {
  //   //   id: 1,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  // ]);

  // const [orderHistory, setOrderHistory] = useState([
  //   // {
  //   //   id: 0,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  //   // {
  //   //   id: 1,
  //   //   title: 'Green Salad',
  //   //   image: Images.salad,
  //   //   price: '14:20',
  //   // },
  // ]);

  const getData = async () => {
    try {
      let data = await GetNearestOrders();
      if (data?.length > 2) {
        const slicedArray = data.slice(0, 2);
        // setOrderRequests(slicedArray);
        dispatch(setOrderRequests(slicedArray));
      } else {
        // setOrderRequests(data);
        dispatch(setOrderRequests(data));
      }
      // getting assigned orders
      let data1 = await GetAssignedOrders();
      if (data1?.length > 2) {
        const slicedArray = data1.slice(0, 2);
        // setAssignedOrders(slicedArray);
        dispatch(setAssignedOrders(slicedArray));
      } else {
        // setAssignedOrders(data1);
        dispatch(setAssignedOrders(data1));
      }

      // getting order history
      let data2 = await GetRiderOrders();
      if (data2?.length > 2) {
        const slicedArray = data2.slice(0, 2);
        // setOrderHistory(slicedArray);
        dispatch(setOrderHistory(slicedArray));
      } else {
        // setOrderHistory(data2);
        dispatch(setOrderHistory(data2));
      }

      setLoading(false);
      setRefreshing(false);
      console.log('set refresh to false');
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getRiderName = async () => {
    let riderDetails = await AsyncStorage.getItem('rider_detail');
    if (riderDetails) {
      setRiderInfo(JSON.parse(riderDetails));
    }
  };

  useEffect(() => {
    // getRiderName();
    // getOrderRequests();
    setLoading(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getRiderName();
      getData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Orange]}
            onRefresh={() => {
              setRefreshing(true);
              getData();
            }}
          />
        }
        showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation?.openDrawer()}>
            <Icons.MenuActive width={23} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Notifications')}>
            {/* <Icons.NotificationActive /> */}
            <Icons.NotificationWithDot />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>{riderInfo?.name}</Text>
        </View>
        <View style={{marginVertical: 20}}>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Orders Requests</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Tab', {screen: 'My Orders'})
                }>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={order_requests}
              ListEmptyComponent={() => <NoDataFound loading={loading} />}
              renderItem={({item, index}) => {
                let cart_item =
                  item?.cart_items_Data?.length > 0
                    ? item?.cart_items_Data[0]
                    : null;
                return (
                  <FoodCardWithRating
                    onPress={() =>
                      navigation.navigate('MyOrdersDetail', {
                        type: 'order_request',
                        id: item?.order_id,
                      })
                    }
                    image={
                      cart_item && cart_item?.itemData?.images?.length > 0
                        ? BASE_URL_IMAGE + cart_item?.itemData?.images[0]
                        : ''
                    }
                    title={
                      cart_item
                        ? cart_item?.item_type == 'deal'
                          ? cart_item?.itemData?.name
                          : cart_item?.itemData?.item_name
                        : ''
                    }
                    // price={cart_item ? cart_item?.itemData?.price : ''}
                    price={item?.total_amount}
                    showRating={false}
                    nextIconWidth={26}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    priceContainerStyle={{marginTop: 0}}
                    imageContainerStyle={{
                      borderRadius: 5,
                      height: 55,
                      width: 58,
                    }}
                  />
                );
              }}
            />
          </>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Assigned Orders</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation?.navigate('Tab', {
                    screen: 'My Orders',
                    params: {nav_type: 'assigned_orders'},
                  })
                }>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={assigned_orders}
              ListEmptyComponent={() => <NoDataFound loading={loading} />}
              renderItem={({item, index}) => {
                let cart_item =
                  item?.cart_items_Data?.length > 0
                    ? item?.cart_items_Data[0]
                    : null;

                return (
                  <FoodCardWithRating
                    onPress={() =>
                      navigation.navigate('MyOrdersDetail', {
                        type: 'assigned_orders',
                        id: item?.order_id,
                      })
                    }
                    image={
                      cart_item && cart_item?.itemData?.images?.length > 0
                        ? BASE_URL_IMAGE + cart_item?.itemData?.images[0]
                        : ''
                    }
                    title={
                      cart_item
                        ? cart_item?.item_type == 'deal'
                          ? cart_item?.itemData?.name
                          : cart_item?.itemData?.item_name
                        : ''
                    }
                    // price={cart_item ? cart_item?.itemData?.price : ''}
                    price={item?.total_amount}
                    // title={item?.title}
                    // image={item?.image}
                    // description={item?.description}
                    // price={item?.price}

                    nextIconWidth={26}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    showRating={false}
                    priceContainerStyle={{marginTop: 0}}
                    imageContainerStyle={{
                      borderRadius: 5,
                      height: 55,
                      width: 58,
                    }}
                  />
                );
              }}
            />
          </>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Order History</Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate('OrderHistory')}>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={order_history}
              ListEmptyComponent={() => <NoDataFound loading={loading} />}
              renderItem={({item, index}) => {
                let cart_item =
                  item?.cart_items_Data?.length > 0
                    ? item?.cart_items_Data[0]
                    : null;
                return (
                  <FoodCardWithRating
                    onPress={() => {
                      navigation.navigate('MyOrdersDetail', {
                        type: 'order_history',
                        id: item?.order_id,
                      });
                    }}
                    // title={item?.title}
                    // image={item?.image}
                    // description={item?.description}
                    // price={item?.price}
                    // nextIconWidth={26}
                    // // label={item?.status}
                    // // type={'all'}
                    // cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    // priceContainerStyle={{marginTop: 0}}
                    // imageContainerStyle={{
                    //   borderRadius: 5,
                    //   height: 55,
                    //   width: 58,
                    // }}
                    // showNextButton={true}
                    // showRating={false}

                    image={
                      cart_item && cart_item?.itemData?.images?.length > 0
                        ? BASE_URL_IMAGE + cart_item?.itemData?.images[0]
                        : ''
                    }
                    title={
                      cart_item
                        ? cart_item?.item_type == 'deal'
                          ? cart_item?.itemData?.name
                          : cart_item?.itemData?.item_name
                        : ''
                    }
                    // price={cart_item ? cart_item?.itemData?.price : ''}
                    price={item?.total_amount}
                    showRating={false}
                    nextIconWidth={26}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    priceContainerStyle={{marginTop: 0}}
                    imageContainerStyle={{
                      borderRadius: 5,
                      height: 55,
                      width: 58,
                    }}
                  />
                );
              }}
            />
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.White, paddingHorizontal: 20},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  welcomeText: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: '#02010E',
    fontSize: RFPercentage(2),
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  nameText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#02010E',
    fontSize: RFPercentage(2.1),
    letterSpacing: 1,
  },
  headerTextView: {
    height: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#02010E',
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(1.9),
    letterSpacing: 0.45,
  },
  viewAllText: {
    color: '#FF5722',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.PlusJakartaSans_Medium,
    textDecorationLine: 'underline',
  },
  container2: {flex: 1, backgroundColor: 'red', alignItems: 'flex-end'},
});
