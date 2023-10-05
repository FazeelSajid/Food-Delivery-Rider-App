import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import StackHeader from '../../../../components/Header/StackHeader';
import {Colors, Fonts, Images, Icons} from '../../../../constants';
import CInput from '../../../../components/TextInput/CInput';
import CButton from '../../../../components/Buttons/CButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import RBSheetSuccess from '../../../../components/BottomSheet/RBSheetSuccess';
import {useKeyboard} from '../../../../utils/UseKeyboardHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../../constants/api';
import Loader from '../../../../components/Loader';
import {showAlert} from '../../../../utils/helpers';
import {CommonActions} from '@react-navigation/native';

const UpdateVehicleInfo = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
    // scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 42;
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({
    owner: '',
    modal: '',
    name: '',
  });

  const handleSubmit = async () => {
    // ref_RBSheet?.current?.open()
    setLoading(true);
    let rider_id = await AsyncStorage.getItem('rider_id');
    let {
      country,
      photo,
      cnic,
      address,
      dob,
      gender,
      email,
      name,
      location,
      phone,
      id_card_front_image,
      id_card_back_image,
      driving_license_image,
    } = route.params;
    let data = {
      rider_id: rider_id,
      country: country,
      photo: photo,
      cnic: cnic,
      address: address,
      dob: dob,
      gender: gender,
      driver_license: driving_license_image,
      id_card_front_image: id_card_front_image,
      id_card_back_image: id_card_back_image,

      email: email,
      name: name,
      location: location,
      phone: phone,

      vehicle_model: vehicle.modal,
      vehicle_name: vehicle.name,
      vehicle_ownership: vehicle.owner,
    };
    console.log('data  :  ', data);

    fetch(api.create_update_profile_request, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('response  :  ', response);
        if (response?.status == false) {
          showAlert(response?.message);
        } else {
          // showAlert(response.message, 'green');
          ref_RBSheet?.current?.open();
        }
      })
      .catch(err => {
        console.log('Error in create restaurant api :  ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getData = async () => {
    setIsFetching(true);
    let rider_id = await AsyncStorage.getItem('rider_id');
    fetch(api.get_rider_details_by_id + rider_id)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          let riderDetails = response?.result;
          setVehicle({
            owner: riderDetails?.vehicle_ownership,
            modal: riderDetails?.vehicle_model,
            name: riderDetails?.vehicle_name,
          });
        } else {
          showAlert(response?.message);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        showAlert('Something went wrong');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, height: hp(100), backgroundColor: Colors.White}}>
      <Loader loading={isFetching} />
      <ScrollView
        ref={scrollViewRef}
        // style={{flex: 1, height: 600, backgroundColor: 'red'}}
        contentContainerStyle={{
          flexGrow: 1,
          // height: hp(100),
        }}
        keyboardShouldPersistTaps="handled">
        <StackHeader title={'Update Profile'} />

        <View style={{flex: 1}}>
          <CInput
            heading={'Vehicle Ownership'}
            headingStyle={styles.headingStyle}
            // placeholder="John Doe"
            value={vehicle.owner}
            onChangeText={text => setVehicle({...vehicle, owner: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Vehicle Model'}
            headingStyle={styles.headingStyle}
            // placeholder="Corolla"
            value={vehicle.modal}
            onChangeText={text => setVehicle({...vehicle, modal: text})}
            height={textInput_HEIGHT}
          />
          <CInput
            heading={'Vehicle Name'}
            headingStyle={styles.headingStyle}
            // placeholder="Toyota Corolla"
            value={vehicle.name}
            onChangeText={text => setVehicle({...vehicle, name: text})}
            height={textInput_HEIGHT}
          />

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <CButton
              title="Continue"
              width={wp(89)}
              // marginTop={hp(43)}
              loading={loading}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
        <RBSheetSuccess
          refRBSheet={ref_RBSheet}
          // title={'Profile Updated Successfully'}
          title={'Your profile update request has been sent to the admin.'}
          textColor={'#68686E'}
          btnText={'OK'}
          onPress={() => {
            ref_RBSheet?.current?.close();
            // navigation?.popToTop();
            // navigation?.navigate('Drawer');
            // To remove all screens and navigate to a new screen:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {name: 'Drawer'}, // Replace 'NewScreenName' with the name of the screen you want to navigate to.
                ],
              }),
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default UpdateVehicleInfo;

const styles = StyleSheet.create({
  headingStyle: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    marginBottom: 10,
    marginTop: -5,
    fontSize: RFPercentage(1.7),
    letterSpacing: 0.5,
  },
});
