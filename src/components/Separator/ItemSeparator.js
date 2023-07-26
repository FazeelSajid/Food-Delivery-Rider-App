import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ItemSeparator = ({style}) => (
  <View
    style={{
      height: hp(0.15),
      marginVertical: 15,
      backgroundColor: '#00000026',
      width: wp(90),
      alignSelf: 'center',
      ...style,
    }}
  />
);

export default ItemSeparator;

const styles = StyleSheet.create({});
