import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';

import Lottie from 'lottie-react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CButton from '../Buttons/CButton';
import {Colors, Fonts, Images, Icons} from '../../constants';

const SuccessModal = ({visible, setVisible, onOK, title, description}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={{
        backgroundColor: 'white',
        paddingBottom: 30,
        alignItems: 'center',
        marginHorizontal: 25,
        borderRadius: 10,
      }}>
      <View
        style={{
          height: 150,
          width: 150,
          marginBottom: 10,
          //   aspectRatio: 1,
          zIndex: 999,
        }}>
        <Lottie
          source={Images.success_check}
          autoPlay
          loop={true}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          fontFamily: Fonts.PlusJakartaSans_Bold,
          color:Colors.primary_color,
          fontSize: RFPercentage(2.5),
          lineHeight: 30,
          marginBottom: 10,
        }}>
        {title ? title : 'Success'}
      </Text>
      <Text
        style={{
          color: '#68686E',
          fontFamily: Fonts.PlusJakartaSans_Medium,
          fontSize: RFPercentage(1.5),
          lineHeight: 20,
          paddingHorizontal: 20,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {description ? description : 'Order Placed Successfully'}
      </Text>
      <CButton
        title="Ok"
        width={wp(70)}
        onPress={onOK ? onOK : () => setVisible(false)}
      />
    </Modal>
  );
};

export default memo(SuccessModal);
