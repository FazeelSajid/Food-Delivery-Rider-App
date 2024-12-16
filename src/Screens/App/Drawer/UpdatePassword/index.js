import {View, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import CInput from '../../../../components/TextInput/CInput';
import Feather from 'react-native-vector-icons/Feather';
import CButton from '../../../../components/Buttons/CButton';
import RBSheetSuccess from '../../../../components/BottomSheet/RBSheetSuccess';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useKeyboard} from '../../../../utils/UseKeyboardHook';
import {showAlert} from '../../../../utils/helpers';
import Loader from '../../../../components/Loader';
import api from '../../../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../constants';

const UpdatePassword = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();
  const { rider_id } = useSelector(store => store.auth)


  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
    // scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();

  const [loading, setLoading] = useState(false);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  //
  const [visibleOldPass, setVisibleOldPass] = useState(false);
  const [visibleNewPass, setVisibleNewPass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);

  const clearStates = () => {
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    setVisibleOldPass('');
    setVisibleNewPass('');
    setVisibleConfirmPass('');
  };

  const validate = () => {
    if (newPass?.length == 0) {
      showAlert('Please enter password');
      return false;
    } else if (confirmPass?.length == 0) {
      showAlert('Please enter confirm password');
      return false;
    } else if (newPass !== confirmPass) {
      showAlert('Password and confirm password are not matched');
      return false;
    } else {
      return true;
    }
  };

  const handleUpdatePassword = async () => {
    if (validate()) {
      // let rider_id = await AsyncStorage.getItem('rider_id');
      Keyboard.dismiss();
      // ref_RBSheet?.current?.open();
      setLoading(true);
      fetch(api.update_password, {
        method: 'PUT',
        body: JSON.stringify({
          rider_id: rider_id,
          password: newPass,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  of update password :  ', response);
          if (response?.error == true) {
            showAlert(response?.message);
          } else {
            setIsVisible(true);
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
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader loading={loading} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 25}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Password'} />
        <View
          style={{
            // height: hp(75),
            flex: 1,
            paddingVertical: 15,
          }}>
          {/* <CInput
            width={wp(87)}
            placeholder="Old Password"
            value={oldPass}
            onChangeText={text => setOldPass(text)}
            secureTextEntry={!visibleOldPass}
            rightContent={
              <TouchableOpacity
                onPress={() => setVisibleOldPass(!visibleOldPass)}>
                <Feather
                  name={!visibleOldPass ? 'eye' : 'eye-off'}
                  size={15}
                  color={'#B0B0B0'}
                />
              </TouchableOpacity>
            }
          /> */}
          <CInput
            width={wp(87)}
            placeholder="New Password"
            value={newPass}
            onChangeText={text => setNewPass(text)}
            secureTextEntry={!visibleNewPass}
            rightContent={
              <TouchableOpacity
                onPress={() => setVisibleNewPass(!visibleNewPass)}>
                <Feather
                  name={!visibleNewPass ? 'eye' : 'eye-off'}
                  size={15}
                  color={Colors.secondary_text}
                />
              </TouchableOpacity>
            }
          />
          <CInput
            width={wp(87)}
            placeholder="Confirm Password"
            value={confirmPass}
            onChangeText={text => setConfirmPass(text)}
            secureTextEntry={!visibleConfirmPass}
            rightContent={
              <TouchableOpacity
                onPress={() => setVisibleConfirmPass(!visibleConfirmPass)}>
                <Feather
                  name={!visibleConfirmPass ? 'eye' : 'eye-off'}
                  size={15}
                  color={Colors.secondary_text}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'flex-end',
          }}>
          <CButton
            title="Update"
            width={wp(87)}
            onPress={() => {
              handleUpdatePassword();
            }}
          />
        </View>
        <RBSheetSuccess
          refRBSheet={ref_RBSheet}
          title={'Password Updated Successfully'}
          btnText={'OK'}
          onPress={() => {
            ref_RBSheet?.current?.close();
            clearStates();
            navigation?.goBack();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default UpdatePassword;
