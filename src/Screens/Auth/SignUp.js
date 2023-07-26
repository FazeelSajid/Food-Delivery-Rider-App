import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Icons, Images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';
import CInput from '../../components/TextInput/CInput';
import Feather from 'react-native-vector-icons/Feather';
import CButton from '../../components/Buttons/CButton';
import STYLE from './STYLE';

const SignUp = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  return (
    <View style={STYLE.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={STYLE.authBGContainer}>
          <Image source={Images.authBG} style={STYLE.authBGImage} />
        </View>
        <TouchableOpacity
          style={STYLE.topScreenBTnContainer}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={STYLE.topScreenBTn}>Sign In</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={STYLE.heading}>Sign Up</Text>

          <CInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <CInput
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNo}
            onChangeText={text => setPhoneNo(text)}
          />

          <CButton
            title="SIGN UP"
            height={hp(6.2)}
            marginTop={hp(12)}
            width={wp(88)}
            onPress={() => navigation.navigate('RegistrationForm')}
          />

          <Text style={STYLE.orText}>-- Or --</Text>
          <View style={STYLE.socialIconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={STYLE.googleIconContainer}>
              <Image source={Images.google} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Icons.Facebook width={wp(13)} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});

// import React, {useRef} from 'react';
// import {
//   View,
//   ImageBackground,
//   Text,
//   ScrollView,
//   Image,
//   KeyboardAvoidingView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {RFPercentage} from 'react-native-responsive-fontsize';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import RBSheetAddLocation from '../../components/BottomSheet/RBSheetAddLocation';
// import CButton from '../../components/Buttons/CButton';

// const SignUp = ({navigation, route}) => {
//   const ref_RBSheet = useRef();
//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.content}
//         keyboardShouldPersistTaps="handled">
//         <StatusBar
//           backgroundColor={'transparent'}
//           barStyle={'light-content'}
//           translucent
//         />
//         <ImageBackground
//           source={require('../../Assets/png/Auth/signInbg.png')}
//           resizeMode="stretch"
//           style={styles.image}>
//           <View style={styles.mainBody}>
//             <View style={styles.header}>
//               <TouchableOpacity
//                 onPress={() => navigation?.goBack()}
//                 style={styles.backIcon}>
//                 <Ionicons name="chevron-back" size={hp(4)} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.textsContainer}>
//               <Text style={styles.mainText}>Food Delivery App</Text>
//               <Text
//                 style={{...styles.descriptionText, paddingHorizontal: wp(11)}}>
//                 Access your account and take your dining experience to the next
//                 level
//               </Text>
//             </View>
//             <View style={styles.inputsbuttonContainer}>
//               <View style={styles.inputsContainer}>
//                 <View
//                   style={{
//                     ...styles.inputButton,
//                     flexDirection: 'row',
//                     backgroundColor: '#FFFFFF',
//                     opacity: 0.7,
//                     marginTop: hp(4),
//                   }}>
//                   <View
//                     style={{
//                       ...styles.iconContainer,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <FontAwesome name="user-o" size={hp(2.3)} color="#595959" />
//                   </View>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       style={styles.input}
//                       color="#212121"
//                       placeholder="Username"
//                       placeholderTextColor={'#595959'}
//                       // onChangeText={text => setFullName(text)}
//                       // value={fullName}
//                     />
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     ...styles.inputButton,
//                     flexDirection: 'row',
//                     backgroundColor: '#FFFFFF',
//                     opacity: 0.7,
//                     marginTop: hp(4),
//                   }}>
//                   <View
//                     style={{
//                       ...styles.iconContainer,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Feather name="phone" size={hp(2.3)} color="#595959" />
//                   </View>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       style={styles.input}
//                       color="#212121"
//                       placeholder="Phone Number"
//                       placeholderTextColor={'#595959'}
//                       keyboardType="phone-pad"
//                       // onChangeText={text => setFullName(text)}
//                       // value={fullName}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
//               <CButton
//                 title="Continue"
//                 onPress={() => navigation.navigate('Registration')}
//                 // style={{marginBottom: 25}}
//               />
//               <View style={styles.signUpTextContainer}>
//                 <Text style={styles.descriptionText}>
//                   Already have an account?
//                 </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//                   <Text style={{...styles.descriptionText, color: '#FF5722'}}>
//                     {' '}
//                     Sign In
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           <RBSheetAddLocation refRBSheet={ref_RBSheet} />
//         </ImageBackground>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   mainBody: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.45)',
//     paddingTop: hp(1),
//     height: hp(100) + StatusBar.currentHeight,
//   },
//   header: {
//     height: hp(12),
//     justifyContent: 'center',
//     marginBottom: hp(5),
//     marginTop: hp(1),
//   },
//   backIcon: {
//     height: hp(5),
//     width: wp(8),
//     marginLeft: wp(6),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textsContainer: {
//     height: hp(19),
//     width: wp(100),
//     justifyContent: 'center',
//   },
//   mainText: {
//     color: '#FFFFFF',
//     fontFamily: 'PlusJakartaSans-Regular',
//     fontSize: RFPercentage(3.5),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: hp('2'),
//     opacity: 0.9,
//   },
//   descriptionText: {
//     color: '#FFFFFF',
//     fontSize: RFPercentage(2),
//     fontFamily: 'PlusJakartaSans-Regular',
//     textAlign: 'center',
//     // paddingHorizontal: wp(11),
//     opacity: 0.75,
//   },
//   inputsbuttonContainer: {
//     height: hp(40),
//   },
//   inputsContainer: {
//     height: hp(25),
//   },
//   iconContainer: {
//     width: wp(10),
//     height: '100%',
//   },
//   inputContainer: {
//     width: wp(60),
//     height: '100%',
//   },
//   input: {
//     height: hp(6),
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: RFPercentage(2),
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-Regular',
//   },
//   inputButton: {
//     height: hp(6.5),
//     justifyContent: 'center',
//     alignSelf: 'center',
//     width: wp(83),
//     borderRadius: hp(10),
//   },
//   continueAscontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp(2),
//   },
//   line: {
//     width: wp(25),
//     height: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   textContainer: {
//     paddingHorizontal: 10,
//   },
//   optionsContainer: {
//     height: hp(15),
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   optionContainer: {
//     width: wp(15),
//     height: wp(15),
//     borderRadius: hp(50),
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: wp(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signUpTextContainer: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 45,
//   },
// });

// export default SignUp;
