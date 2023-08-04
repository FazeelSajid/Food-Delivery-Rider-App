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

const UpdateVehicleInfo = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const textInput_HEIGHT = 42;
  const [vehicle, setVehicle] = useState({
    owner: '',
    modal: '',
    name: '',
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
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

          <CButton
            title="Continue"
            marginTop={hp(43)}
            onPress={() => ref_RBSheet?.current?.open()}
          />
        </View>
      </ScrollView>
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
