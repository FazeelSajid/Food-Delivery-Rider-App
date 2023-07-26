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

const RegistrationForm = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUploadImage = async item => {
    chooseImageFromCamera()
      .then(res => {
        if (res) {
          setProfileImage(res);
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
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Registration Request'} />

        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => handleUploadImage()}
            style={styles.profileImage}>
            {profileImage ? (
              <Avatar.Image source={{uri: profileImage?.path}} size={wp(25)} />
            ) : (
              <Icons.Profile1 />
            )}
          </TouchableOpacity>
          <CInput
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <CInput
            placeholder="CNIC Number"
            keyboardType="numeric"
            value={CNIC}
            onChangeText={text => setCNIC(text)}
          />
          <CInput
            placeholder="Country"
            value={country}
            onChangeText={text => setCountry(text)}
          />
          <CInput
            placeholder="Address"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <CInput
            placeholder="Location"
            value={location}
            onChangeText={text => setLocation(text)}
          />
          <CInput
            placeholder="Date of Birth"
            value={DOB ? moment(DOB).format('DD/MM/YYYY') : ''}
            onChangeText={text => setDOB(text)}
            editable={false}
            disabled={false}
            onPress={() => setShowDatePicker(!showDatePicker)}
          />
          <CInput
            placeholder="Gender"
            //   keyboardType="numeric"
            value={gender}
            onChangeText={text => setGender(text)}
          />
          <CButton
            title="Continue"
            marginTop={10}
            onPress={() => navigation?.navigate('RegistrationDocuments')}
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={DOB || new Date()}
              mode={'date'}
              display="default"
              locale="es-ES"
              themeVariant="light"
              onChange={onDatePick}
              maximumDate={new Date()}
              style={{
                shadowColor: '#fff',
                shadowRadius: 0,
                shadowOpacity: 1,
                shadowOffset: {height: 0, width: 0},
                color: '#1669F',
                textColor: '#1669F',
              }}
            />
          )}
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

export default RegistrationForm;

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 1,
    borderColor: Colors.Border,
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25) / 2,
    alignSelf: 'center',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
