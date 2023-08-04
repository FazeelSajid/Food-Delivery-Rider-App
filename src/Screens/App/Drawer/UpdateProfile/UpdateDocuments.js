import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import {Colors, Images, Fonts, Icons} from '../../../../constants';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {chooseImageFromCamera} from '../../../../utils/helpers';
import {RFPercentage} from 'react-native-responsive-fontsize';

const UpdateDocuments = ({navigation, route}) => {
  const [frontIDCard, setFrontIDCard] = useState(null);
  const [backIDCard, setBackIDCard] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const handleUploadImage = async type => {
    chooseImageFromCamera()
      .then(res => {
        if (res) {
          if (type == 'front') {
            setFrontIDCard(res);
          } else if (type == 'back') {
            setBackIDCard(res);
          } else {
            setDrivingLicense(res);
          }
        }
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 35}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Profile'} />

        <View style={{flex: 1, height: hp(90), paddingBottom: 28}}>
          <TouchableOpacity disabled={true} style={styles.fileContainer}>
            {frontIDCard ? (
              <Image source={{uri: frontIDCard?.path}} style={styles.image} />
            ) : (
              <>
                {/* <Icons.UploadFile />
                <Text style={styles.description}>Front ID card Image</Text> */}
                <Image source={Images.idCardFront} style={styles.image} />
              </>
            )}
            <CButton
              style={styles.btn}
              textStyle={styles.btnText}
              title="Change"
              width={90}
              height={32}
              onPress={() => handleUploadImage('front')}
            />
          </TouchableOpacity>
          <Text style={styles.imageTitle}>Font id card image</Text>
          <TouchableOpacity disabled={true} style={styles.fileContainer}>
            {backIDCard ? (
              <Image source={{uri: backIDCard?.path}} style={styles.image} />
            ) : (
              <>
                {/* <Icons.UploadFile />
                <Text style={styles.description}>Back ID card Image</Text> */}
                <Image source={Images.idCardBack} style={styles.image} />
              </>
            )}
            <CButton
              style={styles.btn}
              textStyle={styles.btnText}
              title="Change"
              width={90}
              height={32}
              onPress={() => handleUploadImage('back')}
            />
          </TouchableOpacity>
          <Text style={styles.imageTitle}>Back id card image</Text>
          <TouchableOpacity disabled={true} style={styles.fileContainer}>
            {drivingLicense ? (
              <Image
                source={{uri: drivingLicense?.path}}
                style={styles.image}
              />
            ) : (
              <>
                {/* <Icons.UploadFile />
                <Text style={styles.description}>Driving License</Text> */}
                <Image source={Images.drivingLicense} style={styles.image} />
              </>
            )}
            <CButton
              style={styles.btn}
              textStyle={styles.btnText}
              title="Change"
              width={90}
              height={32}
              onPress={() => handleUploadImage('driving')}
            />
          </TouchableOpacity>
          <Text style={styles.imageTitle}>Driver’s License</Text>
          <CButton
            title="Continue"
            marginTop={15}
            onPress={() => navigation.navigate('UpdateVehicleInfo')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateDocuments;

const styles = StyleSheet.create({
  description: {
    color: '#979797',
    fontFamily: Fonts.Inter_Regular,
    marginVertical: 10,
  },
  fileContainer: {
    width: wp(90),
    height: hp(23),
    // flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 35,
    // marginBottom: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageTitle: {
    textAlign: 'center',
    color: '#191A26',
    fontFamily: Fonts.Inter_Bold,
    fontSize: RFPercentage(1.5),
    letterSpacing: 0.5,
    marginVertical: 12,
  },
  btn: {
    position: 'absolute',
    right: 5,
    top: -15,
  },
  btnText: {
    textTransform: 'capitalize',
  },
});
