import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import CInput from '../../../../components/TextInput/CInput';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Avatar} from 'react-native-paper';
import {
  chooseImageFromCamera,
  showAlert,
  uploadImage,
} from '../../../../utils/helpers';
import moment from 'moment';
import {RFPercentage} from 'react-native-responsive-fontsize';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../../components/Loader';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import CameraBottomSheet from '../../../../components/BottomSheet/CameraBottomSheet';

const UpdateProfile = ({navigation, route}) => {
  const cameraSheet_ref = useRef();

  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 42;
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    image: '',
    username: '',
    phoneNumber: '',
    CNIC: '',
    location: '',
    dob: '',
    gender: '',
    //
    email: '',
    country: '',
    address: '',
  });
  const [DOB, setDOB] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (userInfo?.image?.length == 0) {
      showAlert('Please Upload Profile Image');
      return false;
    }
    //  else if (userInfo?.email?.length == 0) {
    //   showAlert('Please Enter email address');
    //   return false;
    // }
    else if (userInfo?.username?.length == 0) {
      showAlert('Please Enter Username');
      return false;
    } else if (userInfo?.phoneNumber?.length == 0) {
      showAlert('Please Enter Phone Number');
      return false;
    } else if (userInfo?.CNIC?.length == 0) {
      showAlert('Please Enter CNIC');
      return false;
    }
    // else if (country.length == 0) {
    //   showAlert('Please Enter Country');
    //   return false;
    // }
    //  else if (address.length == 0) {
    //   showAlert('Please Enter Address');
    //   return false;
    // }
    else if (userInfo?.location?.length == 0) {
      showAlert('Please Enter Location');
      return false;
    } else if (userInfo?.dob?.length == 0) {
      showAlert('Please Select Date Of Birth');
      return false;
    } else if (userInfo?.gender?.length == 0) {
      showAlert('Please Enter Gender');
      return false;
    } else {
      return true;
    }
  };

  const handleUploadProfileImage = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInfo?.image?.path?.startsWith('file://')) {
          let image = {
            uri: userInfo?.image?.path,
            name: userInfo?.image?.name,
            type: userInfo?.image?.mime,
          };
          let filePath = await uploadImage(image);

          if (filePath) {
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(userInfo?.image);
        }
      } catch (error) {
        console.log('error handleUploadProfileImage :  ', error);
        resolve('');
      }
    });
  };

  const handleContinue = async () => {
    if (validate()) {
      setLoading(true);
      let image_url = await handleUploadProfileImage();
      navigation?.navigate('UpdateDocuments', {
        country: userInfo?.country,
        photo: image_url,
        cnic: userInfo?.CNIC,
        address: userInfo?.address,
        dob: userInfo?.dob ? moment(userInfo?.dob).format('DD/MM/YYYY') : '',
        gender: userInfo?.gender,
        email: userInfo?.email,
        name: userInfo?.username,
        location: userInfo?.location,
        phone: userInfo?.phoneNumber,
      });
      setLoading(false);
    }
  };

  const handleUploadImage = async item => {
    chooseImageFromCamera()
      .then(res => {
        if (res) {
          setUserInfo({...userInfo, image: res});
        }
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  const onDatePick = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setUserInfo({...userInfo, dob: selectedDate});
    }
  };

  const getData = async () => {
    setIsFetching(true);
    let rider_id = await AsyncStorage.getItem('rider_id');
    fetch(api.get_rider_details_by_id + rider_id)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          let riderDetails = response?.result;
          setUserInfo({
            image: riderDetails?.photo,
            username: riderDetails?.name,
            phoneNumber: riderDetails?.phone,
            CNIC: riderDetails?.cnic,
            location: riderDetails?.location,
            dob: moment(riderDetails?.dob, 'DD-MM-YYYY').toDate(),
            gender: riderDetails?.gender,
            //
            email: riderDetails?.email,
            country: riderDetails?.country,
            address: riderDetails?.address,
          });
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={isFetching} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Profile'} />

        <View style={{flex: 1}}>
          <View style={styles.profileImage}>
            {userInfo.image ? (
              <Avatar.Image
                // source={{uri: userInfo.image?.path}}
                source={{
                  uri: userInfo.image?.path?.startsWith('file://')
                    ? userInfo.image?.path
                    : BASE_URL_IMAGE + userInfo.image,
                }}
                size={wp(22)}
              />
            ) : (
              // <Icons.Profile1 />
              <Avatar.Image source={Images.user7} size={wp(22)} />
            )}
            <TouchableOpacity
              style={{position: 'absolute', bottom: 0, right: 0}}
              // onPress={() => handleUploadImage()}
              onPress={() => cameraSheet_ref?.current?.open()}>
              <Icons.EditSquare />
            </TouchableOpacity>
          </View>

          <CInput
            heading={'Username'}
            headingStyle={styles.headingStyle}
            // placeholder="User Name here"
            placeholder=""
            value={userInfo.username}
            onChangeText={text => setUserInfo({...userInfo, username: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Phone number'}
            headingStyle={styles.headingStyle}
            // placeholder="0000 0000000"
            placeholder=""
            keyboardType="numeric"
            value={userInfo.phoneNumber}
            onChangeText={text => setUserInfo({...userInfo, phoneNumber: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'CNIC Number'}
            headingStyle={styles.headingStyle}
            // placeholder="0000-0000000-0"
            placeholder=""
            keyboardType="numeric"
            value={userInfo.CNIC}
            onChangeText={text => setUserInfo({...userInfo, CNIC: text})}
            height={textInput_HEIGHT}
          />

          <CInput
            heading={'Location'}
            headingStyle={styles.headingStyle}
            // placeholder="lorem ipsum dolo sit"
            placeholder=""
            value={userInfo.location}
            onChangeText={text => setUserInfo({...userInfo, location: text})}
            height={textInput_HEIGHT}
          />

          <CInput
            heading={'Date of Birth'}
            headingStyle={styles.headingStyle}
            // placeholder="00/00/0000"
            placeholder=""
            value={
              userInfo.dob ? moment(userInfo.dob).format('DD/MM/YYYY') : ''
            }
            editable={false}
            disabled={false}
            onPress={() => setShowDatePicker(!showDatePicker)}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Gender'}
            headingStyle={styles.headingStyle}
            // placeholder="Male"
            placeholder=""
            value={userInfo.gender}
            onChangeText={text => setUserInfo({...userInfo, gender: text})}
            height={textInput_HEIGHT}
          />
          <CButton
            title="Continue"
            marginTop={10}
            loading={loading}
            onPress={() => handleContinue()}
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              // value={DOB || new Date()}
              value={userInfo.dob || new Date()}
              mode={'date'}
              display="default"
              locale="es-ES"
              themeVariant="light"
              onChange={onDatePick}
              maximumDate={new Date()}
              style={{
                shadowColor: '#fff',
                shadowRadius: 0,
                shadowOpacity: 1,
                shadowOffset: {height: 0, width: 0},
                color: '#1669F',
                textColor: '#1669F',
              }}
            />
          )}
        </View>
      </ScrollView>

      <CameraBottomSheet
        refRBSheet={cameraSheet_ref}
        onCameraPick={img => {
          img && setUserInfo({...userInfo, image: img});
        }}
        onGalleryPick={img => {
          img && setUserInfo({...userInfo, image: img});
        }}
      />
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 1,
    borderColor: Colors.Border,
    width: wp(22),
    height: wp(22),
    borderRadius: wp(22) / 2,
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingStyle: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    marginBottom: 10,
    marginTop: -5,
    fontSize: RFPercentage(1.7),
    letterSpacing: 0.5,
  },
});
