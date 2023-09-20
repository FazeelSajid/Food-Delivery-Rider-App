import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '../../../../constants';
import OrdersCard from '../../../../components/Cards/OrdersCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GetNearestOrders} from '../../../../utils/helpers/orderApis';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import Loader from '../../../../components/Loader';
import NoDataFound from '../../../../components/NotFound/NoDataFound';

const OrderRequests = ({route, data}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const data = [
  //   {
  //     id: 0,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Order Placed',
  //   },
  //   {
  //     id: 1,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Preparing',
  //   },
  //   {
  //     id: 2,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Ready to Deliver',
  //   },
  //   {
  //     id: 3,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Out for Delivery',
  //   },
  //   {
  //     id: 4,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Order Placed',
  //   },
  //   {
  //     id: 5,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Order Placed',
  //   },
  //   {
  //     id: 6,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Order Placed',
  //   },
  //   {
  //     id: 7,
  //     image: Images.food8,
  //     title: 'Green Salad',
  //     description: 'Mix fresh real orange',
  //     price: 13.2,
  //     status: 'Order Placed',
  //   },
  // ];

  return (
    <View style={{flex: 1}}>
      <Loader loading={loading} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{height: 5}} />}
        ListFooterComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={() => <NoDataFound />}
        renderItem={({item}) => {
          let cart_item =
            item?.cart_items_Data?.length > 0 ? item?.cart_items_Data[0] : null;

          return (
            <FoodCardWithRating
              onPress={() =>
                navigation.navigate('MyOrdersDetail', {
                  type: 'order_request',
                  id: item?.order_id,
                })
              }
              // title={item?.title}
              // image={item?.image}
              // description={item?.description}
              // price={item?.price}
              // // label={item?.status}
              // // type={'all'}

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
              cardStyle={{marginTop: 15}}
              showNextButton={true}
              // showRatingOnBottom={false}
              showRating={false}
            />
          );
        }}
      />
    </View>
  );
};

export default OrderRequests;

const styles = StyleSheet.create({});
