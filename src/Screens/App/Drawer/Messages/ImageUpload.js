import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { io } from 'socket.io-client';
import { BASE_URL } from '../../../../utils/globalVariables';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/Buttons/customButton';
import { Modal } from 'react-native-paper';

const ImageUpload = ({ route, navigation }) => {
  const obj = route.params;
  //   const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const { rider_id } = useSelector(store => store.auth)

  const [modalVisible, setModalVisible] = useState(false);
  const socket = obj.socket
  // console.log(socket);


  useEffect(() => {
    // const newSocket = io(BASE_URL);
    // setSocket(newSocket);
  }, []);

  //   console.log({obj});


  const sendMessage = () => {

    socket.emit('sendMessage', {
      roomId: obj.roomId,
      sender_type: 'rider',
      senderId: rider_id,
      receiver_type: obj.receiver_type,
      receiverId: obj.receiverId,
      message,
      image_url: obj.base64,
    });
    setMessage('');
    navigation.goBack();
    console.log({
      roomId: obj.roomId,
      sender_type: 'rider',
      senderId: rider_id,
      receiver_type: obj.receiver_type,
      receiverId: obj.receiverId,
      message,

    });


  };

  return (
   
      <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        
      </View>

        <ImageBackground source={{ uri: obj.path }} style={styles.image} >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              position: 'absolute',
              top: hp(1.3),
              marginLeft: wp(2),
              backgroundColor: Colors.White,
              borderRadius: wp(5),
              padding: wp(1),
              paddingHorizontal: wp(1.3)
            }} >
            <Ionicons
              name={'chevron-back'}
              size={hp(3)}
              color={Colors.Black}
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write message..."
            value={message}
            placeholderTextColor={Colors.grayText}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible}  >

          <View style={styles.modalContainer} >
            <Text style={styles.modalHeading} >Discard Message</Text>
            <Text style={[styles.modalHeading, styles.modalSubHeading]} >Are you sure to discard unsent message</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(10), marginBottom: 0 }} >
              <CustomButton text={'Cancel'} textStyle={styles.cancelBtntext} containerStyle={styles.cancelBtnContainer} pressedRadius={wp(1.5)} onPress={() => setModalVisible(false)} />
              <CustomButton text={'Discard'} pressedRadius={wp(1.5)} textStyle={[styles.cancelBtntext, { color: Colors.White, }]} containerStyle={styles.discardBtnContainer} onPress={() => {
                setModalVisible(false)
                navigation.goBack()
              }} />
            </View>

          </View>

        </Modal>
      </ScrollView>



  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: hp('5')
  },
  image: {
    height: hp('85%'),
    resizeMode: 'cover',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.OrangeExtraLight,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  textInput: {
    flex: 1,
    height: hp('5%'),
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#F9F9F9',
    fontSize: wp('4%'),
    color: Colors.Black,
    fontFamily: Fonts.PlusJakartaSans_Regular,
  },
  sendButton: {
    marginLeft: wp('2%'),
    backgroundColor: Colors.Orange,
    borderRadius: wp('5%'),
    padding: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  modalContainer: { backgroundColor: Colors.White, height: hp(20), width: wp(80), alignSelf: 'center', borderRadius: wp(5), justifyContent: 'space-evenly' },
  modalHeading: { color: Colors.Black, textAlign: 'center', fontSize: RFPercentage(2), fontFamily: Fonts.PlusJakartaSans_Medium },
  modalSubHeading: { fontFamily: Fonts.PlusJakartaSans_Regular, fontSize: RFPercentage(1.7) },
  cancelBtntext: { color: Colors.Orange, fontFamily: Fonts.PlusJakartaSans_Regular },
  cancelBtnContainer: { borderColor: Colors.Orange, borderWidth: wp(0.4), paddingHorizontal: wp(4), paddingVertical: hp(0.5), borderRadius: wp(1.5), alignItems: 'center' },
  discardBtnContainer: { paddingHorizontal: wp(4), paddingVertical: hp(0.5), borderRadius: wp(1.5), alignItems: 'center', backgroundColor: Colors.Orange }
});
