import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../components/Header/StackHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CButton from '../../components/Buttons/CButton';
import STYLE from './STYLE';
import Feather from 'react-native-vector-icons/Feather';
import CInput from '../../components/TextInput/CInput';
import RBSheetSuccess from '../../components/BottomSheet/RBSheetSuccess';
import Snackbar from 'react-native-snackbar';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import api from '../../constants/api';
import {showAlert} from '../../utils/helpers';
import { useSelector } from 'react-redux';

const ResetPassword = ({navigation, route}) => {
  //
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { Colors } = useSelector(store => store.auth)

  const validatePassword = password => {
    // Regular expression pattern to match passwords
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Test if the password matches the pattern
    return passwordPattern.test(password);
  };

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
    if (validate()) {
      Keyboard.dismiss();
      // ref_RBSheet?.current?.open();
      setLoading(true);
      fetch(api.update_password, {
        method: 'PUT',
        body: JSON.stringify({
          rider_id: route?.params?.rider_id,
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  :  ', response);
          if (response?.status == false) {
            showAlert(response?.message);
          } else {
            ref_RBSheet?.current?.open();
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
    <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}>
        <StackHeader title={''} backIconColor={Colors.button.icon} />
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
                  color={Colors.secondary_text}
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
                  color={Colors.secondary_text}
                />
              </TouchableOpacity>
            }
          />
          <View
            style={{
              // height: hp(36),
              flex: 2,
              justifyContent: 'flex-end',
            }}>
            <CButton
              title="UPDATE"
              height={hp(6)}
              width={wp(85)}
              loading={loading}
              onPress={() => handleUpdate()}
            />
          </View>
          <View style={{height: 60}} />
        </View>
      </ScrollView>

     

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


