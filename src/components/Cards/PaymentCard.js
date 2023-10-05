import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Fonts, Images} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';

const PaymentCard = ({style, title}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#E6E7EB',
        paddingVertical: 5,
        // flex: 1,
        minHeight: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        marginVertical: 10,
        ...style,
      }}>
      <Image
        source={Images.master_card}
        style={{height: 50, width: 50, resizeMode: 'contain'}}
      />
      <Text
        style={{
          color: '#02010E',
          fontFamily: Fonts.PlusJakartaSans_Medium,
          fontSize: RFPercentage(2),
          marginLeft: 15,
        }}>
        {title ? title : 'Master Card'}
      </Text>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({});
