import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MenuHeader from '../../../../components/Header/MenuHeader';
import {Searchbar} from 'react-native-paper';
import CInput from '../../../../components/TextInput/CInput';
import {Colors, Fonts, Icons, Images} from '../../../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from 'react-native-swiper-flatlist/src/themes';

import AssignedOrders from './AssignedOrders';
import OrderRequests from './OrderRequests';
import {useFocusEffect} from '@react-navigation/native';

const MyOrders = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [selectedTab, setSelectedTab] = useState(0);
  const [topTabs, setTopTabs] = useState([
    {
      id: 0,
      title: 'Order Requests',
    },
    {
      id: 1,
      title: 'Assigned Orders',
    },
  ]);

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

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.nav_type) {
        setSelectedTab(1);
      } else {
        setSelectedTab(0);
      }
    }, [route?.params]),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MenuHeader title={'My Order'} />
      <View style={{flex: 1}}>
        <CInput
          placeholder={'Search order'}
          leftContent={
            <View style={{marginLeft: -5}}>
              <Icons.SearchIconInActive />
            </View>
          }
          backgroundColor={'transparent'}
          placeholderTextColor={'#7D8FAB'}
          containerStyle={{borderWidth: 1, borderColor: '#E8EFF3', height: 45}}
        />
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <FlatList
              data={topTabs}
              horizontal
              contentContainerStyle={{
                justifyContent: 'space-between',
                // width: wp(90),
                // flexGrow: 1,
                flex: 1,
                paddingHorizontal: 20,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSelectedTab(item?.id)}
                    style={{
                      borderColor:
                        item?.id == selectedTab ? Colors.Orange : '#E8EFF3',
                      backgroundColor:
                        item?.id == selectedTab ? Colors.Orange : 'transparent',
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 25,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {/* {item?.id == 1 && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10 / 2,
                            backgroundColor:
                              item?.id == selectedTab
                                ? colors.white
                                : Colors.Orange,
                            marginRight: 5,
                          }}></View>
                      )} */}
                      <Text
                        style={{
                          color:
                            item?.id == selectedTab ? Colors.White : '#2C406E',
                          fontFamily: Fonts.PlusJakartaSans_Medium,
                          fontSize: RFPercentage(1.8),
                          marginTop: -2,
                        }}>
                        {item?.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {selectedTab == 0 ? (
            <OrderRequests data={data} />
          ) : (
            <AssignedOrders data={data} />
          )}
        </View>
      </View>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
