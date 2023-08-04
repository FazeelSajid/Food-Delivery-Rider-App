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

const MYWallet = ({navigation, route}) => {
  const [data, setData] = useState([
    {
      id: 0,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 1,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 2,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 3,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 4,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 5,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 6,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
    {
      id: 7,
      image: Images.salad,
      actual_price: '13.40',
      after_deduction: '10.00',
    },
  ]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
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
            <Text style={styles.priceText}>$ 3,567</Text>
            <Text style={styles.totalAmount}>Total Amount</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListHeaderComponent={() => <View style={{height: 10}} />}
            renderItem={({item, index}) => {
              return (
                <FoodCardWithRating
                  disabled={true}
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
