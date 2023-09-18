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
import {Avatar} from 'react-native-paper';
import {
  chooseImageFromCamera,
  showAlert,
  uploadImage,
} from '../../utils/helpers';
import moment from 'moment';
import Loader from '../../components/Loader';
import {launchCamera} from 'react-native-image-picker';

const RegistrationForm = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 42;

  const [index, setIndex] = useState(0); //0 for other and 1 for vehicle info
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [vehicle, setVehicle] = useState({
    owner: '',
    modal: '',
    name: '',
  });

  const handleUploadImage = async item => {
    // chooseImageFromCamera()
    //   .then(res => {
    //     if (res) {
    //       setProfileImage(res);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err : ', err);
    //   });

    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.2,
    };

    await launchCamera(options)
      .then(async res => {
        console.log('response :  ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
        } else {
          let image = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          setProfileImage(image);
        }
      })
      .catch(err => {
        console.log('error  :  ', err);
      });
  };
  const onDatePick = (event, selectedDate) => {
    console.log('event  :   ', event);
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setDOB(selectedDate);
    }
  };

  const handleUploadProfileImage = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = {
          uri: profileImage?.path,
          name: profileImage?.name,
          type: profileImage?.mime,
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
    setEmail('');
    setCNIC('');
    setCountry('');
    setAddress('');
    setLocation('');
    setDOB('');
    setGender('');
    setVehicle({
      owner: '',
      modal: '',
      name: '',
    });
    setIndex(0);
  };

  const validate = () => {
    if (profileImage == null) {
      showAlert('Please Upload Profile Image');
      return false;
    } else if (email.length == 0) {
      showAlert('Please Enter email address');
      return false;
    } else if (CNIC.length == 0) {
      showAlert('Please Enter CNIC');
      return false;
    } else if (country.length == 0) {
      showAlert('Please Enter Country');
      return false;
    } else if (address.length == 0) {
      showAlert('Please Enter Address');
      return false;
    } else if (location.length == 0) {
      showAlert('Please Enter Location');
      return false;
    } else if (DOB.length == 0) {
      showAlert('Please Select Date Of Birth');
      return false;
    } else if (gender.length == 0) {
      showAlert('Please Enter Gender');
      return false;
    } else {
      return true;
    }
  };

  const validate2 = () => {
    if (vehicle?.owner?.length == 0) {
      showAlert('Please Enter Owner Name');
      return false;
    } else if (vehicle?.modal?.length == 0) {
      showAlert('Please Enter Vehicle Model');
      return false;
    } else if (vehicle?.name?.length == 0) {
      showAlert('Please Enter Vehicle Name');
      return false;
    } else {
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
      let image_url = await handleUploadProfileImage();
      console.log('image_url :  ', image_url);

      // driver_license: '',
      // vehicle_ownership: '',
      // id_card_front_image: '',
      // id_card_back_image: '',
      // vehicle_model: '',
      // vehicle_name: '',

      navigation?.navigate('RegistrationDocuments', {
        country: country,
        photo: image_url,
        cnic: CNIC,
        address: address,
        dob: DOB ? moment(DOB).format('DD/MM/YYYY') : '',
        gender: gender,
        email: email,
        name: route?.params?.user_name,
        location: location,
        phone: route?.params?.phone_no,

        vehicle_ownership: vehicle.owner,
        vehicle_model: vehicle.modal,
        vehicle_name: vehicle.name,
      });

      clearFields();
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Registration Request'} />
        {index == 1 ? (
          <View style={{flex: 1}}>
            <CInput
              heading={'Vehicle Ownership'}
              headingStyle={styles.headingStyle}
              // placeholder="John Doe"
              value={vehicle.owner}
              onChangeText={text => setVehicle({...vehicle, owner: text})}
              height={textInput_HEIGHT}
            />
            <CInput
              heading={'Vehicle Model'}
              headingStyle={styles.headingStyle}
              // placeholder="Corolla"
              value={vehicle.modal}
              onChangeText={text => setVehicle({...vehicle, modal: text})}
              height={textInput_HEIGHT}
            />
            <CInput
              heading={'Vehicle Name'}
              headingStyle={styles.headingStyle}
              // placeholder="Toyota Corolla"
              value={vehicle.name}
              onChangeText={text => setVehicle({...vehicle, name: text})}
              height={textInput_HEIGHT}
            />

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <CButton
                title="Continue"
                width={wp(89)}
                // marginTop={hp(43)}

                onPress={() => handleContinue()}
              />
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => handleUploadImage()}
              style={styles.profileImage}>
              {profileImage ? (
                <Avatar.Image
                  source={{uri: profileImage?.path}}
                  size={wp(25)}
                />
              ) : (
                <Icons.Profile1 />
              )}
            </TouchableOpacity>
            <CInput
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <CInput
              placeholder="CNIC Number"
              keyboardType="numeric"
              value={CNIC}
              onChangeText={text => setCNIC(text)}
            />
            <CInput
              placeholder="Country"
              value={country}
              onChangeText={text => setCountry(text)}
            />
            <CInput
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <CInput
              placeholder="Location"
              value={location}
              onChangeText={text => setLocation(text)}
            />
            <CInput
              placeholder="Date of Birth"
              value={DOB ? moment(DOB).format('DD/MM/YYYY') : ''}
              onChangeText={text => setDOB(text)}
              editable={false}
              disabled={false}
              onPress={() => setShowDatePicker(!showDatePicker)}
            />
            <CInput
              placeholder="Gender"
              //   keyboardType="numeric"
              value={gender}
              onChangeText={text => setGender(text)}
            />
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
                  shadowOffset: {height: 0, width: 0},
                  color: '#1669F',
                  textColor: '#1669F',
                }}
              />
            )}
          </View>
        )}
      </ScrollView>
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
});
