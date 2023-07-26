import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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

const SignIn = ({navigation, route}) => {
  const [showPass, setShowPass] = useState(false);
  const [riderId, setRiderId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={STYLE.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={STYLE.authBGContainer}>
          <Image source={Images.authBG} style={STYLE.authBGImage} />
        </View>
        <TouchableOpacity
          style={STYLE.topScreenBTnContainer}
          //   onPress={() => navigation.navigate('SignUp')}
        >
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
            // onPress={() => navigation.navigate('ForgetPassword')}
            style={{
              width: 190,
              alignSelf: 'flex-end',
            }}>
            <Text style={STYLE.txtForgotPassword}>Forget Password?</Text>
          </TouchableOpacity>

          <CButton
            title="SIGN IN"
            height={hp(6.2)}
            marginTop={hp(10)}
            width={wp(88)}
            // onPress={() => navigation?.navigate('Drawer')}
          />

          <Text style={STYLE.orText}>
            {/* -- Or -- */}
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
