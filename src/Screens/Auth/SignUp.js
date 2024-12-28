import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import { Images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CInput from '../../components/TextInput/CInput';
import Feather from 'react-native-vector-icons/Feather';
import CButton from '../../components/Buttons/CButton';
import { getStyles } from './STYLE';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import {getUserFcmToken} from '../../utils/helpers';
import api from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CInputWithCountryCode from '../../components/TextInput/CInputWithCountryCode';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import Google from '../../Assets/svg/Googlee.svg';
import PopUp from '../../components/Popup/PopUp';
import { setRiderDetails, setRiderId } from '../../redux/AuthSlice';
import { handlePopup } from '../../utils/helpers/orderApis';

const SignUp = ({navigation, route}) => {
  const dispatch = useDispatch();

  const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)


  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();
  const { Colors } = useSelector(store => store.auth)
  const [userName, setUserName] = useState('');
  const STYLE = getStyles(Colors)

  // const SignUpWithPhone = signUpWith === 'email'
  // const signUpWithPhone = signUpWith === 'phone'
  // console.log(SignUpWithPhone, signUpWithPhone);
  


  useEffect(() => {
    // scrollViewRef.current?.scrollToEnd();
    scrollViewRef.current?.scrollTo({y: 180});
  }, [keyboardHeight]);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+92');


  const clearFields = () => {
    setUserName('')
    setShowPass(false);
    setUserEmail('');
    setPhone_no('');
    setPassword('');
  };

  const validate = () => {
    // Email Validation
    if (!userEmail || userEmail.length > 0) {
      if (!/\S+@\S+\.\S+/.test(userEmail)) {
        handlePopup(dispatch,'Please Enter a valid email address',);
        return false;
      }
    }
  
    // Country Code Validation
    if (!countryCode || countryCode.length === 0) {
      handlePopup(dispatch,'Please Enter Country');
      return false;
    }
  
     // Phone Validation
     if (!phone_no || phone_no.length === 0) {
      handlePopup(dispatch,'Please Enter phone number');
      return false;
    } else if (!/^\d{10,15}$/.test(phone_no)) {
      handlePopup(dispatch,'Please Enter a valid phone number (10-15 digits)');
      return false;
    }
    // Password Validation
    if (!password || password.length === 0) {
      handlePopup(dispatch,'Please Enter Password');
      return false;
    } else if (password.length < 8) {
      handlePopup(dispatch,'Password must be at least 8 characters long');
      return false;
    } else if (!/[A-Z]/.test(password)) {
      handlePopup(dispatch,'Password must include at least one uppercase letter');
      return false;
    } else if (!/[a-z]/.test(password)) {
      handlePopup(dispatch,'Password must include at least one lowercase letter');
      return false;
    } else if (!/\d/.test(password)) {
      handlePopup(dispatch,'Password must include at least one number');
      return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      handlePopup(dispatch,'Password must include at least one special character');
      return false;
    }
  
    // Username Validation
    if (!userName || userName.length === 0) {
      handlePopup(dispatch,'Please Enter username');
      return false;
    } else if (userName.length < 3) {
      handlePopup(dispatch,'Username must be at least 3 characters long');
      return false;
    }
  
   
  
    // If all validations pass
    return true;
  };
  
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '293745886997-4i5fm6s806fpea20r9qq7383pdtedl65.apps.googleusercontent.com',
      iosClientId: '',
    });
  }, []);
  

  const handleSignUp = async () => {
    // navigation?.navigate('Verification')
        // console.log({userEmail, phone_no, password, fcm_token, userName});
       
        
      

      if (validate()) {
        setLoading(true);
        let fcm_token = await getUserFcmToken();
        let data = {
          name: userName,
          email: userEmail.toLocaleLowerCase(),
          password: password,
          signup_type: "email",
          phone: countryCode + phone_no,
          fcm_token: fcm_token,
          rest_ID: "res_4074614",
        };
        console.log('data  :  ', data);

        fetch(api.signUp, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(async response => {
            console.log('response  :  ', response);
            if (response?.error == true) {
              // handlePopup(dispatch,response?.message);
             
              handlePopup(dispatch,response?.message)
             
              // handlePopup(dispatch,'Invalid Credentials');
            } else {
              // handlePopup(dispatch,response.message, 'green');
              let wallet = await createRiderWallet(response?.result?.rider_id);
              console.log({wallet});
              dispatch(setRiderId(response?.result?.rider_id))
              dispatch(setRiderDetails(response?.result))

              handlePopup(dispatch,response?.message, 'green')
              setTimeout(()=>{
                navigation.navigate('RegistrationForm', {
                  user_name: userName,
                  phone_no: countryCode + phone_no,
                  email: userEmail
                });
              }, 1000)
              // let wallet = await createCustomerWallet(
              //   response?.result?.customer_id,
              // );
              // console.log(wallet);
              // dispatch(
              //   // setCustomerId(response?.result?.customer_id?.toString()),
              // );
              // dispatch(setCustomerDetail(response?.result)); 
              // navigation?.popToTop()
              
              clearFields();
            }
          })
          .catch(err => {
            console.log('Error in SignUp :  ', err);
            handlePopup(dispatch,'Something went wrong!');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    // }
  };

  const updateVerificationStatus = customer_id => {
    return new Promise((resolve, reject) => {
      let data = {
        customer_id: customer_id,
        verified: true,
      };
      console.log('data  :  ', data);
      fetch(api.update_verification_status, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  :  ', response);
          if (response?.status == false) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  };

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '293745886997-4i5fm6s806fpea20r9qq7383pdtedl65.apps.googleusercontent.com',
      iosClientId: '',
    });
  }, []);

  const createRiderWallet = async rider_id => {
    return new Promise(async (resolve, reject) => {
      fetch(api.create_rider_wallet, {
        method: 'POST',
        body: JSON.stringify({
          rider_id: rider_id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          resolve(response);
        })
        .catch(err => {
          resolve(false);
        });
    });
  };

  const handleGoogleSignUp = async () => {
    // console.log('handleGoogleSignIn');
    try {
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      let email = userInfo?.user?.email;
      let user_name = userInfo?.user?.name;

      console.log('user email : ', email);
      let fcm_token = await getUserFcmToken();
      if (email) {
        setLoading(true);
        let data = {
          // phone_no: countryCode + phone_no,
          signup_type: 'google',
          email: email,
          user_name: user_name,
          fcm_token: fcm_token,
          rest_ID: "res_4074614",
          // password: password,
        };
        console.log('data  :  ', data);

        fetch(api.signUp, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(async response => {
            console.log('response  :  ', response);
            if (response?.error == true) {
              handlePopup(dispatch,response?.message);
              // handlePopup(dispatch,'Invalid Credentials');
            } else {
              let wallet = await createRiderWallet(response?.result?.rider_id);
              console.log({wallet});
              dispatch(setRiderId(response?.result?.rider_id))
              console.log(response?.result?.rider_id);
              
              dispatch(setRiderDetails(response?.result))

              handlePopup(dispatch,response?.message, 'green')
              setTimeout(()=>{
                navigation.navigate('RegistrationForm', {
                  user_name: user_name,
                  // phone_no: countryCode + phone_no,
                  email: email
                });
              }, 1000)
              clearFields();
            }
          })
          .catch(err => {
            console.log('Error in Login :  ', err);
            handlePopup(dispatch,'Something went wrong!');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('Error Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //alert('Play Services Not Available or Outdated');
      } else {
        handlePopup(dispatch,'Something went wrong!');
      }
    }
  };

  return (
    <View style={STYLE.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      { showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={STYLE.authBGContainer}>
          <Image source={Images.authBG} style={STYLE.authBGImage} />
        </View>
        <TouchableOpacity
          style={STYLE.topScreenBTnContainer}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={STYLE.topScreenBTn}>Sign In</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={STYLE.heading}>Sign Up </Text>

          <CInput
            placeholder="Username"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
           <CInputWithCountryCode
            phoneNo={phone_no}
            setPhoneNo={setPhone_no}
            setCountryCode={setCountryCode}
            countryCode={countryCode}
            placeholder = {'Phone Number'}
          />
          <CInput
            placeholder="Email Address"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
          {/* <CInput
            placeholder="Phone Number"
            value={phone_no}
            onChangeText={text => setPhone_no(text)}
            keyboardType="numeric"
          /> */}

         
          <CInput
            placeholder="Password"
            value={password}
            secureTextEntry={!showPass}
            onChangeText={text => setPassword(text)}
            rightContent={
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Feather
                  name={!showPass ? 'eye' : 'eye-off'}
                  size={20}
                  color={'#39393999'}
                />
              </TouchableOpacity>
            }
          />

          <CButton
            title="SIGN UP"
            height={hp(6.2)}
            marginTop={hp(3)}
            width={wp(88)}
            // onPress={() => navigation?.navigate('Verification')}
            onPress={() =>
              // navigation.navigate('RegistrationForm', {
              //   user_name: userName,
              //   phone_no: countryCode + phone_no,
              //   email: userEmail
              // })  
              handleSignUp()
            }
            loading={loading}
          />

        

          <Text style={STYLE.orText}>-- Or --</Text>
          <View style={{paddingBottom: 20}} >
          <CButton
            title="Sign up with Google"
            height={hp(6.2)}
            // marginTop={hp(10)}
            transparent={true}
            width={wp(88)}
            leftIcon={<Google  />}
            borderColor={Colors.borderGray}
            color={Colors.primary_text}
            onPress={() => handleGoogleSignUp()}
          />
          </View>
       

          {/* <TouchableOpacity style={STYLE.signInWithGoogle} >
          <Image source={Images.google} />
            <Text>Sign in with Google</Text>
          </TouchableOpacity> */} 
          {/* <View style={STYLE.socialIconContainer}>
            <TouchableOpacity
              onPress={() => handleGoogleSignUp()}
              activeOpacity={0.7}
              style={STYLE.googleIconContainer}>
              <Image source={Images.google} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Icons.Facebook width={wp(13)} />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
