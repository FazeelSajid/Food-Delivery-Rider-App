import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons, Images, Fonts} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import {useFocusEffect} from '@react-navigation/native';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetWalletAmount} from '../../../../utils/helpers/walletApis';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import Loader from '../../../../components/Loader';
import NoDataFound from '../../../../components/NotFound/NoDataFound';

const MYWallet = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([
    // {
    //   id: 0,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 1,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 2,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 3,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 4,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 5,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 6,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
    // {
    //   id: 7,
    //   image: Images.salad,
    //   actual_price: '13.40',
    //   after_deduction: '10.00',
    // },
  ]);

  const getData = async () => {
    setLoading(true);
    let amount = await GetWalletAmount();
    console.log({amount});
    setTotalAmount(amount);
    // setLoading(false);
    let rider_id = await AsyncStorage.getItem('rider_id');
    fetch(api.get_rider_orders + rider_id)
      .then(response => response.json())
      .then(response => {
        let list = response?.result ? response?.result : [];
        let filteredData = list?.filter(
          item => item?.cart_items_Data?.length > 0,
        );
        filteredData = filteredData?.filter(
          item =>
            item?.order_status == 'delievered' ||
            item?.order_status == 'delivered',
        );
        setData(filteredData);
      })
      .catch(err => console.log('error : ', err))
      .finally(() => setLoading(false));
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        <View style={styles.headerContainer}>
          <StackHeader
            title={'My Wallet'}
            titleColor={'white'}
            backIconColor={'white'}
            statusBarBG={Colors.Orange}
            statusBarStyle={'light-content'}
            headerView={{marginTop: 10}}
          />
          <View style={styles.header}>
            <Text style={styles.priceText}>$ {totalAmount}</Text>
            <Text style={styles.totalAmount}>Total Amount</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListHeaderComponent={() => <View style={{height: 10}} />}
            ListEmptyComponent={() => <NoDataFound loading={loading} />}
            renderItem={({item, index}) => {
              let cart_item =
                item?.cart_items_Data?.length > 0
                  ? item?.cart_items_Data[0]
                  : null;
              return (
                <FoodCardWithRating
                  disabled={false}
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
                  cardStyle={{marginTop: 15}}
                  showNextButton={false}
                  // showRatingOnBottom={true}
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

export default MYWallet;

const styles = StyleSheet.create({
  headerContainer: {backgroundColor: Colors.Orange, height: hp(23)},
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  priceText: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.White,
    fontSize: RFPercentage(4),
    lineHeight: 45,
  },
  totalAmount: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: Colors.White,
    fontSize: RFPercentage(1.5),
    opacity: 0.95,
  },
});
