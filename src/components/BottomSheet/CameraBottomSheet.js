import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../../constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CameraBottomSheet = ({refRBSheet, onCameraPick, onGalleryPick}) => {
  const navigation = useNavigation();

  const takePhotoFromCamera = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    await launchCamera(options)
      .then(async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
        } else {
          let image1 = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          // setImage(image1);
          onCameraPick(image1);
        }
      })
      .catch(err => {
        console.log('error  :  ', err);
      });
  };

  const choosePhotoFromLibrary = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    await launchImageLibrary(options)
      .then(async res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
        } else {
          let image1 = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          // setImage(image1);
          onGalleryPick(image1);
        }
      })
      .catch(err => {
        console.log('error  :  ', err);
      });
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="fade"
      minClosingHeight={0}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        },
        draggableIcon: {
          backgroundColor: Colors.White,
        },
        container: {
          borderTopLeftRadius: wp(8),
          borderTopRightRadius: wp(8),
          height: hp(25),
          backgroundColor: Colors.White,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp(8),
          alignItems: 'center',
        }}>
        <Text style={styles.maintext}>Upload Image</Text>
        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
          <Ionicons
            name="close"
            size={22}
            color={'#000'}
            onPress={() => refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: 'center',
          marginTop: hp(3),
          backgroundColor: Colors.White,
        }}>
        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
            refRBSheet.current.close();
          }}
          style={styles.modaltextview}>
          <Ionicons name="camera" size={25} color={'#000'} />
          <Text style={styles.optiontext}>Upload from Camera</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'rgba(52, 52, 52, 0.5)',
            borderBottomWidth: hp(0.1),
            width: wp(85),
            alignSelf: 'center',
            marginBottom: hp(2),
            marginTop: hp(2),
          }}></View>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            choosePhotoFromLibrary();
          }}
          style={styles.modaltextview}>
          <Ionicons name="image" size={25} color={'#000'} />
          <Text style={styles.optiontext}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default CameraBottomSheet;

const styles = StyleSheet.create({
  bottomtext: {
    color: 'black',
    textAlign: 'center',
    fontFamily: Fonts.Inter_Bold,
    fontSize: hp(3),
  },
  optiontext: {
    fontSize: hp(1.7),
    color: '#000',
    fontFamily: Fonts.PlusJakartaSans_Regular,
    marginLeft: wp(4),
  },
  maintext: {
    fontSize: hp(2),
    color: '#000',
    fontFamily: Fonts.PlusJakartaSans_Medium,
  },
  modaltextview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
    borderRadius: 25,
    // backgroundColor: Colors.AppBckGround_color,
    paddingHorizontal: wp(10),
  },
});
