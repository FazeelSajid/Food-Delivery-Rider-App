import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {Images} from '../../../../constants';
import OrdersCard from '../../../../components/Cards/OrdersCard';
import {useNavigation} from '@react-navigation/native';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import NoDataFound from '../../../../components/NotFound/NoDataFound';
import { useSelector } from 'react-redux';

const AssignedOrders = ({route, data}) => {
  const navigation = useNavigation();


  return (
    <View style={{flex: 1}}>
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
              // // label={item?.status}
              // // type={'all'}
              cardStyle={{marginTop: 15}}
              showNextButton={true}
              // showRatingOnBottom={true}
              showRating={false}
            />
          );
        }}
      />
    </View>
  );
};

export default AssignedOrders;

const styles = StyleSheet.create({});
