// import React, {useState, useEffect} from 'react';

// import {
//   Button,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
//   ScrollView,
// } from 'react-native';

// import {Colors, Fonts, Icons} from '../../constants';
// import StackHeader from '../../components/Header/StackHeader';
// import {RFPercentage} from 'react-native-responsive-fontsize';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import CButton from '../../components/Buttons/CButton';
// import CPaperInput from '../../components/TextInput/CPaperInput';
// import CInput from '../../components/TextInput/CInput';
// import STYLE from './STYLE';
// import validator from 'validator';
// import Snackbar from 'react-native-snackbar';
// const ForgetPassword = ({navigation, route}) => {
//   const [email, setEmail] = useState('');
//   const validate = async () => {
//     if (email?.length == 0) {
//       Snackbar.show({
//         text: 'Please Enter email address',
//         duration: Snackbar.LENGTH_SHORT,
//         backgroundColor: 'red',
//       });
//       return false;
//     } else if (!validator.isEmail(email)) {
//       Snackbar.show({
//         text: 'Please Enter valid email address',
//         duration: Snackbar.LENGTH_SHORT,
//         backgroundColor: 'red',
//       });
//       return false;
//     } else {
//       return true;
//     }
//   };

//   const handleSendCode = async () => {
//     // if (await validate()) {
//     navigation.navigate('Verification');
//     // }
//   };
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : null}
//       style={{flex: 1}}>
//       <SafeAreaView style={styles.container}>
//         <StackHeader title={''} backIconColor={'#1D1D20'} />
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.inner}>
//             {/* <View
//               style={{
//                 flex: 1,
//                 paddingHorizontal: 20,
//                 alignItems: 'center',
//               }}> */}
//             <View style={STYLE.screenTitleContainer}>
//               <Text style={STYLE.screenTitle}>Forget Password</Text>
//               <Text style={{...STYLE.screenDesc, width: wp(80)}}>
//                 Please enter your email address below. We will send you a
//                 4-digit code to reset your password.
//               </Text>
//             </View>

//             <CInput
//               placeholder="Email Address"
//               keyboardType="email-address"
//               width={wp(85)}
//               value={email}
//               onChangeText={text => setEmail(text)}
//             />
//             <View
//               style={{
//                 // height: hp(40),
//                 flex: 1,
//                 justifyContent: 'flex-end',
//                 paddingBottom: 30,
//               }}>
//               <CButton
//                 title="SEND CODE"
//                 height={hp(6)}
//                 width={wp(85)}
//                 onPress={() => handleSendCode()}
//               />
//             </View>
//             {/* </View> */}
//             {/* <Text style={styles.header}>Header</Text> */}
//             {/* <TextInput placeholder="Username" style={styles.input} />
//             <TextInput placeholder="Password" style={styles.input} />
//             <TextInput placeholder="Confrim Password" style={styles.input} /> */}

//             {/* <View style={styles.btnContainer}>
//               <Button title="Submit" onPress={() => null} />
//             </View> */}
//             <View style={{flex: 1}} />
//           </View>
//         </TouchableWithoutFeedback>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'white',
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//   },
//   input: {
//     height: 40,
//     borderColor: '#000000',
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: 'white',
//     marginTop: 12,
//   },
// });

// export default ForgetPassword;

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Colors, Fonts, Icons} from '../../constants';
import StackHeader from '../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CButton from '../../components/Buttons/CButton';
import CPaperInput from '../../components/TextInput/CPaperInput';
import CInput from '../../components/TextInput/CInput';
import STYLE from './STYLE';
import validator from 'validator';
import Snackbar from 'react-native-snackbar';
import {useKeyboard} from '../../utils/UseKeyboardHook';
import {showAlert} from '../../utils/helpers';
import api from '../../constants/api';

const ForgetPassword = ({navigation, route}) => {
  const keyboardHeight = useKeyboard();
  const scrollViewRef = useRef();

  useEffect(() => {
    console.log('keyboardHeight : ', keyboardHeight);
    scrollViewRef.current?.scrollToEnd();
  }, [keyboardHeight]);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (email?.length == 0) {
      Snackbar.show({
        text: 'Please Enter email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else if (!validator.isEmail(email)) {
      Snackbar.show({
        text: 'Please Enter valid email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSendCode = async () => {
    if (validate()) {
      // navigation.navigate('Verification');
      setLoading(true);
      fetch(api.send_email, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async response => {
          // console.log('response  :  ', response);
          if (response?.success == false) {
            showAlert(response?.message);

          } else {
            // console.log(response.userID);
            
            navigation.replace('Verification', {
              data: response?.userID,
              rider_id: response.userID.rider_id,
              otp: response?.otp
            });
          }
        })
        .catch(err => {
          console.log('Error in send email :  ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}>
        <StackHeader title={''} backIconColor={Colors.primary_text} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={STYLE.screenTitleContainer}>
            <Text style={STYLE.screenTitle}>Forget Password</Text>
            <Text style={{...STYLE.screenDesc, width: wp(80)}}>
              Please enter your email address below. We will send you a 4-digit
              code to reset your password.
            </Text>
          </View>
          <CInput
            placeholder="Email Address"
            keyboardType="email-address"
            width={wp(85)}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <View
            style={{
              // height: hp(40),
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            <CButton
              title="SEND CODE"
              height={hp(6)}
              width={wp(85)}
              loading={loading}
              onPress={() => handleSendCode()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 35,
    width: wp(90),
    marginVertical: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 20,
  },
});
