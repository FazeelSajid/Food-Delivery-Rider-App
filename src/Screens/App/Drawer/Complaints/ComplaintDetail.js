import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Images} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import {Avatar} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import FoodCard from '../../../../components/Cards/FoodCard';
import OrdersCard from '../../../../components/Cards/OrdersCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../../components/Cards/FoodCardWithRating';
import api from '../../../../constants/api';
import Loader from '../../../../components/Loader';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';

const ComplaintDetail = ({navigation, route}) => {
  let {detail} = route?.params;

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [fistCartItemDetail, setFistCartItemDetail] = useState(null);
  const [itemImages, setItemImages] = useState([]);
  const getFirstTwoLettersOfName = name => {
    let data = name?.split(' ').map(name => name[0]);
    if (data) {
      return data?.toString().replace(/,/g, '');
    } else {
      return '';
    }
  };

  const getOrderDetail = id => {
    console.log('order id   : ', id);
    setLoading(true);
    fetch(api.get_order_by_id + id)
      .then(response => response.json())
      .then(response => {
        if (response.status == true) {
          setOrderDetails(response.result);
          let cart_item =
            response.result?.cart_items_Data?.length > 0
              ? response.result?.cart_items_Data[0]
              : null;
          setItemImages(cart_item?.itemData?.images);
          console.log(
            'cart_item?.itemData?.images  :  ',
            cart_item?.itemData?.images,
          );

          setFistCartItemDetail(cart_item);
        } else {
          setOrderDetails(null);
          setItemImages([]);
        }
      })
      .catch(err => console.log('error : ', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getOrderDetail(detail?.order?.order_id);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <StackHeader title={'Details'} />
      {!loading && (
        <View style={{flex: 1}}>
          <View style={styles.rowView}>
            <Avatar.Text
              size={50}
              label={getFirstTwoLettersOfName(detail?.customer?.user_name)}
              style={{backgroundColor: Colors.Orange}}
              labelStyle={{color: Colors.White}}
            />
            <Text style={styles.name}>{detail?.customer?.user_name}</Text>
          </View>
          <Text style={styles.description}>{detail?.description}</Text>

          {/* <OrdersCard
            disabled={true}
            title={'Fresh Orange splash'}
            image={Images.shake}
            description={'Mix fresh real orange '}
            price={'13.40'}
            width={wp(90)}
          /> */}

          <View style={{height: 95}}>
            <FoodCardWithRating
              onPress={() => {
                navigation.navigate('MyOrdersDetail', {
                  id: detail?.order?.order_id,
                  type: 'order_history',
                });
              }}
              disabled={false}
              title={
                fistCartItemDetail
                  ? fistCartItemDetail?.item_type == 'deal'
                    ? fistCartItemDetail?.itemData?.name
                    : fistCartItemDetail?.itemData?.item_name
                  : ''
              }
              image={
                itemImages?.length > 0 ? BASE_URL_IMAGE + itemImages[0] : ''
              }
              // description={'Mix fresh real orange '}
              price={
                fistCartItemDetail ? fistCartItemDetail?.itemData?.price : ''
              }
              cardStyle={{marginTop: 15}}
              showNextButton={false}
              // showRatingOnBottom={true}
              showRating={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ComplaintDetail;

const styles = StyleSheet.create({
  rowView: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  name: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#292323',
    marginLeft: 10,
    fontSize: RFPercentage(1.9),
  },
  description: {
    fontFamily: Fonts.Inter_Regular,
    color: '#808D9E',
    marginVertical: 15,
    fontSize: RFPercentage(1.5),
    lineHeight: 20,
    paddingHorizontal: 25,
  },
});
