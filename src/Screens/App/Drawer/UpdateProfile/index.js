import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import CInput from '../../../../components/TextInput/CInput';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Avatar} from 'react-native-paper';
import {chooseImageFromCamera} from '../../../../utils/helpers';
import moment from 'moment';
import {RFPercentage} from 'react-native-responsive-fontsize';

const UpdateProfile = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 45;
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    image: '',
    username: '',
    phoneNumber: '',
    CNIC: '',
    location: '',
    dob: '',
    gender: '',
  });
  const [DOB, setDOB] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUploadImage = async item => {
    chooseImageFromCamera()
      .then(res => {
        if (res) {
          setUserInfo({...userInfo, image: res});
        }
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };
  const onDatePick = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event?.type == 'set') {
      setUserInfo({...userInfo, dob: selectedDate});
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Profile'} />

        <View style={{flex: 1}}>
          <View style={styles.profileImage}>
            {userInfo.image ? (
              <Avatar.Image
                source={{uri: userInfo.image?.path}}
                size={wp(22)}
              />
            ) : (
              // <Icons.Profile1 />
              <Avatar.Image source={Images.user7} size={wp(22)} />
            )}
            <TouchableOpacity
              style={{position: 'absolute', bottom: 0, right: 0}}
              onPress={() => handleUploadImage()}>
              <Icons.EditSquare />
            </TouchableOpacity>
          </View>

          <CInput
            heading={'Username'}
            headingStyle={styles.headingStyle}
            placeholder="User Name here"
            value={userInfo.username}
            onChangeText={text => setUserInfo({...userInfo, username: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Phone number'}
            headingStyle={styles.headingStyle}
            placeholder="0000 0000000"
            keyboardType="numeric"
            value={userInfo.phoneNumber}
            onChangeText={text => setUserInfo({...userInfo, phoneNumber: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'CNIC Number'}
            headingStyle={styles.headingStyle}
            placeholder="0000-0000000-0"
            keyboardType="numeric"
            value={userInfo.CNIC}
            onChangeText={text => setUserInfo({...userInfo, CNIC: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Location'}
            headingStyle={styles.headingStyle}
            placeholder="lorem ipsum dolo sit"
            value={userInfo.location}
            onChangeText={text => setUserInfo({...userInfo, location: text})}
            height={textInput_HEIGHT}
          />

          <CInput
            heading={'Date of Birth'}
            headingStyle={styles.headingStyle}
            placeholder="00/00/0000"
            value={
              userInfo.dob ? moment(userInfo.dob).format('DD/MM/YYYY') : ''
            }
            editable={false}
            disabled={false}
            onPress={() => setShowDatePicker(!showDatePicker)}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Gender'}
            headingStyle={styles.headingStyle}
            placeholder="Male"
            value={userInfo.gender}
            onChangeText={text => setUserInfo({...userInfo, gender: text})}
            height={textInput_HEIGHT}
          />
          <CButton
            title="Continue"
            marginTop={10}
            onPress={() => navigation?.navigate('UpdateDocuments')}
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
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  profileImage: {
    borderWidth: 1,
    borderColor: Colors.Border,
    width: wp(22),
    height: wp(22),
    borderRadius: wp(22) / 2,
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingStyle: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    marginBottom: 10,
    marginTop: -5,
    fontSize: RFPercentage(1.7),
    letterSpacing: 0.5,
  },
});
