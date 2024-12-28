import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Icons } from '../../../../constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StackHeader from '../../../../components/Header/StackHeader';
import CInput from '../../../../components/TextInput/CInput';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemSeparator from '../../../../components/Separator/ItemSeparator';
import TopSearchesList from '../../../../components/Lists/TopSearchesList';
import { addSearchOrderItem, removeSearchOrderItem, setSearchOrders } from '../../../../redux/AuthSlice';
import { showAlert } from '../../../../utils/helpers';
import NoDataFound from '../../../../components/NotFound/NoDataFound';
import api from '../../../../constants/api';
import { BASE_URL_IMAGE } from '../../../../utils/globalVariables';
import Loader from '../../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../../../../components/Cards/OrderCard';

const SearchOrder = ({ navigation, route }) => {
  const { searchOrders, rider_id, Colors } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  let { assigned_orders, order_requests } = useSelector(store => store.order);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTopSearches, setShowTopSearches] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
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
  const [topSearchesList, setTopSearchesList] = useState(searchOrders);

  const handleRemoveTopSearches = async item => {
    const filter = topSearchesList.filter(e => e != item);
    setTopSearchesList(filter);
    dispatch(setSearchOrders(filter))
  };

  const searchApi = async query => {
    setShowTopSearches(false);
    if (!loading) {
      setLoading(true);
    }
    try {
      const filteredData = [
        ...assigned_orders?.filter(item =>
          item?.order_id?.toString().includes(query)
        ),
        ...order_requests?.filter(item =>
          item?.order_id?.toString().includes(query)
        )
      ];
      setData(filteredData);
      if (filteredData?.length > 0) {
        let found = topSearchesList?.some(item => item == query);
        if (!found) {
          dispatch(setSearchOrders([...topSearchesList, query]))
        }
      }
    } catch (error) {
      console.log('error in search api : ', error);
      showAlert('Something went wrong');
    } finally {
      setLoading(false);
      // setShowTopSearches(true);
    }
  };

  const handleSearch = text => {
    console.log('text : ', text);
    setSearchQuery(text);
    setShowTopSearches(true);
  };

  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (isFirst) {
        setIsFirst(false);
      } else if (searchQuery?.length == 0) {
        setLoading(false);
        setData([]);
      } else {
        setLoading(true);
        searchApi(searchQuery?.trim());
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary_color }}>
      <Loader loading={loading} />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}>
        <StackHeader
          showTitle={false}
          iconContainerStyle={{
            marginTop: -12,
          }}
          headerStyle={{
            paddingVertical: 0,
          }}
          onBackPress={() => navigation?.goBack()}
          rightIcon={
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: wp(70),
                  marginTop: 7,
                }}>
                <CInput
                  width={wp(75)}
                  height={38}
                  placeholder={'Search here'}
                  value={searchQuery}
                  onChangeText={text => handleSearch(text)}
                  leftContent={
                    <Icons.SearchIconInActive
                      style={{ marginLeft: -12, marginRight: -6 }}
                      width={32}
                    />
                  }
                />
              </TouchableOpacity>
            </>
          }
        />

        {showTopSearches && (
          <View
            style={{
              flex: 1,
              marginTop: -15,
              paddingBottom: 30,
            }}>
            <TopSearchesList
              data={topSearchesList}
              onPress={item => {
                console.log('onPress :  ');
                searchApi(item);
                setSearchQuery(item);
              }}
              onRemove={item => handleRemoveTopSearches(item)}
            />
          </View>
        )}

        {showTopSearches ? null : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: hp(3) }} />}
            renderItem={({ item, index }) => {
              let cart_item =
                item?.cart_items_Data?.length > 0
                  ? item?.cart_items_Data[0]
                  : null;
              return (
                < OrderCard item={item} status={true} />
                // <FoodCardWithRating
                //   onPress={() =>
                //     navigation.navigate('OrderDetails', {
                //       id: item?.order_id,
                //     })
                //   }
                //   image={
                //     cart_item && cart_item?.itemData?.images?.length > 0
                //       ? BASE_URL_IMAGE + cart_item?.itemData?.images[0]
                //       : ''
                //   }
                //   title={
                //     cart_item
                //       ? cart_item?.item_type == 'deal'
                //         ? cart_item?.itemData?.name
                //         : cart_item?.itemData?.item_name
                //       : ''
                //   }
                //   price={cart_item ? cart_item?.itemData?.price : ''}
                //   showRating={false}
                //   label={item?.status}
                //   type={'history'}
                //   //   cardStyle={{marginTop: 5}}
                //   imageContainerStyle={{
                //     // width: 30,
                //     height: 60,
                //     marginVertical: 1.5,
                //     flex: 0.34,
                //   }}
                // />
              );
            }}
            ListEmptyComponent={() => (loading ? null : <NoDataFound />)}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default SearchOrder;
