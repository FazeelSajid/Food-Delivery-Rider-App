import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors, Fonts, Icons, Images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CInput from '../../components/TextInput/CInput';
import Feather from 'react-native-vector-icons/Feather';
import CButton from '../../components/Buttons/CButton';
import STYLE from './STYLE';
import RBSheetSuccess from '../../components/BottomSheet/RBSheetSuccess';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import {getUserFcmToken, showAlert} from '../../utils/helpers';
import api from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CRBSheetComponent from '../../components/BottomSheet/CRBSheetComponent';
import { setRiderDetails, setSignUpWith, setRiderId } from '../../redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import messaging from '@react-native-firebase/messaging';
import PopUp from '../../components/Popup/PopUp';

const SignIn = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();
  const btmSheetRef = useRef()
  const { signUpWith } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpColor, setPopUpColor] = useState('')
  const [PopUpMesage, setPopUpMesage] = useState('')

  const showBtmSheet = () => {
    btmSheetRef?.current?.open()
  }
  const closeBtmSheet = () => {
    btmSheetRef?.current?.close()
  }

  const ItemSeparator = () => (
    <View
      style={{
        height: hp(0.1),
        marginVertical: 10,
        backgroundColor: '#00000026',
      }}
    />
  );


  useEffect(() => {
    // scrollViewRef.current?.scrollToEnd();
    scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const toggleSelection = (param) => {
    if (param === 'phone'){
      signUpWith === param ? dispatch(setSignUpWith('')) : dispatch(setSignUpWith(param))
      navigation.navigate('SignUpWithPhone')
      closeBtmSheet()
    }
    if (param === 'email'){
      signUpWith === 'email' ? dispatch(setSignUpWith('')) : dispatch(setSignUpWith(param))
      navigation.navigate('SignUpWithEmail')
      closeBtmSheet()
    }
  }

  const ref_RBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [riderId, setRiderid] = useState('');
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(1);

  const validate = () => {
    if (riderId?.length == 0) {
      showAlert('Please Enter a valid rider id');
      return false;
    } else if (password?.length == 0) {
      showAlert('Please Enter a valid Password');
      return false;
    } else {
      return true;
    }
  };

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

  const handleLogin = async () => {
    if (validate()) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s-]+$/;
    

      if (emailRegex.test(riderId)) {
        Keyboard.dismiss();
        setLoading(true);
        const fcmToken = await messaging().getToken();
        console.log(fcmToken, 'token');
  
        const body = {
          email: riderId.toLocaleLowerCase(),
          password: password,
          fcm_token: fcmToken,
          signup_type: 'email'

        }

      

        fetch(api.login, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(async response => {
            console.log('response  :  ', response);
            console.log({body});
            
            if (response?.status == false) {
              setShowPopUp(true)
              setPopUpColor('red')
              setPopUpMesage(response?.message)
              setTimeout(()=>{
                setShowPopUp(false)
              }, 1000)
              // showAlert(response?.message);
              // showAlert('Invalid Credentials');
            } else {
              console.log(response?.results);
              
              setShowPopUp(true)
              setPopUpMesage('Logged in Successfully')
              setPopUpColor(Colors.Orange)
              setTimeout(()=>{
                setShowPopUp(false)
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Drawer'}],
                });
              }, 1000)
              // // showAlert(response.message, 'green');
              dispatch(setRiderId(response?.user?.rider_id))
              dispatch(setRiderDetails(response?.user))
              // await AsyncStorage.setItem('rider_id', response?.result?.rider_id);
              // await AsyncStorage.setItem(
              //   'rider_detail',
              //   JSON.stringify(response?.result),
              // );
              let wallet = await createRiderWallet(response?.result?.rider_id);
              console.log('wallet  :  ', wallet);
            
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
      }else{
        // setLoading(true);
        console.log('phone');
        
        const fcmToken = await messaging().getToken();
        console.log(fcmToken, 'token');

       const body = {
          email:  riderId,
          password: password,
          fcm_token: fcmToken,
        }
        console.log(body ,'Phone ');
        
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
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={STYLE.topScreenBTn}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={STYLE.heading}>Sign In </Text>

          <CInput
            placeholder="Email/Phone Number"
            value={riderId}
            onChangeText={text => setRiderid(text)}
          />

          <CInput
            placeholder="Password"
            secureTextEntry={!showPass}
            value={password}
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

          <TouchableOpacity
            onPress={() => {
                navigation.navigate('ForgetPassword', {
                  rider_id: riderId,
                });
            }}
            style={{
              width: 190,
              alignSelf: 'flex-end',
              marginTop: -25,
              paddingVertical: 10,
            }}>
            <Text style={{...STYLE.txtForgotPassword, marginTop: 0}}>
              Forget Password?
            </Text>
          </TouchableOpacity>

          <CButton
            title="SIGN IN"
            height={hp(6.2)}
            marginTop={hp(10)}
            width={wp(88)}
            loading={loading}
            onPress={() => {
              handleLogin();
              // setCount(count + 1);
              // if (count > 1) {
              //   // StatusBar.setTranslucent(false);
              //   navigation?.navigate('Drawer');
              //   // navigation.navigate('Home');
              // } else {
              //   ref_RBSheet?.current?.open();
              // }
            }}
          />

          {/* <Text style={STYLE.orText}>
            —— Or ——
          </Text>
          <View style={STYLE.socialIconContainer}>
            <TouchableOpacity
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

      <RBSheetSuccess
        refRBSheet={ref_RBSheet}
        title={
          'Your Documents are being checked we will notify you about result'
        }
        textColor={'#68686E'}
        titleStyle={{
          fontSize: RFPercentage(2.2),
          width: wp(80),
          lineHeight: 20,
          fontFamily: Fonts.PlusJakartaSans_Medium,
        }}
        btnText={'CLOSE'}
        onPress={() => {
          ref_RBSheet?.current?.close();
        }}
      />
      {/* <CRBSheetComponent
          height={170}
          refRBSheet={btmSheetRef}
          content={
            <View style={{ width: wp(90) }} >
              <View style={STYLE.rowViewSB1}>
                <Text style={STYLE.rbSheetHeading}>Select an option</Text>
                <TouchableOpacity
                  onPress={() => closeBtmSheet()}>
                  <Ionicons name={'close'} size={22} color={'#1E2022'} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={STYLE.rowView} onPress={() =>toggleSelection('phone')} >
                <RadioButton color={Colors.Orange} uncheckedColor={Colors.Orange} status={signUpWith === 'phone' ? 'checked' : 'unchecked'} onPress={() =>toggleSelection('phone')}/>
                <Text
                  style={{
                    color: '#56585B',
                    fontFamily: Fonts.PlusJakartaSans_Regular,
                    fontSize: RFPercentage(2),
                    marginLeft: wp(4)
                  }}>
                  Phone Number
                </Text>

              </TouchableOpacity  >
              <ItemSeparator />
              <TouchableOpacity style={STYLE.rowView} onPress={() => toggleSelection('email')}>
                <RadioButton color={Colors.Orange} uncheckedColor={Colors.Orange} status={signUpWith === 'email' ? 'checked' : 'unchecked'} onPress={() => toggleSelection('email')} />
                <Text
                  style={{
                    color: '#56585B',
                    fontFamily: Fonts.PlusJakartaSans_Regular,
                    fontSize: RFPercentage(2),
                    marginLeft: wp(4)
                  }}>
                  Email
                </Text>

              </TouchableOpacity  >
            </View>
          }

        /> */}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
