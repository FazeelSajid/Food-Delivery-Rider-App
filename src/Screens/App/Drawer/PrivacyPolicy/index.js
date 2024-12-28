import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import { Fonts} from '../../../../constants';
import StackHeader from '../../../../components/Header/StackHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const PrivacyPolicy = () => {
  const {Colors} = useSelector(store => store.auth)
  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
      paddingHorizontal: 25,
      marginTop: hp(1.5),
      paddingBottom: 20,
    },
    text: {
      color: Colors.secondary_text,
      fontFamily: Fonts.PlusJakartaSans_Regular,
      fontSize: RFPercentage(1.5),
      lineHeight: 25,
    },
  });

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.White}}>
    <StackHeader title={'Privacy Policy'} headerStyle={{paddingBottom: 10}} />

    <View style={styles.textContainer}>
      <Text style={styles.text}>
      At Food Delivery Rider, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your data when you use our app. When you register for our service, we may collect personal information such as your name, email address, phone number, and delivery address to facilitate your food orders. We may also gather data about your device and usage patterns to enhance your experience and improve our services. We use your information to process your orders, communicate with you about your delivery, send you promotional offers, and provide customer support. Your data may be shared with third-party partners, such as payment processors and delivery services, solely for the purpose of fulfilling your orders. We take the security of your information seriously and implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse. You have the right to access, correct, or delete your personal information at any time by contacting our support team. By using our app, you consent to the collection and use of your information as outlined in this Privacy Policy. We may update this policy from time to time, and we will notify you of any significant changes. Your continued use of the app after such changes indicates your acceptance of the new terms. If you have any questions or concerns regarding this policy, please reach out to our customer support team.
      </Text>
    </View>
  </ScrollView>
  );
};

export default PrivacyPolicy;
