

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Fonts, Icons} from '../../constants';
import StackHeader from '../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CButton from '../../components/Buttons/CButton';
import CPaperInput from '../../components/TextInput/CPaperInput';
import CInput from '../../components/TextInput/CInput';
import STYLE from './STYLE';
import validator from 'validator';
import Snackbar from 'react-native-snackbar';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import {showAlert} from '../../utils/helpers';
import api from '../../constants/api';
import { useSelector } from 'react-redux';

const ForgetPassword = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    console.log('keyboardHeight : ', keyboardHeight);
    scrollViewRef.current?.scrollToEnd();
  }, [keyboardHeight]);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {Colors, } = useSelector(store => store.auth)

  const validate = () => {
    if (email?.length == 0) {
      Snackbar.show({
        text: 'Please Enter email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else if (!validator.isEmail(email)) {
      Snackbar.show({
        text: 'Please Enter valid email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSendCode = async () => {
    if (validate()) {
      // navigation.navigate('Verification');
      setLoading(true);
      fetch(api.send_email, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          // console.log('response  :  ', response);
          if (response?.success == false) {
            showAlert(response?.message);

          } else {
            // console.log(response.userID);
            
            navigation.replace('Verification', {
              data: response?.userID,
              rider_id: response.userID.rider_id,
              otp: response?.otp
            });
          }
        })
        .catch(err => {
          console.log('Error in send email :  ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}>
        <StackHeader title={''} backIconColor={Colors.primary_text} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={STYLE.screenTitleContainer}>
            <Text style={STYLE.screenTitle}>Forget Password</Text>
            <Text style={{...STYLE.screenDesc, width: wp(80)}}>
              Please enter your email address below. We will send you a 4-digit
              code to reset your password.
            </Text>
          </View>
          <CInput
            placeholder="Email Address"
            keyboardType="email-address"
            width={wp(85)}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <View
            style={{
              // height: hp(40),
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            <CButton
              title="SEND CODE"
              height={hp(6)}
              width={wp(85)}
              loading={loading}
              onPress={() => handleSendCode()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;

