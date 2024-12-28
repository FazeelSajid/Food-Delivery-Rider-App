import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';


const Loader = ({loading, size, color, bgColor}) => {
    const { Colors} = useSelector(store => store.auth);
  
    const styles = StyleSheet.create({
      container : {
        height: hp(100),
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    
      }
    });
  return (
    <Modal visible={loading} transparent={true}>
      <View
        style={[ styles.container, {backgroundColor: bgColor}]}>
        <ActivityIndicator  size={size || "large"} color={color || Colors.primary_color} />
      </View>
    </Modal>
  );
};





export default Loader;
