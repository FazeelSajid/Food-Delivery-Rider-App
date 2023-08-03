import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons, Images} from '../../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FoodCardWithRating from '../../../components/Cards/FoodCardWithRating';

const Home = ({navigation, route}) => {
  const [orderRequests, setOrderRequests] = useState([
    {
      id: 0,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
    {
      id: 1,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
  ]);
  const [assignedOrders, setAssignedOrders] = useState([
    {
      id: 0,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
    {
      id: 1,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
  ]);
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 0,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
    {
      id: 1,
      title: 'Green Salad',
      image: Images.salad,
      price: '14:20',
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Icons.MenuActive width={23} />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* <Icons.NotificationActive /> */}
            <Icons.NotificationWithDot />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.nameText}>John Doe</Text>
        </View>
        <View style={{marginVertical: 20}}>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Orders Requests</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={orderRequests}
              renderItem={({item, index}) => {
                return (
                  <FoodCardWithRating
                    onPress={() => {}}
                    title={item?.title}
                    image={item?.image}
                    description={item?.description}
                    price={item?.price}
                    // label={item?.status}
                    // type={'all'}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    showRating={false}
                  />
                );
              }}
            />
          </>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Assigned Orders</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={assignedOrders}
              renderItem={({item, index}) => {
                return (
                  <FoodCardWithRating
                    onPress={() => {}}
                    title={item?.title}
                    image={item?.image}
                    description={item?.description}
                    price={item?.price}
                    // label={item?.status}
                    // type={'all'}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    showRating={false}
                  />
                );
              }}
            />
          </>
          <>
            <View style={styles.headerTextView}>
              <Text style={styles.headerText}>Order History</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={orderRequests}
              renderItem={({item, index}) => {
                return (
                  <FoodCardWithRating
                    onPress={() => {}}
                    title={item?.title}
                    image={item?.image}
                    description={item?.description}
                    price={item?.price}
                    // label={item?.status}
                    // type={'all'}
                    cardStyle={{marginHorizontal: 0, marginBottom: 15}}
                    showNextButton={true}
                    showRating={false}
                  />
                );
              }}
            />
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.White, paddingHorizontal: 20},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  welcomeText: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: '#02010E',
    fontSize: RFPercentage(1.6),
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  nameText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#02010E',
    fontSize: RFPercentage(2.1),
    letterSpacing: 0.7,
  },
  headerTextView: {
    height: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#02010E',
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(1.9),
    letterSpacing: 0.45,
  },
  viewAllText: {
    color: '#FF5722',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.PlusJakartaSans_Medium,
    textDecorationLine: 'underline',
  },
  container2: {flex: 1, backgroundColor: 'red', alignItems: 'flex-end'},
});
