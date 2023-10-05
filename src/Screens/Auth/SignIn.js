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

const SignIn = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    // scrollViewRef.current?.scrollToEnd();
    scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [riderId, setRiderId] = useState('');
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
      Keyboard.dismiss();
      setLoading(true);
      console.log({riderId, password});
      let fcm_token = await getUserFcmToken();
      fetch(api.login, {
        method: 'POST',
        body: JSON.stringify({
          rider_id: riderId,
          password: password,
          fcm_token: fcm_token,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  :  ', response);
          if (response?.status == false) {
            // showAlert(response?.message);
            showAlert('Invalid Credentials');
          } else {
            // // showAlert(response.message, 'green');
            await AsyncStorage.setItem('rider_id', response?.result?.rider_id);
            await AsyncStorage.setItem(
              'rider_detail',
              JSON.stringify(response?.result),
            );
            let wallet = await createRiderWallet(response?.result?.rider_id);
            console.log('wallet  :  ', wallet);
            // // navigation?.popToTop()
            // navigation?.replace('Drawer');
            navigation.reset({
              index: 0,
              routes: [{name: 'Drawer'}],
            });
          }
        })
        .catch(err => {
          console.log('Error in Login :  ', err);
          showAlert('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <View style={STYLE.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
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
            placeholder="Rider’s ID"
            value={riderId}
            onChangeText={text => setRiderId(text)}
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
              if (riderId?.length == 0) {
                showAlert('Please Enter a valid rider id');
              } else {
                navigation.navigate('ForgetPassword', {
                  rider_id: riderId,
                });
              }
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
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
