import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Colors, Fonts, Icons } from '../../../../constants';

import CInput from '../../../../components/TextInput/CInput';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar } from 'react-native-paper';
import {
  showAlert,
  uploadImage,
} from '../../../../utils/helpers';

import moment from 'moment';
import Loader from '../../../../components/Loader';
import CameraBottomSheet from '../../../../components/BottomSheet/CameraBottomSheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { BASE_URL_IMAGE } from '../../../../utils/globalVariables';
import CRBSheetComponent from '../../../../components/BottomSheet/CRBSheetComponent';
import DatePicker from 'react-native-date-picker'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../constants/api';
import { setRiderDetails, setRiderId } from '../../../../redux/AuthSlice';
import PopUp from '../../../../components/Popup/PopUp';
import { useFocusEffect } from '@react-navigation/native';
import { setPopUpColor, setPopUpMesage, setShowPopUp } from '../../../../redux/MySlice';



const UpdateProfile = ({ navigation }) => {
  const cameraSheet_ref = useRef();
  const datePicker_ref = useRef();
  const dispatch = useDispatch();
  const showBtmSheet = () => {
    datePicker_ref?.current?.open()
  }
  const closeBtmSheet = () => {
    datePicker_ref?.current?.close()
  }

  const { rider_id, rider_details } = useSelector(store => store.auth)
  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)



  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 45;

  const [index, setIndex] = useState(0); //0 for other and 1 for vehicle info
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [FrontIDImage, setFrontIDImage] = useState();
  const [BackIDImage, setBackIDImage] = useState();
  const [FrontLicenseImage, setFrontLicenseImage] = useState();
  const [BackLicenseImage, setBackLicenseImage] = useState();
  const [CNIC, setCNIC] = useState();
  const [address, setAddress] = useState();
  const [DOB, setDOB] = useState();
  const [gender, setGender] = useState(rider_details ? rider_details.gender : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');


  const [vehicle, setVehicle] = useState({
    ownerName: null,
    reg:  null,
    modal:  null,
    name:  null,
  });

  useFocusEffect(
    React.useCallback(() => {
     
    }, []),
  );


  const clearData = () => {
    setProfileImage(null);
    setFrontIDImage(null);
    setBackIDImage(null);
    setFrontLicenseImage(null);
    setBackLicenseImage(null);
    setCNIC(null);
    setAddress(null);
    setDOB(null);
    setGender(null);
    setVehicle({
        ownerName: null,
        reg: null,
        modal: null,
        name: null,
    });
    setIndex(0);
};

  useEffect(()=>{
    setProfileImage(rider_details ? rider_details.photo : null)
    setFrontIDImage(rider_details ? rider_details.id_card_front_image : null)
    setBackIDImage(rider_details ? rider_details.id_card_back_image : null)
    setFrontLicenseImage(rider_details ? rider_details.license_front_image : null)
    setBackLicenseImage(rider_details ? rider_details.license_back_image : null)
    setCNIC(rider_details ? rider_details.cnic : null)
    setAddress(rider_details ? rider_details.address : null)
    setDOB(rider_details ? new Date(rider_details.dob) : null)
    setGender(rider_details ? rider_details.gender : null)
    setVehicle({
      ownerName: rider_details ? rider_details.vehicle_ownership : null,
      reg: rider_details ? rider_details.vechile_registration_no : null,
      modal: rider_details ? rider_details.vehicle_model : null,
      name: rider_details ? rider_details.vehicle_name : null,
    })
    setIndex(0)
    console.log(index);

    navigation.addListener('beforeRemove', clearData);

        // Remove listener on cleanup to prevent memory leaks
        return () => {
            navigation.removeListener('beforeRemove', clearData);
        };
    
  },[navigation])


  // console.log(rider_details, 'DOB');

  // console.log(profileImage);
  
  
  


  const handleUploadImage = async img => {
    // console.log('image :  ', img);
    if (selectedImageType == 'front') {
      setFrontIDImage(img);
    } else if (selectedImageType == 'back') {
      setBackIDImage(img);
    }
    else if (selectedImageType == 'profile') {
      setProfileImage(img)
    }
    else if (selectedImageType == 'frontLicense') {
      setFrontLicenseImage(img)
    }
    else if (selectedImageType == 'backLicense') {
      setBackLicenseImage(img)
    }

  };

  const onDatePick = (event, selectedDate) => {
    console.log('event  :   ', event);
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setDOB(selectedDate);
    }
  };

  // const handleUploadProfileImage = (img) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let image = {
  //         uri: img?.path,
  //         name: img?.name,
  //         type: img?.mime,
  //       };
  //       // console.log('image :  ', image);
  //       let filePath = await uploadImage(image);
  //       if (filePath) {
  //         resolve(filePath);
  //       } else {
  //         resolve('');
  //       }
  //     } catch (error) {
  //       console.log('error handleUploadProfileImage :  ', error);
  //       resolve('');
  //     }
  //   });
  // };



  const validate = () => {
    if (profileImage == null) {
      showAlert('Please Upload Profile Image');
      return false;
    }
    // else if (email.length == 0) {
    //   showAlert('Please Enter email address');
    //   return false;
    // } 
    else if (CNIC.length == 0) {
      showAlert('Please Enter CNIC');
      return false;
    }
    // else if (country.length == 0) {
    //   showAlert('Please Enter Country');
    //   return false;
    // } 
    else if (address.length == 0) {
      showAlert('Please Enter Address');
      return false;
    }
    else if (DOB.length == 0) {
      showAlert('Please Select Date Of Birth');
      return false;
    } else if (gender.length == 0) {
      showAlert('Please Enter Gender');
      return false;
    }
    else if (FrontIDImage == null) {
      showAlert('Please Upload Front ID Card Image');
      return false;
    }
    else if (BackIDImage == null) {
      showAlert('Please Upload Front ID Card Image');
      return false;
    }

    else {
      return true;
    }
  };

  const validate2 = () => {
    if (vehicle?.reg?.length == 0) {
      showAlert('Please Enter Registration Number');
      return false;
    } else if (vehicle?.ownerName?.length == 0) {
      showAlert('Please Enter Vehicle Model');
      return false;
    }
    else if (vehicle?.modal?.length == 0) {
      showAlert('Please Enter Vehicle Model');
      return false;
    }
    else if (vehicle?.name?.length == 0) {
      showAlert('Please Enter Vehicle Name');
      return false;
    }
    else if (FrontLicenseImage === null) {
      showAlert('Please Upload Front License Image');
      return false;
    }
    else if (BackLicenseImage === null) {
      showAlert('Please Upload Back License Image');
      return false;
    }
    else {
      return true;
    }
  };

  const handleGoNext = () => {

    if (validate()) {
      setIndex(index + 1);
    }

  };

  const handleUploadProfieImg = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (profileImage?.path?.startsWith('file://')) {
          let image = {
            uri: profileImage?.path,
            name: profileImage?.name,
            type: profileImage?.mime,
          };
          let filePath = await uploadImage(image);
          if (filePath) {
            console.log('Uploaded Profile Img' , filePath );
            
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(profileImage);
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };
  const handleUploadFrontIDCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (FrontIDImage?.path?.startsWith('file://')) {
          let image = {
            uri: FrontIDImage?.path,
            name: FrontIDImage?.name,
            type: FrontIDImage?.mime,
          };
          let filePath = await uploadImage(image);
          if (filePath) {
            console.log('Uploaded frontID Img' , filePath );
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(FrontIDImage);
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
        if (BackIDImage?.path?.startsWith('file://')) {
          let image = {
            uri: BackIDImage?.path,
            name: BackIDImage?.name,
            type: BackIDImage?.mime,
          };
          let filePath = await uploadImage(image);
          if (filePath) {
            console.log('Uploaded BackIDImg Img' , filePath );
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(BackIDImage);
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };

  const handleUploadFrontDrivingLicense = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (FrontLicenseImage?.path?.startsWith('file://')) {
          let image = {
            uri: FrontLicenseImage?.path,
            name: FrontLicenseImage?.name,
            type: FrontLicenseImage?.mime,
          };
          let filePath = await uploadImage(image);
          if (filePath) {
            console.log('Uploaded Front License Img' , filePath );
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(FrontLicenseImage);
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };
  const handleUploadBackDrivingLicense = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (BackLicenseImage?.path?.startsWith('file://')) {
          let image = {
            uri: BackLicenseImage?.path,
            name: BackLicenseImage?.name,
            type: BackLicenseImage?.mime,
          };
          let filePath = await uploadImage(image);
          if (filePath) {
            console.log('Uploaded Back License Img' , filePath );
            resolve(filePath);
          } else {
            resolve('');
          }
        } else {
          resolve(BackLicenseImage);
        }
      } catch (error) {
        console.log('error upload image :  ', error);
        resolve('');
      }
    });
  };
// console.log(profileImage);

  const handleContinue = async () => {
    // navigation?.navigate('RegistrationDocuments')
    // let image_url = await handleUploadProfileImage();
    // console.log('image_url :  ', image_url);
    if (validate2()) {
      // setLoading(true);
      

        var profileImageUrl = await handleUploadProfieImg();

     
        var frontIDCard = await handleUploadFrontIDCard();
     
    
        var backIDCard = await handleUploadBackIDCard();
    
    
        var frontLicense = await handleUploadFrontDrivingLicense();
     
   
        var backLicense = await handleUploadBackDrivingLicense();

      
    
     rider_details?.address

      const data = {
        rider_id: rider_id,
        photo: profileImageUrl ,
        cnic: CNIC,
        address: address,
        dob: DOB,
        gender: gender.toLocaleLowerCase(),
        license_front_image: frontLicense,
        license_back_image: backLicense,
        id_card_front_image: frontIDCard,
        id_card_back_image: backIDCard,
        vechile_registration_no: vehicle.reg,
        vehicle_model: vehicle.modal,
        vehicle_name: vehicle.name,
        vehicle_ownership: vehicle.ownerName
      }
      console.log({ data });


      fetch(api.updateProfile, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log({ response });

          if (response.error === false) {
            dispatch(setShowPopUp(true))
            dispatch(setPopUpColor(Colors.Orange))
            dispatch(setPopUpMesage(response?.message))
            setTimeout(() => {
              dispatch(setShowPopUp(false))
              navigation.goBack()
            }, 1000)
            dispatch(setRiderId(response?.result?.rider_id))
            dispatch(setRiderDetails(response?.result))
            setProfileImage(response?.result ? response?.result.photo : null)
            setFrontIDImage(response?.result ? response?.result.id_card_front_image : null)
            setBackIDImage(response?.result ? response?.result.id_card_back_image : null)
            setFrontLicenseImage(response?.result ? response?.result.license_front_image : null)
            setBackLicenseImage(response?.result ? response?.result.license_back_image : null)
            setCNIC(response?.result ? response?.result.cnic : null)
            setAddress(response?.result ? response?.result.address : null)
            setDOB(response?.result ? new Date(response?.result.dob) : null)
            setGender(response?.result ? response?.result.gender : null)
            setVehicle({
              ownerName: response?.result ? response?.result.vehicle_ownership : null,
              reg: response?.result ? response?.result.vechile_registration_no : null,
              modal: response?.result ? response?.result.vehicle_model : null,
              name: response?.result ? response?.result.vehicle_name : null,
            })
            setIndex(0)
            
          } else {
            dispatch(setShowPopUp(true))
            dispatch(setPopUpColor('red'))
            dispatch(setPopUpMesage(response?.message))
            setTimeout(() => {
              dispatch(setShowPopUp(false))
            }, 1000)
          }
        })
        .catch(err => {
          console.log('Error in Login :  ', err);
          // showAlert('Something went wrong');
          dispatch(setShowPopUp(true))
          dispatch(setPopUpColor('red'))
          dispatch(setPopUpMesage('Something went wrong'))
          setTimeout(() => {
            dispatch(setShowPopUp(false))
          }, 1000)
        })
        .finally(() => {
          setLoading(false);
        });


      setLoading(false);
    }
  };

  function isValidDateFormat(DOB) {
    // Check if DOB is a valid date
    const dobDate = new Date(DOB);

    // isNaN check will confirm it's a real date and not an invalid one
    if (isNaN(dobDate)) {
        return false;
    }

    // Format check: comparing the string representation of DOB to the default Date format
    const dobFormatted = dobDate.toDateString();
    const newDateFormatted = new Date().toDateString();

    return dobFormatted === newDateFormatted;
}
  

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White, }}>
      <Loader loading={loading} />
      {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={{
          flexDirection: 'row', paddingTop: hp(3),
          paddingBottom: hp(4), paddingHorizontal: wp(5), alignItems: 'center'
        }} >

          <TouchableOpacity onPress={() => index === 1 ? setIndex(0) : navigation.goBack()} >
            <Feather
              name={'chevron-left'}
              size={25}
              color={Colors.Orange}
            /></TouchableOpacity>

      <Text style={styles.header} >{index == 1 ? 'Vehicle Details' : 'Update Profile'}</Text>



        </View>



        {index == 1 ? (
          <View style={{ flex: 1, paddingBottom: hp(3) }}>
            <CInput
              // heading={'Vehicle Ownership'}
              // headingStyle={styles.headingStyle}
              placeholder="Registration No."
              value={vehicle.reg}
              onChangeText={text => setVehicle({ ...vehicle, reg: text })}
              height={textInput_HEIGHT}
              keyboardType='numeric'
            />
            <CInput
              // heading={'Vehicle Ownership'}
              // headingStyle={styles.headingStyle}
              placeholder="Vehicle Owner Name"
              value={vehicle.ownerName}
              onChangeText={text => setVehicle({ ...vehicle, ownerName: text })}
              height={textInput_HEIGHT}
            />
            <CInput
              // heading={'Vehicle Model'}
              // headingStyle={styles.headingStyle}
              placeholder="Vehicle Model"
              value={vehicle.modal}
              onChangeText={text => setVehicle({ ...vehicle, modal: text })}
              height={textInput_HEIGHT}
            />
            <CInput
              // heading={'Vehicle Name'}
              // headingStyle={styles.headingStyle}
              placeholder="Vehicle Name"
              value={vehicle.name}
              onChangeText={text => setVehicle({ ...vehicle, name: text })}
              height={textInput_HEIGHT}
            />

            <View>
              {FrontLicenseImage?.path && <TouchableOpacity style={styles.iconBtn} onPress={() => setFrontLicenseImage(null)}><Feather
                name={'x'}
                size={25}
                color={Colors.Orange}
              /></TouchableOpacity>}


              <TouchableOpacity
                onPress={() => {
                  setSelectedImageType('frontLicense');
                  cameraSheet_ref?.current?.open();
                }}
                style={styles.fileContainer}>

               
                  <Image source={{ uri: FrontLicenseImage?.path?.startsWith('file://')
                      ? FrontLicenseImage?.path
                      : BASE_URL_IMAGE + FrontLicenseImage}} style={styles.image} />
              
              </TouchableOpacity>

            </View>

            <View>
              {BackLicenseImage?.path && <TouchableOpacity style={styles.iconBtn} onPress={() => setBackLicenseImage(null)}><Feather
                name={'x'}
                size={25}
                color={Colors.Orange}
              /></TouchableOpacity>}

              <TouchableOpacity
                onPress={() => {
                  setSelectedImageType('backLicense');
                  cameraSheet_ref?.current?.open();
                }}
                style={styles.fileContainer}>
                
                  <Image source={{  uri: BackLicenseImage?.path?.startsWith('file://')
                      ? BackLicenseImage?.path
                      : BASE_URL_IMAGE + BackLicenseImage }} style={styles.image} />
                
              </TouchableOpacity>
            </View>



            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <CButton
                title="Continue"
                width={wp(89)}
                // marginTop={hp(43)}
                onPress={() => handleContinue()}
              />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, paddingBottom: hp(3) }}>
            <TouchableOpacity
              // onPress={() => handleUploadImage()}
              onPress={() => {
                setSelectedImageType('profile');
                cameraSheet_ref?.current?.open();
              }}
              style={styles.profileImage}>
      
                <Avatar.Image
                  source={{  uri: profileImage?.path?.startsWith('file://')
                    ? profileImage?.path
                    : profileImage }}
                  size={wp(25)}
                />
            
            </TouchableOpacity>
            {/* <CInput
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
            /> */}
            <CInput
              placeholder="CNIC Number"
              keyboardType="numeric"
              value={CNIC}
              onChangeText={text => setCNIC(text)}
              height={textInput_HEIGHT}

            />
            {/* <CInput
              placeholder="Country"
              value={country}
              onChangeText={text => setCountry(text)}
            /> */}
            <CInput
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
              height={textInput_HEIGHT}
            />
            {/* <CInput
              placeholder="Location"
              value={location}
              onChangeText={text => setLocation(text)}
            /> */}
            <CInput
              placeholder="Date of Birth"
              value={moment(DOB).format('DD/MM/YYYY')}
              // onChangeText={text => setDOB(text)}
              editable={false}
              disabled={false}
              onPress={() => showBtmSheet()}
              height={textInput_HEIGHT}
            />
            <CInput
              placeholder="Gender"
              //   keyboardType="numeric"
              value={gender}
              onChangeText={text => setGender(text)}
              height={textInput_HEIGHT}
            />
            <View>
              {FrontIDImage?.path && <TouchableOpacity style={styles.iconBtn} onPress={() => setFrontIDImage(null)}><Feather
                name={'x'}
                size={25}
                color={Colors.Orange}
              /></TouchableOpacity>}


              <TouchableOpacity
                onPress={() => {
                  setSelectedImageType('front');
                  cameraSheet_ref?.current?.open();
                }}
                style={styles.fileContainer}>

               
                    <Image source={{  uri: FrontIDImage?.path?.startsWith('file://')
                      ? FrontIDImage?.path
                      : BASE_URL_IMAGE + FrontIDImage }} style={styles.image} />
                
              </TouchableOpacity>

            </View>

            <View>
              {BackIDImage?.path && <TouchableOpacity style={styles.iconBtn} onPress={() => setBackIDImage(null)}><Feather
                name={'x'}
                size={25}
                color={Colors.Orange}
              /></TouchableOpacity>}

              <TouchableOpacity
                onPress={() => {
                  setSelectedImageType('back');
                  cameraSheet_ref?.current?.open();
                }}
                style={styles.fileContainer}>
               
                  <Image source={{ uri: BackIDImage?.path?.startsWith('file://')
                      ? BackIDImage?.path
                      : BASE_URL_IMAGE + BackIDImage}} style={styles.image} />
            
              </TouchableOpacity>
            </View>

            <CButton
              title="Continue"
              marginTop={10}
              onPress={() => handleGoNext()}
            />

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={DOB || new Date()}
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
                  shadowOffset: { height: 0, width: 0 },
                  color: '#1669F',
                  textColor: '#1669F',
                }}
              />
            )}
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
      <CRBSheetComponent height={310} refRBSheet={datePicker_ref} content={<View>
        <View style={styles.rowView}>
          <Text style={styles.addDate} >Add Date</Text>
          <Text>Add Date</Text>
          <TouchableOpacity onPress={closeBtmSheet} >
            <Feather
              name={'x'}
              size={20}
              color={Colors.Black}
            /></TouchableOpacity>
        </View>

        <DatePicker mode="date" theme='light' date={DOB} onDateChange={setDOB} dividerColor={Colors.Orange} style={{}} />
        <CButton
          title="Confirm"
          height={hp(6.2)}
          // marginTop={hp(5)}
          width={wp(88)}
          // onPress={() => navigation?.navigate('Verification')}
          onPress={closeBtmSheet}
          loading={loading}
        />
      </View>} />

    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 1,
    borderColor: Colors.Border,
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25) / 2,
    alignSelf: 'center',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.5),
    color: Colors.Orange,
    textAlign: 'center',
    // alignSelf: 'center',
    flex: 1
  },
  fileContainer: {
    width: wp(90),
    height: hp(23),
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
  description: {
    color: '#979797',
    fontFamily: Fonts.Inter_Regular,
    marginVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: hp(1),
  },
  addDate: {
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    color: Colors.Black,
    fontSize: RFPercentage(2),

  },
  iconBtn: {
    position: 'absolute',
    top: 0,
    right: 10,
    borderColor: Colors.Orange,
    borderWidth: wp(0.3),
    backgroundColor: Colors.White,
    borderRadius: wp(20)
  }

});
