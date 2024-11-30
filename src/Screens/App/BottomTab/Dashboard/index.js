import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PopUp from '../../../../components/Popup/PopUp';
import { Colors, Fonts, Icons } from '../../../../constants';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Requests from './Requests';
import InProgress from './InProgress';
import History from './History';
import { setContacts, setUserAppOpenLocation } from '../../../../redux/AuthSlice';
import { getCurrentLocation } from '../../../../utils/helpers/location';
import messaging from '@react-native-firebase/messaging';
import { BASE_URL } from '../../../../utils/globalVariables';
import moment from 'moment';
import { io } from 'socket.io-client';


const Dashboard = ({ navigation, route }) => {
  const { rider_details, userAppOpenLocation, totalWalletAmount, rider_id, contacts } = useSelector(store => store.auth)
  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
  const [riderInfo, setRiderInfo] = useState(null);
  const [showDorpDown, setShowDropDown] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Today')
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [totalEarning, setTotalEarning] = useState(0)
  const dispatch = useDispatch()

  // console.log(contacts);

  

  const socketUrl = 'https://food-delivery-be.caprover-demo.mtechub.com/';


  useEffect(() => {
    const newSocket = io(BASE_URL);
    // setSocket(newSocket);

    // Fetch contacts on socket connection
    newSocket.on('connect', () => {
        newSocket.emit('getContacts', { rider_id }); 
    });

    // Listen for contacts data
    newSocket.on('contacts', (contactsData) => {
        dispatch(setContacts(contactsData));  

        // console.log({contactsData});
        

        
    });

    // Listen for room join confirmation
    // newSocket.on('roomJoined', ({ roomId }) => {
    //     setRoomId(roomId);
    //     console.log(`Joined room: ${roomId}`);
    // });

    // Listen for previous messages
    // newSocket.on('previousMessages', ({ messages }) => {
    //     setMessages(messages);
    //     console.log('Previous messages loaded:', messages);
    // });

    // newSocket.emit('joinRoom', customer_id);
    // newSocket.on('roomJoined', ({ roomId }) => {
    //     setRoomId(roomId);
    //     console.log(`Joined room: ${roomId}`);
    // });


    // if (rest_ID || customer_id) {
    //     const initialContact = {
    //         customer_id,
    //         // rider_id,
    //         rest_ID
    //     };

    //     // Automatically join the room or create a new room based on available IDs
    //     newSocket.emit('joinRoom', initialContact);
    //     newSocket.on('roomJoined', ({ roomId }) => {
    //         setRoomId(roomId);
    //         console.log(`Joined room: ${roomId}`);
    //     });

    //     // Fetch previous messages for the room if available
    //     newSocket.on('previousMessages', ({ messages }) => {
    //         setMessages(messages);
    //         console.log('Previous messages loaded:', messages);
    //     });
    // }

    // Listen for new messages
    
    // newSocket.on('newMessage', ({ sender_type, senderId, message }) => {

    //     console.log(sender_type, senderId, message);

    //     setMessages((prevMessages) => [
    //         ...prevMessages,
    //         { sender_type, senderId, message },
    //     ]);

    //     // Update the contacts list by moving the contact to the top
    //     setContacts((prevContacts) => {
    //         // Find the contact that received the new message
    //         const updatedContacts = prevContacts.map(contact => {
    //             if (contact.customer_id === senderId) {
    //                 return {
    //                     ...contact,
    //                     message: message,
    //                     last_message_time: new Date().toISOString() // Update the last message time
    //                 };
    //             }
    //             return contact;
    //         });
    //         // Sort contacts to bring the one with the latest message to the top
    //         return updatedContacts.sort((a, b) => new Date(b.last_message_time) - new Date(a.last_message_time));
    //     });
    // });

    // Handle errors
    
    
    newSocket.on('error', (error) => {
        console.error('Socket Error:', error.message);
    });

    // Cleanup on component unmount
    return () => {
        newSocket.disconnect();
    };
}, []);
  


  // const getData = async () => {
  //   try {
  //     let data = await GetNearestOrders();
  //     if (data?.length > 2) {
  //       const slicedArray = data.slice(0, 2);
  //       // setOrderRequests(slicedArray);
  //       dispatch(setOrderRequests(slicedArray));
  //     } else {
  //       // setOrderRequests(data);
  //       dispatch(setOrderRequests(data));
  //     }
  //     // getting assigned orders
  //     let data1 = await GetAssignedOrders();
  //     if (data1?.length > 2) {
  //       const slicedArray = data1.slice(0, 2);
  //       // setAssignedOrders(slicedArray);
  //       dispatch(setAssignedOrders(slicedArray));
  //     } else {
  //       // setAssignedOrders(data1);
  //       dispatch(setAssignedOrders(data1));
  //     }

  //     // getting order history
  //     let data2 = await GetRiderOrders();
  //     if (data2?.length > 2) {
  //       const slicedArray = data2.slice(0, 2);
  //       // setOrderHistory(slicedArray);
  //       dispatch(setOrderHistory(slicedArray));
  //     } else {
  //       // setOrderHistory(data2);
  //       dispatch(setOrderHistory(data2));
  //     }

  //     setLoading(false);
  //     setRefreshing(false);
  //     console.log('set refresh to false');
  //   } catch (error) {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // console.log(rider_details.email);

  // useFocusEffect(
  //   React.useCallback(async () => {
  //     setRiderInfo(rider_details)
  //   }, []),
  // );

  const renderScene = SceneMap({
    first: Requests,
    second: InProgress,
    third: History,
  });

  const [routes] = React.useState([
    { key: 'first', title: 'Request' },
    { key: 'second', title: 'In Progress' },
    { key: 'third', title: 'History' },
  ]);

  const handleDropDownSelect = (option) => {
    setSelectedOption(option)
    setShowDropDown(false)
  }

  // const func = async ()=> {
  //   const fcmToken = await messaging().getToken();
  //   console.log(fcmToken, 'token');
  // }

  useEffect(() => {
    setRiderInfo(rider_details)
    // func()
  }, []);

 
       
  const dateString = new Date()
  const date = moment(dateString);

  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  const fetchPayments = async () => {
    // setIsLoading(true);
    let InsertAPIURL = `${BASE_URL}wallet/ViewAllPaymentsAndEarning_rider?rider_id=${rider_id}`;


    if (selectedOption === "Today") {

     
      InsertAPIURL += `&getBy=day&year=${year}&month=${month}&day=${day}`;

    } 
    else if (selectedOption === "Weekly") {
      // const dateString = new Date()
      // const date = moment(dateString);
      // const weekOfYear = date.week(); 
      // InsertAPIURL += `&getBy=week&year=${"year"}&week=${weekOfYear}`;
   

      InsertAPIURL += `&getBy=day&year=${year}&month=${month}&day=${day}`;
    }
    else if (selectedOption === "Monthly") {
 

      InsertAPIURL += `&getBy=month&year=${year}&month=${month}`;
    } 
    

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        // setIsLoading(false);
        if (response.status) {
          // console.log(response?.result?.total_earnings);
          
          setTotalEarning(response?.result?.total_earnings || 0);
        }
      })
      .catch(error => {
        // setIsLoading(false);
        // // toast.error(error.message);
      });
  };

  // console.log(rider_details);


useEffect(()=>{
  fetchPayments()
},[selectedOption])


  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }} >
        {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}

        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation?.openDrawer()}>
            <Icons.MenuActive width={23} />
          </TouchableOpacity>
          <Text style={styles.headerLocation} ellipsizeMode='tail' numberOfLines={1} >{userAppOpenLocation?.shortAddress}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('SearchOrder')}
            >
              <Feather name="search" size={RFPercentage(2.8)} color={Colors.Orange} />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation?.navigate('Notifications')}>
              <Icons.NotificationWithDot />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome! <Text style={styles.nameText}>{riderInfo?.name}</Text></Text>
          <View style={styles.rowView} >
            <View >
              <Text style={styles.EarningText}>My Earning</Text>
              <Text style={styles.amountText}>${totalEarning}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setShowDropDown(!showDorpDown)} style={styles.DropDownBtn} >
                <Text style={styles.DropDownBtnText} >{selectedOption}</Text>
                <Feather name="chevron-down" size={RFPercentage(2.3)} color={Colors.White} />
              </TouchableOpacity>
              {
                showDorpDown && <View style={styles.DropDownContainer} >
                  <TouchableOpacity onPress={() => handleDropDownSelect('Today')} ><Text style={styles.DropDownOptionText} >Today</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDropDownSelect('Weekly')} ><Text style={styles.DropDownOptionText}>Weekly</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDropDownSelect('Monthly')} ><Text style={styles.DropDownOptionText}>Monthly</Text></TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          sceneContainerStyle={{ backgroundColor: Colors.White }}
          // pagerStyle={{backgroundColor: 'red'}}
          swipeEnabled={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{
                backgroundColor: Colors.White,
                elevation: 4,
              }}
              tabStyle={{ alignItems: 'center', alignContent: 'center', }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? Colors.Black : '#979797',
                    fontSize: hp(1.8),
                    fontFamily: focused
                      ? Fonts.PlusJakartaSans_Bold
                      : Fonts.PlusJakartaSans_Regular,
                    width: 80,
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                  {route.title}
                </Text>
              )}
              activeColor={'#fff'}

              indicatorStyle={{
                padding: 1.5,
                alignSelf: 'center',
                backgroundColor: Colors.Orange

              }}
            />
          )}
          pressColor="white"
          // pressOpacity={0}
          activeColor={'#fff'}
          indicatorContainerStyle={{
            backgroundColor: 'transparent',
          }}
          style={{ height: hp(83.7) }}
        />


      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.White, paddingHorizontal: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerLocation: {
    color: Colors.Black,
    width: wp(60),
    fontFamily: Fonts.PlusJakartaSans_Medium,
    textAlign: "center",
    fontSize: RFPercentage(2),
    alignSelf: 'center'
  },
  welcomeText: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: '#02010E',
    fontSize: RFPercentage(2.4),
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  EarningText: {
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    color: '#02010E',
    fontSize: RFPercentage(2.2),
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  amountText: {
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    color: '#02010E',
    fontSize: RFPercentage(3.3),
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  nameText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#02010E',
    fontSize: RFPercentage(2.6),
    letterSpacing: 1,
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
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllText: {
    color: '#FF5722',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.PlusJakartaSans_Medium,
    textDecorationLine: 'underline',
  },
  container2: { flex: 1, backgroundColor: 'red', alignItems: 'flex-end' },
  DropDownBtn: {
    backgroundColor: Colors.Orange,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    borderRadius: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    width: wp(25)
  },
  DropDownBtnText: {
    color: Colors.White,
    marginRight: wp(2)
  },
  DropDownContainer: {
    backgroundColor: Colors.White,
    borderRadius: wp(3),
    borderColor: '#EBEBEB',
    borderWidth: wp(0.3),
    marginTop: hp(0.5),
    paddingBottom: wp(1),
    position: 'absolute',
    top: 40,
    zIndex: 1000,
    paddingHorizontal: wp(5),
    width: wp(25)

  },
  DropDownOptionText: {
    fontFamily: Fonts.PlusJakartaSans_Regular,
    color: Colors.grayText,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    // letterSpacing: 0.5,
    marginVertical: 4,
  }
});
