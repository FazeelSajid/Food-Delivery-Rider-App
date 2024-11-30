import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons, Images} from '../../../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ItemSeparator from '../../../../components/Separator/ItemSeparator';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import CustomStatusBar from '../../../../components/CustomStatusBar';
import api from '../../../../constants/api';
import {showAlert} from '../../../../utils/helpers';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import {useDispatch, useSelector} from 'react-redux';
import {setRiderDetails} from '../../../../redux/AuthSlice';
import Loader from '../../../../components/Loader';
import {TextInput} from 'react-native-paper';
import ProfileStatus from '../../../../components/ProgressBar/ProfileStatus';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from 'react-native-paper'; // Use any progress bar component or install react-native-paper

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  // const [rider_details, setrider_details] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {rider_id, rider_details} = useSelector(store => store.auth)

  console.log(rider_id);
  
  


  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    // Calculate profile completion based on the filled fields
    const requiredFields = [
      'name',
      'photo',
      'cnic',
      'address',
      'dob',
      'gender',
      'license_front_image',
      'license_back_image',
      'vehicle_ownership',
      'id_card_front_image',
      'id_card_back_image',
      'vechile_registration_no',
      'vehicle_model',
      'vehicle_name',
      'longitude',
      'latitude',
      'phone'
    ];

    let filledFields = 0;
    requiredFields.forEach(field => {
      if (rider_details[field]) filledFields += 1;
    });

    const completionPercentage = (filledFields / requiredFields.length) * 100;
    setCompletion(completionPercentage);
  }, [rider_details]);

  const getData = async () => {
    console.log('rider_id  :   ,', rider_id);
    fetch(api.get_rider_details_by_id + rider_id)
      .then(response => response.json())
      .then(response => {
        console.log({response});
        
        if (response?.error == false) {
          // setrider_details(response?.result);
          dispatch(setRiderDetails(response?.result));
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        showAlert('Something went wrong');
      })
      .finally(() => setIsRefreshing(false), setLoading(false));
  };
  
  
  console.log(rider_details?.address);
  

  const onRefresh = async () => {
    // setIsRefreshing(true);
    // getData();
  };

  useEffect(() => {
    // setLoading(true);
    // getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // getData();
    }, []),
  );

  return (
    <ScrollView
      style={{backgroundColor: Colors.White, flex: 1}}>
      <Loader loading={loading} />
      <StatusBar
        translucent={false}
        backgroundColor={Colors.Orange}
        barStyle={'light-content'}
      />

      {/* <View style={{alignSelf: 'center'}}>
        <Text style={{marginTop: 15, color: '#000', fontWeight: '500'}}>
          {' '}
          Dummy initial value{' '}
        </Text>
        <TextInput
          mode="outlined"
          label="Add Banner link"
          value="dummy value"
          onChangeText={text => setAddBannerLink(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{
            marginTop: '5%',
            width: 300,
            backgroundColor: 'white',
            fontSize: wp(4),
            paddingLeft: '2%',
            borderRadius: 10,
            marginVertical: 20,
          }} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          // onFocus={handleFocusAddBanner}
          // onBlur={handleBlurAddBanner}
        />
        <Text style={{marginTop: 15, color: '#000', fontWeight: '500'}}>
          Placeholder
        </Text>
        <TextInput
          mode="outlined"
          label="dummy placeholder"
          value=""
          onChangeText={text => setAddBannerLink(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{
            marginTop: '5%',
            width: 300,
            backgroundColor: 'white',
            fontSize: wp(4),
            paddingLeft: '2%',
            borderRadius: 10,
            marginVertical: 20,
          }} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          // onFocus={handleFocusAddBanner}
          // onBlur={handleBlurAddBanner}
        />

        <Text style={{marginTop: 15, color: '#000', fontWeight: '500'}}>
          When user type
        </Text>
        <TextInput
          mode="outlined"
          label="Add Banner link"
          value=""
          onChangeText={text => setAddBannerLink(text)}
          //multiline={true} // Enable multiline input
          //numberOfLines={3} // Set the initial number of lines
          style={{
            marginTop: '5%',
            width: 300,
            backgroundColor: 'white',
            fontSize: wp(4),
            paddingLeft: '2%',
            borderRadius: 10,
            marginVertical: 20,
          }} // Adjust the height as needed
          outlineColor="#0000001F"
          placeholderTextColor="#646464"
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          // onFocus={handleFocusAddBanner}
          // onBlur={handleBlurAddBanner}
        />
      </View> */}

      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Icons.Menu />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Icons.Edit width={wp(13)} height={hp(5)} />
        </TouchableOpacity>

      </View>
      <View style={styles.userContainer}>
        <Avatar.Image
          // source={Images.user7}
          source={{uri: rider_details?.photo}}
          size={wp(20)}
          style={{
            backgroundColor: Colors.Orange,
          }}
        />
        <Text style={styles.nameText}>{rider_details?.name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Email Address</Text>
            <Text style={styles.description}> {rider_details?.email} </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Phone Number</Text>
            <Text style={styles.description}>{rider_details?.phone}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Date of Birth</Text>
            <Text style={styles.description}>{moment(rider_details?.dob).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Gender</Text>
            <Text style={styles.description}>{rider_details?.gender}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>CNIC</Text>
            <Text style={styles.description}>{rider_details?.cnic}</Text>
          </View>
          {/* <View style={styles.rowView}>
            <Text style={styles.heading1}>Location</Text>
            <Text style={styles.description}>{rider_details?.location}</Text>
          </View> */}
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Documents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ScrollView}>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardFront}
                source={{uri:rider_details?.id_card_front_image}}
                style={styles.documentImage}
              />
            </View>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardBack}
                source={{uri:rider_details?.id_card_back_image}}
                style={styles.documentImage}
              />
            </View>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.drivingLicense}
                source={{uri:rider_details?.license_front_image}}
                style={styles.documentImage}
              />
            </View>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.drivingLicense}
                source={{uri:rider_details?.license_back_image}}
                style={styles.documentImage}
              />
            </View>
          </ScrollView>
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Vehicle Information</Text>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle name</Text>
            <Text style={styles.description}>{rider_details?.vehicle_name}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle model</Text>
            <Text style={styles.description}>{rider_details?.vehicle_model}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle ownership</Text>
            <Text style={styles.description}>
              {rider_details?.vehicle_ownership}
            </Text>
          </View>
        </View>
        <View style={styles.Pcontainer}>
      <View style={styles.Pheader}>
        <Text style={styles.Ptitle}>Profile Status</Text>
       <TouchableOpacity onPress={()=> navigation.navigate('UpdateProfile')} >
       <Feather
                name={'chevron-right'}
                size={25}
                color={Colors.grayText}
              />
       </TouchableOpacity>
      </View>
      <ProgressBar progress={completion / 100} color={Colors.Orange} style={styles.progressBar} />
      <Text style={styles.percentage}>{Math.round(completion)}%</Text>
    </View>
  
        {/* <ProfileStatus profile={rider_details} /> */}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerView: {
    height: hp(15),
    backgroundColor: Colors.Orange,
    padding: 20,
    paddingLeft: 30,
    flexDirection :'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  userContainer: {
    alignSelf: 'center',
    marginTop: -hp(5.2),
    alignItems: 'center',
  },
  contentContainer: {paddingHorizontal: 23},
  nameText: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
    letterSpacing: 0.7,
    marginTop: 4,
  },
  section: {
    marginVertical: 15,
  },
  ScrollView: {
    flexDirection: 'row',
    marginVertical: 6.5,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6.5,
  },
  heading1: {
    color: '#191A26',
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: RFPercentage(1.72),
  },
  description: {
    color: '#808D9E',
    fontFamily: Fonts.Inter_Regular,
    fontSize: RFPercentage(1.5),
  },
  heading: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2),
    marginBottom: 10,
  },
  documentContainer: {
    // borderWidth: 1,
    borderRadius: 10,
    width: wp(28),
    height: hp(8.5),
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: wp(2)
  },
  documentImage: {
    height: '100%',
    width: '97%',
    resizeMode: 'cover',
  },
  Pcontainer: {
    padding: 16,
  },
  Pheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  Ptitle: {
    fontSize:  RFPercentage(2),
    fontWeight: 'bold',
    color: Colors.Black,
  },
  percentage: {
    fontSize: RFPercentage(2),
    color: Colors.grayText,
    marginTop: hp(1)
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});
