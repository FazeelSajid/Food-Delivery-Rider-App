import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Icons, Fonts, Images} from '../../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StackHeader from '../../../components/Header/StackHeader';
import CInput from '../../../components/TextInput/CInput';
import FoodCardWithRating from '../../../components/Cards/FoodCardWithRating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GetRiderOrders} from '../../../utils/helpers/orderApis';
import Loader from '../../../components/Loader';
import {BASE_URL_IMAGE} from '../../../utils/globalVariables';
import NoDataFound from '../../../components/NotFound/NoDataFound';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderHistory} from '../../../redux/OrderSlice';

const OrderHistory = ({navigation, route}) => {
  const dispatch = useDispatch();
  let {order_history, isOrderUpdate} = useSelector(store => store.order);

  const [isSearch, setIsSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [dataCopy, setDataCopy] = useState([]);
  const [data, setData] = useState([
    // {
    //   id: 0,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 2,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 3,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 4,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 5,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 6,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 7,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 8,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 9,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 10,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
    // {
    //   id: 11,
    //   title: 'Green Salad',
    //   image: Images.salad,
    //   price: '14:20',
    //   rating: 4.5,
    // },
  ]);

  const handleSearch = query => {
    // setSearchQuery(query);
    // const filteredData = dataCopy?.filter(item =>
    //   item?.title?.toLowerCase()?.includes(query?.toLowerCase()),
    // );
    // setFilteredData(filteredData);
    if (!query) {
      // setData(dataCopy);
      dispatch(setOrderHistory(dataCopy));
    } else {
      const filteredData = dataCopy?.filter(item => {
        const firstCartItem = item?.cart_items_Data?.[0]?.itemData;
        return (
          item?.cart_items_Data?.length > 0 &&
          (firstCartItem?.name?.includes(query) ||
            firstCartItem?.item_name?.includes(query))
        );
      });
      console.log('filteredData?.length', filteredData?.length);
      // setData(filteredData);
      dispatch(setOrderHistory(filteredData));
    }
  };

  const handleCloseSearch = async () => {
    setIsSearch(false);
    setFilteredData([]);
    setSearchQuery('');
  };

  useEffect(() => {
    // const delayDebounceFn = setTimeout(() => {
    //   if (isFirst) {
    //     setIsFirst(false);
    //   } else {
    //     // setLoading(true);
    //     handleSearch(searchQuery);
    //     // Send Axios request here
    //   }
    // }, 1000);

    // return () => clearTimeout(delayDebounceFn);
    handleSearch(searchQuery);
  }, [searchQuery]);

  const getData = async () => {
    try {
      let data2 = await GetRiderOrders();
      // setData(data2);
      dispatch(setOrderHistory(data2));
      setDataCopy(data2);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getData();
  // }, []);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [isOrderUpdate]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
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
        contentContainerStyle={{flexGrow: 1}}>
        <StackHeader
          title={'Order History'}
          showTitle={!isSearch}
          iconContainerStyle={{marginTop: isSearch ? -12 : 8}}
          headerStyle={{paddingVertical: isSearch ? 0 : 10}}
          onBackPress={() =>
            isSearch ? handleCloseSearch() : navigation?.goBack()
          }
          rightIcon={
            <>
              {isSearch ? (
                <TouchableOpacity
                  style={{flex: 1, width: wp(70), marginTop: 7}}>
                  <CInput
                    width={wp(75)}
                    height={38}
                    placeholder={'Search'}
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    leftContent={<Icons.SearchIcon style={{marginRight: 10}} />}
                    rightContent={
                      <TouchableOpacity
                        style={{padding: 10, paddingRight: 0}}
                        onPress={() => handleCloseSearch()}>
                        <AntDesign
                          name="closecircle"
                          size={20}
                          color={'#838383'}
                        />
                      </TouchableOpacity>
                    }
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{paddingLeft: 15}}
                  onPress={() => setIsSearch(true)}>
                  <Icons.SearchIcon />
                </TouchableOpacity>
              )}
            </>
          }
        />
        <View style={{flex: 1, marginTop: -15, paddingBottom: 30}}>
          <FlatList
            // data={isSearch ? filteredData : data}
            data={order_history}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            // ListHeaderComponent={() => <View style={{height: 10}} />}
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
                  price={cart_item ? cart_item?.itemData?.price : ''}
                  description={item?.description}
                  // price={item?.price}
                  // rating={item?.rating}
                  cardStyle={{marginTop: 15}}
                  showNextButton={true}
                  nextIconWidth={26}
                  // showRatingOnBottom={false}
                  showRating={false}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
