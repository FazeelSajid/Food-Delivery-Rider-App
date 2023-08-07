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

const UpdateVehicleInfo = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
    // scrollViewRef.current?.scrollTo({y: 150});
  }, [keyboardHeight]);

  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 42;
  const [vehicle, setVehicle] = useState({
    owner: '',
    modal: '',
    name: '',
  });

  return (
    <View style={{flex: 1, height: hp(100), backgroundColor: Colors.White}}>
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

              onPress={() => ref_RBSheet?.current?.open()}
            />
          </View>
        </View>
        <RBSheetSuccess
          refRBSheet={ref_RBSheet}
          title={'Profile Updated Successfully'}
          // textColor={'#68686E'}
          btnText={'OK'}
          onPress={() => {
            ref_RBSheet?.current?.close();
            navigation?.popToTop();
            navigation?.navigate('Drawer');
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
