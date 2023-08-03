import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons, Images} from '../../../constants';
import StackHeader from '../../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-paper';
import ItemSeparator from '../../../components/Separator/ItemSeparator';
const Notification = ({navigation, route}) => {
  const [data, setData] = useState([
    {
      id: 0,
      title: 'New order request',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'request',
    },
    {
      id: 1,
      title: 'Order is preparing',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'preparing',
    },
    {
      id: 2,
      title: 'Order is ready to deliver',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'ready',
    },
    {
      id: 3,
      title: 'Customer gives you ratings',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'rating',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet ',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user2,
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet ',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user3,
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit amet ',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user4,
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit amet ',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user5,
    },
    {
      id: 8,
      title: 'Lorem ipsum dolor sit amet',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user2,
    },
    {
      id: 9,
      title: 'Lorem ipsum dolor sit amet',
      description: 'Morem ipsum dolor sit amet, consectetur elit',
      time: '03:00 pm',
      type: 'other',
      profile: Images.user3,
    },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <FlatList
        data={data}
        ListHeaderComponent={() => <StackHeader title={'Notifications'} />}
        ItemSeparatorComponent={() => <ItemSeparator style={{width: wp(88)}} />}
        contentContainerStyle={{paddingBottom: 30}}
        renderItem={({item, index}) => (
          <View style={styles.card}>
            {item?.type == 'request' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderPlaced />
              </View>
            ) : item?.type == 'preparing' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderInProcess />
              </View>
            ) : item?.type == 'ready' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderOutForDelivery />
              </View>
            ) : item?.type == 'rating' ? (
              <View style={styles.iconContainer}>
                <Icons.RatingActive />
              </View>
            ) : (
              <Avatar.Image
                source={item?.profile}
                size={50}
                style={{backgroundColor: Colors.AvatarBG}}
              />
            )}

            <View style={{marginLeft: 10, flex: 1}}>
              <View style={styles.rowViewSB}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22},
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#FF572233',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.Black,
    fontSize: RFPercentage(1.7),
    lineHeight: 30,
  },
  timeText: {
    fontFamily: Fonts.Inter_Medium,
    color: '#595959',
    fontSize: RFPercentage(1.5),
  },
  description: {
    fontFamily: Fonts.Inter_Regular,
    color: '#595959',
    fontSize: RFPercentage(1.5),
    opacity: 0.7,
  },
});
