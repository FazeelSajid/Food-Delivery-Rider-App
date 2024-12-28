import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CButton from '../Buttons/CButton';
import { Fonts, Images, Icons} from '../../constants';
import { useSelector } from 'react-redux';

const ConfirmationModal = ({
  visible,
  setVisible,
  onOK,
  onCancel,
  topContent,
  title,
  cancelText,
  okText,
  description,
  buttonContainerStyle,
}) => {
  const { Colors} = useSelector(store => store.auth);

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 30,
        alignItems: 'center',
        marginHorizontal: 25,
        borderRadius: 10,
      }}>
      <View>{topContent}</View>
      <Text
        style={{
          fontFamily: Fonts.PlusJakartaSans_Bold,
          color:Colors.primary_color,
          fontSize: RFPercentage(2.5),
          lineHeight: 30,
        }}>
        {title ? title : 'Alert'}
      </Text>
      <Text
        style={{
          color: '#68686E',
          fontFamily: Fonts.PlusJakartaSans_Medium,
          fontSize: RFPercentage(1.7),
          lineHeight: 20,
          textAlign: 'center',
          marginVertical: 20,
        }}>
        {description
          ? description
          : `Hungry and ready to explore? Before you add scrumptious items to your cart, let's get you signed in!`}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: wp(70),
          ...buttonContainerStyle,
        }}>
        <CButton
          title={cancelText ? cancelText : '"Go Back"'}
          transparent={true}
          width={wp(32)}
          height={hp(5.3)}
          onPress={onCancel ? onCancel : () => setVisible(false)}
        />
        <CButton
          title={okText ? okText : '"Sign In"'}
          width={wp(32)}
          height={hp(5.3)}
          onPress={onOK ? onOK : () => setVisible(false)}
        />
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
