import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons, Images, Fonts} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import MenuHeader from '../../../../components/Header/MenuHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CButton from '../../../../components/Buttons/CButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PriceText from '../../../../components/Text';
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
        <View style={{backgroundColor: Colors.Orange, height: hp(23)}}>
          <StackHeader
            title={'My Wallet'}
            titleColor={'white'}
            backIconColor={'white'}
            statusBarBG={Colors.Orange}
            statusBarStyle={'light-content'}
            // headerView={{marginTop: StatusBar.currentHeight}}
            headerView={{marginTop: 10}}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: Fonts.Inter_SemiBold,
                color: Colors.White,
                fontSize: RFPercentage(4),
                lineHeight: 45,
              }}>
              $ 3,567
            </Text>
            <Text
              style={{
                fontFamily: Fonts.PlusJakartaSans_Medium,
                color: Colors.White,
                fontSize: RFPercentage(1.5),
                opacity: 0.95,
              }}>
              Total Amount
            </Text>
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
            // renderItem={({item, index}) => {
            //   return (
            //     <TouchableOpacity disabled={true} style={styles.itemView}>
            //       <ImageBackground
            //         source={item?.image}
            //         blurRadius={40}
            //         style={styles.imageContainer}>
            //         <Image source={item?.image} style={styles.image} />
            //       </ImageBackground>
            //       <View style={styles.textContainer}>
            //         <Text style={styles.title}>{'Fresh Orange splash'}</Text>
            //         <View style={styles.rowView1}>
            //           <Text style={styles.nameText}>{'Actual Price:   '}</Text>
            //           <Text style={styles.priceText}>
            //             $ {item?.actual_price}
            //           </Text>
            //         </View>
            //         <View style={styles.rowView1}>
            //           <Text style={styles.nameText}>
            //             {'After Deduction:   '}
            //           </Text>
            //           <Text style={styles.priceText}>
            //             $ {item?.after_deduction}
            //           </Text>
            //         </View>
            //       </View>
            //     </TouchableOpacity>
            //   );
            // }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MYWallet;

const styles = StyleSheet.create({
  rowView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: 13,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  rowView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FF572233',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  priceText1: {
    color: Colors.Orange,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: RFPercentage(2.5),
  },
  priceText: {
    color: Colors.Orange,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: RFPercentage(1.8),
  },
  heading: {
    color: '#292323',
    fontFamily: Fonts.Inter_Medium,
    fontSize: RFPercentage(2),
  },
  subText: {
    color: '#8D93A1',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(2),
  },
  title: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.Text,
    fontSize: RFPercentage(1.7),
    lineHeight: 25,
  },
  nameText: {
    fontFamily: Fonts.Inter_Regular,
    color: '#292323',
    opacity: 0.6,
    fontSize: RFPercentage(1.5),
    lineHeight: 16,
  },
});
