import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Dot from '../../Assets/svg/dot.svg';
import { Colors, Fonts } from '../../constants';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const HistoryOrderCard = ({item}) => {
  const navigation = useNavigation()
  // console.log({item});
  

  return (
    <TouchableOpacity onPress={()=> navigation.navigate('HistoryOrderDetailScreen', {
      item: item
    })} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderText}>Order #{item?.order_id}</Text>
        {/* <View style={styles.statusContainer}> */}
          <Text style={[styles.statusText, item?.order_status === 'cancelled'? {color: '#88260D', backgroundColor: '#FEB6B6' } :{color: '#384308', backgroundColor: '#F2FFB9' }  ]}>{item?.order_status === 'cancelled'? 'Cancelled' : 'Delivered'}</Text>
        {/* </View> */}
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.priceText}>£{item?.total_amount}</Text>
        <Text style={[styles.itemsText, {marginHorizontal: wp(2) }]}>|</Text>
        <Dot height={7} />
        <Text style={[styles.itemsText, {marginHorizontal: wp(1.5)}]}>{item.cart_items_ids.length < 10 ? `0${item.cart_items_ids.length}` : item.cart_items_ids.length  } Items </Text>
       
        <Text style={styles.itemsText}>{moment(item?.updated_at).format("MMM DD, YYYY, hh:mm A")}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.itemsText, {marginRight: wp(2)}]}>My earnings: £10</Text>
        <Dot height={7} />
        
        <View style={[{flexDirection: 'row', alignItems: 'center'}, {marginLeft: wp(2)}]} >
        <Fontisto name="star" size={RFPercentage(2.2)} color={'#FFCA00'} />
        <Text style={[styles.itemsText, {marginLeft: wp(2)}]}>4.8</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    borderWidth: wp(0.1),
    borderColor: Colors.secondary_text,
    backgroundColor: Colors.secondary_color,
    width: wp('85%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: Colors.primary_text,
  },
  statusContainer: {
    backgroundColor: '#F2FFB9',
    borderRadius: wp('10%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
  },
  statusText: {
    color: '#384308',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(1.7),
    paddingHorizontal: wp(3),
    borderRadius: wp(6)
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  priceText: {
    fontSize: RFPercentage(1.9),
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: Colors.primary_text,
    textAlign: 'center',
  },
  itemsText: {
    fontSize: wp('3.2%'),
    color: Colors.secondary_text,
    fontFamily: Fonts.PlusJakartaSans_Regular,
  },
  dateText: {
    fontSize: wp('3.8%'),
    color: Colors.secondary_text,
  },
  dot: {
    fontSize: wp('4%'),
    color: Colors.secondary_text,
    marginHorizontal: wp('1%'),
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  earningsText: {
    fontSize: wp('3.8%'),
    color: Colors.secondary_text,
    fontFamily: Fonts.PlusJakartaSans_Regular,
  },
  starIcon: {
    width: wp('4%'),
    height: wp('4%'),
    tintColor: '#FFC107',
    marginLeft: wp('1%'),
  },
  ratingText: {
    fontSize: wp('3.8%'),
    color: Colors.secondary_text,
    marginLeft: wp('1%'),
  },
});

export default HistoryOrderCard;
