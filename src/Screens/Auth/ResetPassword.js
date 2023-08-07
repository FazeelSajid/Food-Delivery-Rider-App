import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Colors, Fonts, Icons, Images} from '../../constants';
import StackHeader from '../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CButton from '../../components/Buttons/CButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SuccessModal from '../../components/Modal/SuccessModal';
import STYLE from './STYLE';
import Feather from 'react-native-vector-icons/Feather';
import CInput from '../../components/TextInput/CInput';
import CRBSheetComponent from '../../components/BottomSheet/CRBSheetComponent';
import Lottie from 'lottie-react-native';
import RBSheetSuccess from '../../components/BottomSheet/RBSheetSuccess';
import Snackbar from 'react-native-snackbar';
import {useKeyboard} from '../../utils/UseKeyboardHook';
const ResetPassword = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();
  const [showNewPass, setShowNewPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    if (password?.length == 0) {
      Snackbar.show({
        text: 'Please enter password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else if (confirmPassword?.length == 0) {
      Snackbar.show({
        text: 'Please enter confirm password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else if (password !== confirmPassword) {
      Snackbar.show({
        text: 'Password and confirm password are not matched',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else {
      return true;
    }
  };

  const handleUpdate = async () => {
    // if (validate()) {
    ref_RBSheet?.current?.open();
    // }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}>
        <StackHeader title={''} backIconColor={'#1D1D20'} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={STYLE.screenTitleContainer}>
            <Text style={STYLE.screenTitle}>Reset Password</Text>
            <Text style={STYLE.screenDesc}>
              Your password must be at least 8 characters long and contain a
              combination of letters, numbers, and special characters.
            </Text>
          </View>
          <CInput
            placeholder="Password"
            secureTextEntry={!showNewPass}
            value={password}
            onChangeText={text => setPassword(text)}
            width={wp(85)}
            rightContent={
              <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                <Feather
                  name={!showNewPass ? 'eye-off' : 'eye'}
                  size={20}
                  color={'#39393999'}
                />
              </TouchableOpacity>
            }
          />
          <CInput
            placeholder="Confirm Password"
            secureTextEntry={!showOldPass}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            width={wp(85)}
            rightContent={
              <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)}>
                <Feather
                  name={!showOldPass ? 'eye-off' : 'eye'}
                  size={20}
                  color={'#39393999'}
                />
              </TouchableOpacity>
            }
          />
          <View
            style={{
              // height: hp(36),
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            <CButton
              title="UPDATE"
              height={hp(6)}
              width={wp(85)}
              onPress={() => handleUpdate()}
            />
          </View>
        </View>
      </ScrollView>

      {/* <CRBSheetComponent
          refRBSheet={ref_RBSheet}
          content={
            <View style={{width: wp(87), alignItems: 'center'}}>
              <View
                style={{
                  height: 150,
                  width: 150,
                  marginBottom: 10,
                  //   aspectRatio: 1,
                }}>
                <Lottie
                  source={Images.success_check}
                  autoPlay
                  loop={true}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={{
                  color: '#1D1D20',
                  fontSize: RFPercentage(2.5),
                  fontFamily: Fonts.PlusJakartaSans_SemiBold,
                }}>
                Password Reset Successfully
              </Text>
              <CButton
                title="GO TO SIGN IN"
                width={wp(85)}
                height={hp(6)}
                marginTop={hp(5)}
                onPress={() => {
                  ref_RBSheet?.current?.close();
                  navigation.replace('SignIn');
                }}
              />
            </View>
          }
        /> */}

      <RBSheetSuccess
        refRBSheet={ref_RBSheet}
        title={'Password Reset Successfully'}
        btnText={'GO TO SIGN IN'}
        onPress={() => {
          ref_RBSheet?.current?.close();
          navigation?.popToTop();
          navigation.replace('SignIn');
        }}
      />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 35,
    width: wp(90),
    // marginVertical: 80,
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
