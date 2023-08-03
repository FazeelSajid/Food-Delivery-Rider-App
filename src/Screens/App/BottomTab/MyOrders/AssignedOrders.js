import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {Images} from '../../../../constants';
import OrdersCard from '../../../../components/Cards/OrdersCard';
import {useNavigation} from '@react-navigation/native';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';

const AssignedOrders = ({route}) => {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Order Placed',
    },
    {
      id: 1,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Preparing',
    },
    {
      id: 2,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Ready to Deliver',
    },
    {
      id: 3,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Out for Delivery',
    },
    {
      id: 4,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Order Placed',
    },
    {
      id: 5,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Order Placed',
    },
    {
      id: 6,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Order Placed',
    },
    {
      id: 7,
      image: Images.food8,
      title: 'Green Salad',
      description: 'Mix fresh real orange',
      price: 13.2,
      status: 'Order Placed',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{height: 5}} />}
        ListFooterComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => (
          <FoodCardWithRating
            onPress={() =>
              navigation.navigate('MyOrdersDetail', {
                type: 'assigned_orders',
              })
            }
            title={item?.title}
            image={item?.image}
            description={item?.description}
            price={item?.price}
            // label={item?.status}
            // type={'all'}
            cardStyle={{marginTop: 15}}
            showNextButton={false}
            showRatingOnBottom={true}
          />
        )}
      />
    </View>
  );
};
export default AssignedOrders;

const styles = StyleSheet.create({});
