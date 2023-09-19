import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Snackbar from 'react-native-snackbar';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Colors, Fonts, Icons} from '../../constants';
import StackHeader from '../../components/Header/StackHeader';
import CButton from '../../components/Buttons/CButton';
import STYLE from './STYLE';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import api from '../../constants/api';
import {showAlert} from '../../utils/helpers';
import Loader from '../../components/Loader';

const Verification = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [keyboardHeight]);

  const refOTP = useRef();
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => refOTP.current.focusField(0), 250);
  }, []);

  const validate = () => {
    if (otpCode?.length == 0 || otpCode?.length < 4) {
      Snackbar.show({
        text: 'Please Enter 4 digit OTP code',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else {
      return true;
    }
  };

  const handleVerifyCode = async () => {
    if (validate()) {
      // navigation.replace('ResetPassword');
      setLoading(true);
      fetch(api.verify_otp, {
        method: 'POST',
        body: JSON.stringify({
          email: route?.params?.data?.email,
          otp: otpCode,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  :  ', response);
          if (response?.status == false) {
            setTimeout(() => {
              showAlert('Invalid Otp code');
            }, 500);
          } else {
            navigation?.navigate('ResetPassword', {
              email: route?.params?.data?.email,
              rider_id: route?.params?.rider_id,
            });
          }
        })
        .catch(err => {
          console.log('Error in Login :  ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <StackHeader title={''} backIconColor={'#1D1D20'} />
      <Loader loading={loading} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={STYLE.screenTitleContainer}>
            <Text style={STYLE.screenTitle}>Verification</Text>
            <Text style={{...STYLE.screenDesc, lineHeight: 22}}>
              To ensure the security of your account, we require phone number
              verification
            </Text>
          </View>

          <View style={{width: wp(80), flex: 1}}>
            <OTPInputView
              ref={refOTP}
              style={{
                height: 50,
                marginTop: hp(7),
              }}
              pinCount={4}
              code={otpCode}
              onCodeChanged={code => {
                setOtpCode(code);
              }}
              autoFocusOnLoad={false}
              placeholderCharacter={''}
              placeholderTextColor={'#ABA7AF'}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={{
                ...styles.underlineStyleHighLighted,
              }}
            />
          </View>
          <View
            style={{
              // height: hp(47),
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            <CButton
              title="VERIFY"
              height={hp(6)}
              width={wp(83)}
              onPress={() => handleVerifyCode()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 35,
    width: wp(90),
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 20,
  },
  underlineStyleBase: {
    color: Colors.Text,
    fontSize: 24,
    fontFamily: Fonts.Inter_Medium,
    width: 60,
    height: 50,
    borderRadius: 30,
    borderWidth: 0,
    // borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginHorizontal: 5,
    backgroundColor: '#F5F6FA',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.Orange,
    borderRadius: 30,
    borderWidth: 1,
  },
});
