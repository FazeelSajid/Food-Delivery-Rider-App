import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../components/Header/StackHeader';
import {Colors, Fonts, Icons, Images} from '../../constants';
import CInput from '../../components/TextInput/CInput';
import CButton from '../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheetSuccess from '../../components/BottomSheet/RBSheetSuccess';
import {Avatar} from 'react-native-paper';
import {
  chooseImageFromCamera,
  showAlert,
  uploadImage,
} from '../../utils/helpers';
import moment from 'moment';
import {RFPercentage} from 'react-native-responsive-fontsize';
import api from '../../constants/api';
import Loader from '../../components/Loader';

const RegistrationDocuments = ({navigation, route}) => {
  const ref_RBSheet = useRef();

  const [loading, setLoading] = useState(false);
  const [frontIDCard, setFrontIDCard] = useState(null);
  const [backIDCard, setBackIDCard] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const [file, setFile] = useState(null);

  const handleUploadImage = async type => {
    chooseImageFromCamera()
      .then(res => {
        if (res) {
          if (type == 'front') {
            setFrontIDCard(res);
          } else if (type == 'back') {
            setBackIDCard(res);
          } else {
            setDrivingLicense(res);
          }
        }
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };
  const onDatePick = (event, selectedDate) => {
    console.log('event  :   ', event);
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setDOB(selectedDate);
    }
  };

  const handleUploadFrontIDCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = {
          uri: frontIDCard?.path,
          name: frontIDCard?.name,
          type: frontIDCard?.mime,
        };
        let filePath = await uploadImage(image);
        if (filePath) {
          resolve(filePath);
        } else {
          resolve('');
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };
  const handleUploadBackIDCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = {
          uri: backIDCard?.path,
          name: backIDCard?.name,
          type: backIDCard?.mime,
        };
        let filePath = await uploadImage(image);
        if (filePath) {
          resolve(filePath);
        } else {
          resolve('');
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };
  const handleUploadDrivingLicense = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = {
          uri: drivingLicense?.path,
          name: drivingLicense?.name,
          type: drivingLicense?.mime,
        };
        let filePath = await uploadImage(image);
        if (filePath) {
          resolve(filePath);
        } else {
          resolve('');
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };

  const clearFields = () => {
    setFrontIDCard(null);
    setBackIDCard(null);
    setDrivingLicense(null);
  };

  const validate = () => {
    if (frontIDCard == null) {
      showAlert('Please Upload Font ID Card image');
      return false;
    } else if (backIDCard == null) {
      showAlert('Please Upload Back ID Card image');
      return false;
    } else if (drivingLicense == null) {
      showAlert('Please Upload Driving License image');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      let {
        country,
        photo,
        cnic,
        address,
        dob,
        gender,
        email,
        name,
        location,
        phone,
        vehicle_ownership,
        vehicle_model,
        vehicle_name,
      } = route.params;

      let id_card_front_image = await handleUploadFrontIDCard();
      let id_card_back_image = await handleUploadBackIDCard();
      let driving_license_image = await handleUploadDrivingLicense();
      let data = {
        country: country,
        photo: photo,
        cnic: cnic,
        address: address,
        dob: dob,
        gender: gender,
        driver_license: driving_license_image,
        id_card_front_image: id_card_front_image,
        id_card_back_image: id_card_back_image,
        vehicle_model: vehicle_model,
        vehicle_name: vehicle_name,
        vehicle_ownership: vehicle_ownership,
        email: email,
        name: name,
        location: location,
        phone: phone,
      };

      console.log('data  passed to api: ', data);

      fetch(api.create_rider_request, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log('response  :  ', response);
          if (response?.status == false) {
            showAlert(response?.message);
          } else {
            // showAlert(response.message, 'green');
            ref_RBSheet?.current?.open();
            clearFields();
          }
        })
        .catch(err => {
          console.log('Error in create restaurant api :  ', err);
          showAlert('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Registration Request'} />

        <View style={{flex: 1, height: hp(90), paddingBottom: 18}}>
          <Text
            style={{
              marginLeft: 20,
              color: '#0A212B',
              fontFamily: Fonts.PlusJakartaSans_Medium,
              fontSize: RFPercentage(2),
              letterSpacing: 0.6,
              marginBottom: 20,
              marginTop: -10,
            }}>
            Documents
          </Text>
          <TouchableOpacity
            onPress={() => handleUploadImage('front')}
            style={styles.fileContainer}>
            {frontIDCard ? (
              <Image source={{uri: frontIDCard?.path}} style={styles.image} />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Front ID card Image</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUploadImage('back')}
            style={styles.fileContainer}>
            {backIDCard ? (
              <Image source={{uri: backIDCard?.path}} style={styles.image} />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Back ID card Image</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUploadImage('driving')}
            style={styles.fileContainer}>
            {drivingLicense ? (
              <Image
                source={{uri: drivingLicense?.path}}
                style={styles.image}
              />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Driving License</Text>
              </>
            )}
          </TouchableOpacity>
          <CButton
            title="Continue"
            marginTop={15}
            // onPress={() => ref_RBSheet?.current?.open()}
            onPress={() => handleSubmit()}
          />
        </View>
      </ScrollView>
      <RBSheetSuccess
        refRBSheet={ref_RBSheet}
        title={'Your request for registration has been sent to Admin'}
        textColor={'#68686E'}
        btnText={'OK'}
        onPress={() => {
          ref_RBSheet?.current?.close();
          navigation.replace('SignIn');
        }}
      />
    </View>
  );
};

export default RegistrationDocuments;

const styles = StyleSheet.create({
  description: {
    color: '#979797',
    fontFamily: Fonts.Inter_Regular,
    marginVertical: 10,
  },
  fileContainer: {
    width: wp(90),
    // height: hp(23),
    flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 35,
    marginBottom: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
