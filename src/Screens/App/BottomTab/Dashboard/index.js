import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PopUp from '../../../../components/Popup/PopUp';
import { Fonts, Icons } from '../../../../constants';
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
import CButton from '../../../../components/Buttons/CButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';



const Dashboard = ({ navigation, route }) => {
  const { rider_details, userAppOpenLocation, totalWalletAmount, rider_id, contacts, Colors } = useSelector(store => store.auth)
  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
  const [riderInfo, setRiderInfo] = useState(null);
  const [showDorpDown, setShowDropDown] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Daily')
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [totalEarning, setTotalEarning] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderScene = SceneMap({
    first: Requests,
    second: InProgress,
    third: History,
  });

  const [routes] = React.useState([
    { key: 'first', title: 'Requests' },
    { key: 'second', title: 'In Progress' },
    { key: 'third', title: 'History' },
  ]);

  const handleDropDownSelect = (option) => {
    setSelectedOption(option)
    setShowDropDown(false)
    setShowModal(true)
  }



  useEffect(() => {
    setRiderInfo(rider_details)
    // func()
  }, []);

  const fetchPayments = async () => {

    const date = moment(selectedDate);

    // Extract year, month, day
    const startOfMonth = date.clone().startOf('month'); // Get the start of the month
    const weekOfMonth = date.diff(startOfMonth, 'weeks') + 1;

    // Extract year, month, and day
    const year = date.year();
    const month = date.month() + 1; // Months are zero-indexed, so add 1
    const day = date.date();
    // setIsLoading(true);
    setShowModal(false)

    let InsertAPIURL = `${BASE_URL}wallet/ViewAllPaymentsAndEarning_rider?rider_id=${rider_id}`;
 


    if (selectedOption === "Daily") {


      InsertAPIURL += `&getBy=day&year=${year}&month=${month}&day=${day}`;
      console.log(InsertAPIURL);


    }
    else if (selectedOption === "Weekly") {


      InsertAPIURL += `&getBy=week&year=${year}&week=${weekOfMonth}&month=${month}`;
      console.log(InsertAPIURL)


    }
    else if (selectedOption === "Monthly") {


      InsertAPIURL += `&getBy=month&year=${year}&month=${month}`;

      console.log(InsertAPIURL);

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
          console.log(response);

          setTotalEarning(response?.result?.total_earnings || 0);
        }
      })
      .finally(()=>{
       
      })
      .catch(error => {
        // setIsLoading(false);
        // // toast.error(error.message);
      });
      
      
  };

  useEffect(() => {
    fetchPayments()
  }, [])

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.secondary_color, paddingHorizontal: 20 },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    headerLocation: {
      color: Colors.primary_text,
      width: wp(60),
      fontFamily: Fonts.PlusJakartaSans_Medium,
      textAlign: "center",
      fontSize: RFPercentage(2),
      alignSelf: 'center'
    },
    welcomeText: {
      fontFamily: Fonts.PlusJakartaSans_Medium,
      color: Colors.primary_text,
      fontSize: RFPercentage(2.4),
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    EarningText: {
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      color: Colors.primary_text,
      fontSize: RFPercentage(2.2),
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    amountText: {
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      color: Colors.primary_text,
      fontSize: RFPercentage(3.3),
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    nameText: {
      fontFamily: Fonts.PlusJakartaSans_Bold,
      color: Colors.primary_text,
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
      color: Colors.primary_text,
      fontFamily: Fonts.PlusJakartaSans_Bold,
      fontSize: RFPercentage(1.9),
      letterSpacing: 0.45,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: 'green'
    },
    DropDownBtn: {
      backgroundColor: Colors.button.primary_button,
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.2),
      borderRadius: wp(10),
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 6,
      width: wp(25)
    },
    DropDownBtnText: {
      color: Colors.button.primary_button_text,
      marginRight: wp(2)
    },
    DropDownContainer: {
      backgroundColor: Colors.secondary_color,
      borderRadius: wp(3),
      borderColor: Colors.secondary_text,
      borderWidth: wp(0.1),
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
      color: Colors.secondary_text,
      fontSize: RFPercentage(1.8),
      textAlign: 'center',
      marginVertical: 4,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black for the backdrop
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContentContainer: {
      backgroundColor: Colors.White,
      padding: 20, // Adjust padding as needed
      borderRadius: 10, // Optional for rounded corners
      width: '80%', // Adjust width as needed
      // alignItems: 'center',
    },
  
    filterHeading: { color: Colors.primary_text, fontFamily: Fonts.PlusJakartaSans_SemiBold, fontSize: RFPercentage(2.5), textAlign: 'center' }
  });



  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }} >
        {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}

        <StatusBar
          translucent={false}
          backgroundColor={Colors.secondary_color}
          barStyle={'dark-content'}
        />

        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation?.openDrawer()}>
            <Feather name="menu" size={RFPercentage(3.2)} color={Colors.primary_color} />
          </TouchableOpacity>
          <Text style={styles.headerLocation} ellipsizeMode='tail' numberOfLines={1} >{userAppOpenLocation?.shortAddress}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('SearchOrder')}
            >
              <Feather name="search" size={RFPercentage(2.8)} color={Colors.primary_color} />

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
                <Feather name="chevron-down" size={RFPercentage(2.3)} color={Colors.button.primary_button_text} />
              </TouchableOpacity>
              {
                showDorpDown && <View style={styles.DropDownContainer} >
                  <TouchableOpacity onPress={() => handleDropDownSelect('Daily')} ><Text style={styles.DropDownOptionText} >Daily</Text></TouchableOpacity>
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
          // sceneContainerStyle={{ backgroundColor: 'green' }}
          // pagerStyle={{backgroundColor: 'red'}}
          swipeEnabled={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{
                backgroundColor: Colors.secondary_color,
                elevation: 4,
              }}
              tabStyle={{ alignItems: 'center', alignContent: 'center', }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? Colors.primary_text : Colors.secondary_text,
                    fontSize: RFPercentage(1.5),
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
              // activeColor={'green'}

              indicatorStyle={{
                padding: 1.5,
                alignSelf: 'center',
                backgroundColor: Colors.primary_color

              }}
            />
          )}
          // pressColor="white"
          // pressOpacity={0}
          // activeColor={'green'}
          indicatorContainerStyle={{
            backgroundColor: 'transparent',
          }}
          style={{ height: hp(83.7) }}
        />


        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
              <View style={styles.rowView}>
                {/* <Text style={styles.filterHeading}>Filter</Text> */}
                <TouchableOpacity onPress={() => setShowModal(false)} >
                  <Feather name="x" size={RFPercentage(2.8)} color={Colors.button.icon} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }} >
                {/* <Text style={[styles.filterHeading, { fontSize: RFPercentage(2) }]}>Year</Text> */}
                {/* <DateTimePicker
                testID="dateTimePicker"
                value={ new Date()}
                mode={'date'}
                display="default"
                // locale="es-ES"
                themeVariant="light"
                onChange={setSelectedDate}
                maximumDate={new Date()}
                positiveButton={{label: 'Apply', textColor: Colors.primary_color}}

                style={{
                  shadowColor: '#fff',
                  shadowRadius: 0,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                  color: '#1669F',
                  textColor: '#1669F',
                }}
              /> */}

                <DatePicker mode="date" theme='light' date={selectedDate} onDateChange={setSelectedDate} minimumDate={new Date("2023-01-01")} dividerColor={Colors.primary_color} />

                {/* <MonthPicker
          onChange={setSelectedDate}
          value={new Date()}
          autoTheme={false}
        /> */}

                <CButton title='Apply' width={wp(50)} height={hp(5)} onPress={fetchPayments}   />

              </View>


            </View>
          </View>
        </Modal>



      </View>
    </View>
  );
};

export default Dashboard;


