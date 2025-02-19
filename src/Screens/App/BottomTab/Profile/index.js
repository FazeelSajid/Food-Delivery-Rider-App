import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Fonts, Icons, Images} from '../../../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ItemSeparator from '../../../../components/Separator/ItemSeparator';
import api from '../../../../constants/api';
import {showAlert} from '../../../../utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setRiderDetails} from '../../../../redux/AuthSlice';
import Loader from '../../../../components/Loader';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from 'react-native-paper'; // Use any progress bar component or install react-native-paper

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {rider_id, rider_details, Colors} = useSelector(store => store.auth)

  
  


  const [completion, setCompletion] = useState(0);

  useEffect(() => {
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
          dispatch(setRiderDetails(response?.result));
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        showAlert('Something went wrong');
      })
      .finally(() =>setLoading(false));
  };


  const styles = StyleSheet.create({
    headerView: {
      height: hp(15),
      backgroundColor: Colors.primary_color,
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
      color: Colors.primary_color,
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
      color: Colors.primary_text,
      fontFamily: Fonts.Inter_SemiBold,
      fontSize: RFPercentage(1.72),
    },
    description: {
      color: Colors.secondary_text,
      fontFamily: Fonts.Inter_Regular,
      fontSize: RFPercentage(1.5),
    },
    heading: {
      color: Colors.primary_color,
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
      color: Colors.primary_text,
    },
    percentage: {
      fontSize: RFPercentage(2),
      color: Colors.secondary_text,
      marginTop: hp(1)
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
  });
  
  return (
    <ScrollView
      style={{backgroundColor: Colors.secondary_color, flex: 1}}>
      <Loader loading={loading} />
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primary_color}
        barStyle={'light-content'}
      />

     

      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Icons.Menu   />
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
            backgroundColor: Colors.primary_color,
          }}
        />
        <Text style={styles.nameText}>{rider_details?.name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.section}>
          {rider_details?.email &&  <View style={styles.rowView}>
            <Text style={styles.heading1}>Email Address</Text>
            <Text style={styles.description}> {rider_details?.email} </Text>
          </View> }
         
          {
            rider_details?.phone && <View style={styles.rowView}>
            <Text style={styles.heading1}>Phone Number</Text>
            <Text style={styles.description}>{rider_details?.phone}</Text>
          </View>
          }

          {
            rider_details?.dob && <View style={styles.rowView}>
            <Text style={styles.heading1}>Date of Birth</Text>
            <Text style={styles.description}>{moment(rider_details?.dob).format('DD/MM/YYYY')}</Text>
          </View>
          }
          {
            rider_details?.gender && <View style={styles.rowView}>
            <Text style={styles.heading1}>Gender</Text>
            <Text style={styles.description}>{rider_details?.gender}</Text>
          </View>
          }
          {
            rider_details?.cnic && <View style={styles.rowView}>
            <Text style={styles.heading1}>CNIC</Text>
            <Text style={styles.description}>{rider_details?.cnic}</Text>
          </View>
          }
          
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Documents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ScrollView}>
            {rider_details?.id_card_front_image && <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardFront}
                source={{uri:rider_details?.id_card_front_image}}
                style={styles.documentImage}
              />
            </View>}
           {rider_details?.id_card_back_image && <View style={styles.documentContainer}>
              <Image
                // source={Images.idCardBack}
                source={{uri:rider_details?.id_card_back_image}}
                style={styles.documentImage}
              />
            </View>}
            {rider_details?.license_front_image&& <View style={styles.documentContainer}>
              <Image
                source={{uri:rider_details?.license_front_image}}
                style={styles.documentImage}
              />
            </View>}
            {rider_details?.license_back_image && <View style={styles.documentContainer}>
              <Image
                // source={Images.drivingLicense}
                source={{uri:rider_details?.license_back_image}}
                style={styles.documentImage}
              />
            </View>}
          </ScrollView>
        </View>
        <ItemSeparator style={{marginVertical: 0}} />
        <View style={styles.section}>
          <Text style={styles.heading}>Vehicle Information</Text>
        {rider_details?.vehicle_name &&  <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle name</Text>
            <Text style={styles.description}>{rider_details?.vehicle_name}</Text>
          </View>}
        {rider_details?.vehicle_model &&  <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle model</Text>
            <Text style={styles.description}>{rider_details?.vehicle_model}</Text>
          </View>}
       { rider_details?.vehicle_ownership &&  <View style={styles.rowView}>
            <Text style={styles.heading1}>Vehicle ownership</Text>
            <Text style={styles.description}>
              {rider_details?.vehicle_ownership}
            </Text>
          </View>}
        </View>
        <View style={styles.Pcontainer}>
      <View style={styles.Pheader}>
        <Text style={styles.Ptitle}>Profile Status</Text>
       <TouchableOpacity onPress={()=> navigation.navigate('UpdateProfile')} >
       <Feather
                name={'chevron-right'}
                size={25}
                color={Colors.secondary_text}
              />
       </TouchableOpacity>
      </View>
      <ProgressBar progress={completion / 100} color={Colors.primary_color} style={styles.progressBar} />
      <Text style={styles.percentage}>{Math.round(completion)}%</Text>
    </View>
  
        {/* <ProfileStatus profile={rider_details} /> */}
      </View>
    </ScrollView>
  );
};

export default Profile;


