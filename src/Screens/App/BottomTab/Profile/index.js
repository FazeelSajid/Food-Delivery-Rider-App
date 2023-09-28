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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAlert} from '../../../../utils/helpers';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import {useDispatch} from 'react-redux';
import {setRiderDetails} from '../../../../redux/AuthSlice';
import Loader from '../../../../components/Loader';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [riderInfo, setRiderInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = async () => {
    let rider_id = await AsyncStorage.getItem('rider_id');
    console.log('rider_id  :   ,', rider_id);
    fetch(api.get_rider_details_by_id + rider_id)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          setRiderInfo(response?.result);
          // dispatch(setRiderDetails(response?.result));
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

  const onRefresh = async () => {
    setIsRefreshing(true);
    getData();
  };
  useEffect(() => {
    setLoading(true);
    // getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => onRefresh()}
          colors={[Colors.Orange]}
        />
      }
      style={{backgroundColor: Colors.White, flex: 1}}>
      <Loader loading={loading} />
      <StatusBar
        translucent={false}
        backgroundColor={Colors.Orange}
        barStyle={'light-content'}
      />
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Icons.Menu />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Avatar.Image
          // source={Images.user7}
          source={{uri: BASE_URL_IMAGE + riderInfo?.photo}}
          size={wp(20)}
          style={{
            backgroundColor: Colors.Orange,
          }}
        />
        <Text style={styles.nameText}>{riderInfo?.name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Email Address</Text>
            <Text style={styles.description}> {riderInfo?.email} </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Phone Number</Text>
            <Text style={styles.description}>{riderInfo?.phone}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Date of Birth</Text>
            <Text style={styles.description}>{riderInfo?.dob}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Gender</Text>
            <Text style={styles.description}>{riderInfo?.gender}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>CNIC</Text>
            <Text style={styles.description}>{riderInfo?.cnic}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Location</Text>
            <Text style={styles.description}>{riderInfo?.location}</Text>
          </View>
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Documents</Text>
          <View style={styles.rowView}>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardFront}
                source={{uri: BASE_URL_IMAGE + riderInfo?.id_card_front_image}}
                style={styles.documentImage}
              />
            </View>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardBack}
                source={{uri: BASE_URL_IMAGE + riderInfo?.id_card_back_image}}
                style={styles.documentImage}
              />
            </View>
            <View style={styles.documentContainer}>
              <Image
                // source={Images.drivingLicense}
                source={{uri: BASE_URL_IMAGE + riderInfo?.driver_license}}
                style={styles.documentImage}
              />
            </View>
          </View>
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Vehicle Information</Text>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle name</Text>
            <Text style={styles.description}>{riderInfo?.vehicle_name}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle model</Text>
            <Text style={styles.description}>{riderInfo?.vehicle_model}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle ownership</Text>
            <Text style={styles.description}>
              {riderInfo?.vehicle_ownership}
            </Text>
          </View>
        </View>
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
  },
  documentImage: {
    height: '100%',
    width: '97%',
    resizeMode: 'cover',
  },
});
