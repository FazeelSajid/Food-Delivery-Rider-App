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

const OnBoarding = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <Image source={Images.onboardingLogo} style={styles.logo} />
      <Text style={styles.heading}>Order your favorite food delivery</Text>
      <Text style={styles.description}>
        Browse an extensive menu featuring mouthwatering dishes from local
        restaurants.
      </Text>
      <CButton
        title="GET STARTED"
        height={hp(6.2)}
        marginTop={hp(15)}
        width={wp(85)}
        onPress={() => navigation.navigate('SignIn')}
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
    height: hp(30),
    width: wp(80),
    resizeMode: 'contain',
    marginBottom: hp(3),
  },
  heading: {
    color: Colors.Black,
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    fontSize: RFPercentage(3),
    width: wp(65),
    textAlign: 'center',
    textTransform: 'capitalize',
    marginVertical: 10,
    letterSpacing: 1,
  },
  description: {
    textAlign: 'center',
    color: '#393939B2',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    width: wp(80),
    lineHeight: 20,
    fontSize: RFPercentage(1.8),
    textTransform: 'capitalize',
  },
});

export default OnBoarding;
