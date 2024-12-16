import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import {Colors, Images, Fonts, Icons} from '../../../../constants';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  chooseImageFromCamera,
  showAlert,
  uploadImage,
} from '../../../../utils/helpers';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../../constants/api';
import Loader from '../../../../components/Loader';
import {BASE_URL_IMAGE} from '../../../../utils/globalVariables';
import CameraBottomSheet from '../../../../components/BottomSheet/CameraBottomSheet';

const UpdateDocuments = ({navigation, route}) => {
  const cameraSheet_ref = useRef();

  const [frontIDCard, setFrontIDCard] = useState(null);
  const [backIDCard, setBackIDCard] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedImageType, setSelectedImageType] = useState('');

  const handleUploadFrontIDCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (frontIDCard?.path?.startsWith('file://')) {
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
        } else {
          resolve(frontIDCard);
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
        if (backIDCard?.path?.startsWith('file://')) {
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
        } else {
          resolve(backIDCard);
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
        if (drivingLicense?.path?.startsWith('file://')) {
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
        } else {
          resolve(drivingLicense);
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };

  const handleContinue = async () => {
    // navigation.navigate('UpdateVehicleInfo')
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
    } = route.params;
    let id_card_front_image = await handleUploadFrontIDCard();
    let id_card_back_image = await handleUploadBackIDCard();
    let driving_license_image = await handleUploadDrivingLicense();
    console.log('id_card_front_image  :  ', id_card_front_image);
    navigation.navigate('UpdateVehicleInfo', {
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
      id_card_front_image,
      id_card_back_image,
      driving_license_image,
    });
    setLoading(false);
  };

  const handleUploadImage = async img => {
    console.log('image :  ', img);
    if (selectedImageType == 'front') {
      setFrontIDCard(img);
    } else if (selectedImageType == 'back') {
      setBackIDCard(img);
    } else {
      setDrivingLicense(img);
    }
    // chooseImageFromCamera()
    //   .then(res => {
    //     if (res) {
    //       if (type == 'front') {
    //         setFrontIDCard(res);
    //       } else if (type == 'back') {
    //         setBackIDCard(res);
    //       } else {
    //         setDrivingLicense(res);
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err : ', err);
    //   });
  };

  const getData = async () => {
    setIsFetching(true);
    let rider_id = await AsyncStorage.getItem('rider_id');
    console.log('rider_id  :   ,', rider_id);
    fetch(api.get_rider_details_by_id + rider_id)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          let riderDetails = response?.result;
          setFrontIDCard(riderDetails?.id_card_front_image);
          setBackIDCard(riderDetails?.id_card_back_image);
          setDrivingLicense(riderDetails?.driver_license);
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
    <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
      <Loader loading={isFetching} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 35}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Profile'} />
        {!isFetching && (
          <View
            style={{
              flex: 1,
              height: hp(90),
              paddingBottom: 28,
              marginBottom: 50,
            }}>
            <TouchableOpacity disabled={true} style={styles.fileContainer}>
              {frontIDCard ? (
                <Image
                  source={{
                    uri: frontIDCard?.path?.startsWith('file://')
                      ? frontIDCard?.path
                      : BASE_URL_IMAGE + frontIDCard,
                  }}
                  style={styles.image}
                />
              ) : (
                <>
                  {/* <Icons.UploadFile />
          <Text style={styles.description}>Front ID card Image</Text> */}
                  <Image source={Images.idCardFront} style={styles.image} />
                </>
              )}
              <CButton
                style={styles.btn}
                textStyle={styles.btnText}
                title="Change"
                width={90}
                height={32}
                // onPress={() => handleUploadImage('front')}
                onPress={() => {
                  setSelectedImageType('front');
                  cameraSheet_ref?.current?.open();
                }}
              />
            </TouchableOpacity>
            <Text style={styles.imageTitle}>Font id card image</Text>
            <TouchableOpacity disabled={true} style={styles.fileContainer}>
              {backIDCard ? (
                <Image
                  // source={{uri: backIDCard?.path}}
                  source={{
                    uri: backIDCard?.path?.startsWith('file://')
                      ? backIDCard?.path
                      : BASE_URL_IMAGE + backIDCard,
                  }}
                  style={styles.image}
                />
              ) : (
                <>
                  {/* <Icons.UploadFile />
          <Text style={styles.description}>Back ID card Image</Text> */}
                  <Image source={Images.idCardBack} style={styles.image} />
                </>
              )}
              <CButton
                style={styles.btn}
                textStyle={styles.btnText}
                title="Change"
                width={90}
                height={32}
                // onPress={() => handleUploadImage('back')}
                onPress={() => {
                  setSelectedImageType('back');
                  cameraSheet_ref?.current?.open();
                }}
              />
            </TouchableOpacity>
            <Text style={styles.imageTitle}>Back id card image</Text>
            <TouchableOpacity disabled={true} style={styles.fileContainer}>
              {drivingLicense ? (
                <Image
                  // source={{uri: drivingLicense?.path}}
                  source={{
                    uri: drivingLicense?.path?.startsWith('file://')
                      ? drivingLicense?.path
                      : BASE_URL_IMAGE + drivingLicense,
                  }}
                  style={styles.image}
                />
              ) : (
                <>
                  {/* <Icons.UploadFile />
          <Text style={styles.description}>Driving License</Text> */}
                  <Image source={Images.drivingLicense} style={styles.image} />
                </>
              )}
              <CButton
                style={styles.btn}
                textStyle={styles.btnText}
                title="Change"
                width={90}
                height={32}
                // onPress={() => handleUploadImage('driving')}
                onPress={() => {
                  setSelectedImageType('driving');
                  cameraSheet_ref?.current?.open();
                }}
              />
            </TouchableOpacity>
            <Text style={styles.imageTitle}>Driver’s License</Text>
            <CButton
              title="Continue"
              marginTop={40}
              loading={loading}
              onPress={() => handleContinue()}
            />
          </View>
        )}
      </ScrollView>
      <CameraBottomSheet
        refRBSheet={cameraSheet_ref}
        onCameraPick={img => {
          img && handleUploadImage(img);
        }}
        onGalleryPick={img => {
          img && handleUploadImage(img);
        }}
      />
    </View>
  );
};

export default UpdateDocuments;

const styles = StyleSheet.create({
  description: {
    color: '#979797',
    fontFamily: Fonts.Inter_Regular,
    marginVertical: 10,
  },
  fileContainer: {
    width: wp(90),
    height: hp(23),
    // flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 35,
    // marginBottom: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageTitle: {
    textAlign: 'center',
    color: '#191A26',
    fontFamily: Fonts.Inter_Bold,
    fontSize: RFPercentage(1.5),
    letterSpacing: 0.5,
    marginVertical: 12,
  },
  btn: {
    position: 'absolute',
    right: 5,
    top: -15,
  },
  btnText: {
    textTransform: 'capitalize',
  },
});
