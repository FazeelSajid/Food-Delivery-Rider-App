import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../constants';
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

const ForgetPassword = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const validate = async () => {
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
    // if (await validate()) {
    navigation.replace('Verification');
    // }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <StackHeader title={''} backIconColor={'#1D1D20'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
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
              height: hp(40),
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            <CButton
              title="SEND CODE"
              height={hp(6)}
              width={wp(85)}
              onPress={() => handleSendCode()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 35,
    width: wp(90),
    marginVertical: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 20,
  },
});
