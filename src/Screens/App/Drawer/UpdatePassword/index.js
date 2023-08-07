import {View, TouchableOpacity, ScrollView} from 'react-native';
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

const UpdatePassword = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
    // scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();

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
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
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
          <CInput
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
          />
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
                  color={'#B0B0B0'}
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
                  color={'#B0B0B0'}
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
              setIsVisible(true);
              ref_RBSheet?.current?.open();
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
