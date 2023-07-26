import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../components/Header/StackHeader';
import {Colors, Fonts, Icons, Images} from '../../constants';
import CInput from '../../components/TextInput/CInput';
import CButton from '../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheetSuccess from '../../components/BottomSheet/RBSheetSuccess';
import {Avatar} from 'react-native-paper';
import {chooseImageFromCamera} from '../../utils/helpers';
import moment from 'moment';
import {RFPercentage} from 'react-native-responsive-fontsize';

const RegistrationDocuments = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const [frontIDCard, setFrontIDCard] = useState(null);
  const [backIDCard, setBackIDCard] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const [file, setFile] = useState(null);

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
  const onDatePick = (event, selectedDate) => {
    console.log('event  :   ', event);
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setDOB(selectedDate);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Registration Request'} />

        <View style={{flex: 1, height: hp(90), paddingBottom: 18}}>
          <Text
            style={{
              marginLeft: 20,
              color: '#0A212B',
              fontFamily: Fonts.PlusJakartaSans_Medium,
              fontSize: RFPercentage(2),
              letterSpacing: 0.6,
              marginBottom: 20,
              marginTop: -10,
            }}>
            Documents
          </Text>
          <TouchableOpacity
            onPress={() => handleUploadImage('front')}
            style={styles.fileContainer}>
            {frontIDCard ? (
              <Image source={{uri: frontIDCard?.path}} style={styles.image} />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Front ID card Image</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUploadImage('back')}
            style={styles.fileContainer}>
            {backIDCard ? (
              <Image source={{uri: backIDCard?.path}} style={styles.image} />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Back ID card Image</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUploadImage('driving')}
            style={styles.fileContainer}>
            {drivingLicense ? (
              <Image
                source={{uri: drivingLicense?.path}}
                style={styles.image}
              />
            ) : (
              <>
                <Icons.UploadFile />
                <Text style={styles.description}>Driving License</Text>
              </>
            )}
          </TouchableOpacity>
          <CButton
            title="Continue"
            marginTop={15}
            onPress={() => ref_RBSheet?.current?.open()}
          />
        </View>
      </ScrollView>
      <RBSheetSuccess
        refRBSheet={ref_RBSheet}
        title={'Your request for registration has been sent to Admin'}
        textColor={'#68686E'}
        btnText={'OK'}
        onPress={() => {
          ref_RBSheet?.current?.close();
          navigation.replace('SignIn');
        }}
      />
    </View>
  );
};

export default RegistrationDocuments;

const styles = StyleSheet.create({
  description: {
    color: '#979797',
    fontFamily: Fonts.Inter_Regular,
    marginVertical: 10,
  },
  fileContainer: {
    width: wp(90),
    // height: hp(23),
    flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 35,
    marginBottom: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
