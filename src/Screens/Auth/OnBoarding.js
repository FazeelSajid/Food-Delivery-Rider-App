import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CButton from '../../components/Buttons/CButton';
import {Colors, Fonts, Icons, Images} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from '../../Assets/svg/Onboarding.svg';

const OnBoarding = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <Image source={Images.onboardingLogo} style={styles.logo} />
      {/* <Onboarding/> */}

      <Text style={styles.heading}>Welcome to Food Delivery</Text>
      <Text style={styles.description}>
      Join our community of drivers and start earning today.
      </Text>
      <CButton
        title="Let’s Get Started"
        height={hp(6.2)}
        marginTop={hp(15)}
        width={wp(85)}
        onPress={async () => {
          // await AsyncStorage.setItem('isFirstLaunch', 'true');
          navigation.replace('SignIn');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp(38),
    width: wp(94),
    resizeMode: 'contain',
    marginBottom: hp(3),
  },
  heading: {
    color: Colors.Black,
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    fontSize: RFPercentage(3),
    width: wp(100),
    textAlign: 'center',
    textTransform: 'capitalize',
    marginVertical: 10,
    letterSpacing: 1,
  },
  description: {
    textAlign: 'center',
    color: '#393939B2',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    width: wp(90),
    lineHeight: 20,
    fontSize: RFPercentage(1.8),
    textTransform: 'capitalize',
  },
});

export default OnBoarding;
