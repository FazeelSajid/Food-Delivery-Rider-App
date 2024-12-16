import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import StackHeader from '../../components/Header/StackHeader';
import { Colors, Fonts, Icons, Images } from '../../constants';
import CInput from '../../components/TextInput/CInput';
import CButton from '../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar } from 'react-native-paper';
import {
  chooseImageFromCamera,
  showAlert,
  uploadImage,
} from '../../utils/helpers';
import moment from 'moment';
import Loader from '../../components/Loader';
import { launchCamera } from 'react-native-image-picker';
import CameraBottomSheet from '../../components/BottomSheet/CameraBottomSheet';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { BASE_URL } from '../../utils/globalVariables';
import CRBSheetComponent from '../../components/BottomSheet/CRBSheetComponent';
import DatePicker from 'react-native-date-picker'
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../constants/api';
import { setRiderDetails, setRiderId } from '../../redux/AuthSlice';
import PopUp from '../../components/Popup/PopUp';



const RegistrationForm = ({ navigation, route }) => {
  const cameraSheet_ref = useRef();
  const datePicker_ref = useRef();
  const Verification_ref = useRef();
  const dispatch = useDispatch();
  const showBtmSheet = () => {
    datePicker_ref?.current?.open()
  }
  const closeBtmSheet = () => {
    datePicker_ref?.current?.close()
  }
  const { rider_id } = useSelector(store => store.auth)
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpColor, setPopUpColor] = useState('')
  const [PopUpMesage, setPopUpMesage] = useState('')
  const textInput_HEIGHT = 45;
  const [index, setIndex] = useState(0); //0 for other and 1 for vehicle info
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [FrontIDImage, setFrontIDImage] = useState(null);
  const [BackIDImage, setBackIDImage] = useState(null);
  const [FrontLicenseImage, setFrontLicenseImage] = useState(null);
  const [BackLicenseImage, setBackLicenseImage] = useState(null);
  const [email, setEmail] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');


  const [vehicle, setVehicle] = useState({
    ownerName: '',
    reg: '',
    modal: '',
    name: '',
  });

  // const handleUploadImag = async item => {
  //   // chooseImageFromCamera()
  //   //   .then(res => {
  //   //     if (res) {
  //   //       setProfileImage(res);
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('err : ', err);
  //   //   });

  //   var options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 0.2,
  //   };

  //   await launchCamera(options)
  //     .then(async res => {
  //       console.log('response :  ', res);
  //       if (res.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (res.error) {
  //         console.log('ImagePicker Error: ', res.error);
  //       } else if (res.customButton) {
  //         console.log('User tapped custom button: ', res.customButton);
  //       } else {
  //         let image = {
  //           path: res.assets[0].uri,
  //           mime: res.assets[0].type,
  //           name: res.assets[0].fileName,
  //         };
  //         setProfileImage(image);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('error  :  ', err);
  //     });
  // };

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

  // const onDatePick = (event, selectedDate) => {
  //   console.log('event  :   ', event);
  //   setShowDatePicker(false);
  //   if (event?.type == 'set') {
  //     setDOB(selectedDate);
  //   }
  // };

  const handleUploadProfileImage = (img) => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = {
          uri: img?.path,
          name: img?.name,
          type: img?.mime,
        };
        console.log('image :  ', image);
        let filePath = await uploadImage(image);
        if (filePath) {
          resolve(filePath);
        } else {
          resolve('');
        }
      } catch (error) {
        console.log('error handleUploadProfileImage :  ', error);
        resolve('');
      }
    });
  };

  const clearFields = () => {
    setProfileImage(null);
    // setEmail('');
    setCNIC('');
    // setCountry('');
    setAddress('');
    // setLocation('');
    setDOB('');
    setGender('');
    setFrontIDImage(null)
    setBackIDImage(null)
    setFrontLicenseImage(null)
    setBackLicenseImage(null)
    setVehicle({
      reg: '',
      modal: '',
      name: '',
    });
    setIndex(0);
  };

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

  const handleContinue = async () => {
    // navigation?.navigate('RegistrationDocuments')
    // let image_url = await handleUploadProfileImage();
    // console.log('image_url :  ', image_url);
    if (validate2()) {
      setLoading(true);
      let profileImageUrl = await handleUploadProfileImage(profileImage);
      let frontIDCard = await handleUploadProfileImage(FrontIDImage);
      let backIDCard = await handleUploadProfileImage(BackIDImage);
      let frontLicense = await handleUploadProfileImage(FrontLicenseImage);
      let backLicense = await handleUploadProfileImage(BackLicenseImage);

      const data = {
        rider_id: rider_id,
        photo: profileImageUrl,
        cnic: CNIC,
        address: address,
        dob:  DOB,
        gender: gender.toLocaleLowerCase(),
        license_front_image: frontLicense,
        license_back_image:backLicense,
        id_card_front_image: frontIDCard,
        id_card_back_image: backIDCard,
        vechile_registration_no: vehicle.reg,
        vehicle_model: vehicle.modal,
        vehicle_name: vehicle.name,
        vehicle_ownership : vehicle.ownerName
    }
    console.log({data});
    
    
    fetch(api.updateProfile, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then(response => response.json())
          .then(async response => {
            console.log({response});
            
            if (response.error === false) {
              setShowPopUp(true)
              setPopUpColor('green')
              setPopUpMesage(response?.message)
              setTimeout(()=>{
                setShowPopUp(false)
              }, 1000)
              // dispatch(setRiderId(response?.result?.rider_id))
              // dispatch(setRiderDetails(response?.result))
              Verification_ref?.current?.open()
            }else {
              setShowPopUp(true)
              setPopUpColor('red')
              setPopUpMesage(response?.message)
              setTimeout(()=>{
                setShowPopUp(false)
              }, 1000)
            }
          })
          .catch(err => {
            console.log('Error in Login :  ', err);
            // showAlert('Something went wrong');
            setShowPopUp(true)
            setPopUpColor('red')
            setPopUpMesage('Something went wrong');
            setTimeout(()=>{
              setShowPopUp(false)
            }, 1000)
          })
          .finally(() => {
            setLoading(false);
          });
     

      clearFields();
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary_color, }}>
      <Loader loading={loading} />
      { showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={{
          flexDirection: 'row', paddingTop: hp(5),
          paddingBottom: hp(4), paddingHorizontal: wp(5), alignItems: 'center'
        }} >
          
          {
            index == 1 && <TouchableOpacity onPress={() => setIndex(0)} >
              <Feather
                name={'chevron-left'}
                size={25}
                color={Colors.Orange}
              /></TouchableOpacity>
          }
          

          <Text style={styles.header} >{index == 1 ? 'Vehicle Details' : 'Create Profile'}</Text>
        </View>



        {index == 1 ? (
          <View style={{ flex: 1 }}>
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
              {FrontLicenseImage && <TouchableOpacity style={styles.iconBtn} onPress={() => setFrontLicenseImage(null)}><Feather
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

                {FrontLicenseImage ? (
                  <Image source={{ uri: FrontLicenseImage?.path }} style={styles.image} />
                ) : (
                  <>
                    <Icons.UploadFile />
                    <Text style={styles.description}>Driving License Front</Text>
                  </>
                )}
              </TouchableOpacity>

            </View>

            <View>
              {BackLicenseImage && <TouchableOpacity style={styles.iconBtn} onPress={() => setBackLicenseImage(null)}><Feather
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
                {BackLicenseImage ? (
                  <Image source={{ uri: BackLicenseImage?.path }} style={styles.image} />
                ) : (
                  <>
                    <Icons.UploadFile />
                    <Text style={styles.description}>Driving License Back</Text>
                  </>
                )}
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
          <View style={{ flex: 1, paddingBottom: hp(4) }}>
            <TouchableOpacity
              // onPress={() => handleUploadImage()}
              onPress={() => {
                setSelectedImageType('profile');
                cameraSheet_ref?.current?.open();
              }}
              style={styles.profileImage}>
              {profileImage ? (
                <Avatar.Image
                  source={{ uri: profileImage?.path }}
                  size={wp(25)}
                  style={{backgroundColor: 'white', alignItems: 'center', }}

                />
              ) : (
                <Icons.Profile1 />
              )}
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
              value={DOB ? moment(DOB).format('DD/MM/YYYY') : ''}
              onChangeText={text => setDOB(text)}
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
              {FrontIDImage && <TouchableOpacity style={styles.iconBtn} onPress={() => setFrontIDImage(null)}><Feather
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

                {FrontIDImage ? (
                  <Image source={{ uri: FrontIDImage?.path }} style={styles.image} />
                ) : (
                  <>
                    <Icons.UploadFile />
                    <Text style={styles.description}>Front ID card Image</Text>
                  </>
                )}
              </TouchableOpacity>

            </View>

            <View>
              {BackIDImage && <TouchableOpacity style={styles.iconBtn} onPress={() => setBackIDImage(null)}><Feather
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
                {BackIDImage ? (
                  <Image source={{ uri:  BackIDImage?.path }} style={styles.image} />
                ) : (
                  <>
                    <Icons.UploadFile />
                    <Text style={styles.description}>Back ID card Image</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <CButton
              title="Continue"
              marginTop={10}
              onPress={() => handleGoNext()}
            />

             {/* {showDatePicker && (
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
            )} */}
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
      <CRBSheetComponent refRBSheet={Verification_ref} height={hp(40)} 
      content={<View style={{flex:1}} >
        <View style={{backgroundColor: Colors.primary_color, paddingVertical: hp(3),paddingHorizontal: hp(3.5), borderRadius: wp(20), alignItems: 'center', justifyContent: 'center', width: wp(23), alignSelf: 'center'}} >
          <Icons.Send width={wp(9)} />
        </View>
        <Text style={{color: Colors.secondary_text, width: wp(80), fontSize: RFPercentage(2.3), textAlign: 'center', marginTop: hp(4), lineHeight: hp(3.2), alignSelf: 'center'}} >Your request has been sent to the Admin for verification. You will be notified when it's complete.</Text>
        <CButton
          title="Okay"
          height={hp(6.2)}
          // marginTop={hp(5)}
          width={wp(88)}
          // onPress={() => navigation?.navigate('Verification')}
          onPress={()=> {Verification_ref.current.close()
            setTimeout(() => {
              navigation.goBack();
            }, 300);
          }}
          loading={loading}
        />
        </View>} />
      <CRBSheetComponent height={hp(40)} refRBSheet={datePicker_ref} content={<View>
        <View style={styles.rowView}>
          <Text style={styles.addDate} >Add Date</Text>
          <TouchableOpacity onPress={closeBtmSheet} >
            <Feather
              name={'x'}
              size={20}
              color={Colors.primary_text}
            /></TouchableOpacity>
        </View>
        <DatePicker mode="date" theme='light' date={DOB || new Date()} onDateChange={setDOB} dividerColor={Colors.Orange} style={{}} />
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

export default RegistrationForm;

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
    color:Colors.primary_color,
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
    color: Colors.primary_text,
    fontSize: RFPercentage(2),

  },
  iconBtn: {
    position: 'absolute',
    top: 0,
    right: 10,
    borderColor:Colors.primary_color,
    borderWidth: wp(0.3),
    backgroundColor: Colors.secondary_color,
    borderRadius: wp(20)
  }

});
