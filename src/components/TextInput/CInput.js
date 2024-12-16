import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Images} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CInput = props => {
  let showPass = true;
  return (
    <View style={{width: wp(90), alignSelf: 'center'}}>
      {props?.heading && (
        <Text
          style={{
            color: '#292323',
            fontFamily: Fonts.PlusJakartaSans_Medium,
            fontSize: RFPercentage(1.8),
            marginHorizontal: 10,
            marginBottom: 14,
            ...props.headingStyle,
          }}>
          {props?.heading}
        </Text>
      )}

      <TouchableOpacity
        onPress={props?.onPress}
        disabled={props?.disabled == false ? false : true}
        style={{
          borderRadius: 25,
          width: props?.width ? props?.width : wp(90),
          alignSelf: 'center',
          // borderWidth: 1,
          // borderColor: '#DADADA',
          paddingHorizontal: 15,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: props?.backgroundColor
            ? props?.backgroundColor
            : '#F5F6FA',
          ...props?.containerStyle,
        }}>
        <TouchableOpacity>{props?.leftContent}</TouchableOpacity>
        <TextInput
          {...props}
          // value=''
          // onChangeText={(text)=> }
          // placeholder=''
          // multiline
          // numberOfLines={}
          // textAlignVertical=''
          // keyboardType='numeric'
          // secureTextEntry
          // placeholder=''
          // keyboardType='email-address'
          editable={props?.editable == false ? false : true}
          placeholderTextColor={
            props?.placeholderTextColor
              ? props?.placeholderTextColor
              : '#B0B0B0'
          }
          style={{
            color: Colors.primary_text,
            flex: 1,
            fontFamily: Fonts.PlusJakartaSans_Regular,
          }}
        />

        <TouchableOpacity>{props?.rightContent}</TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => setShowPass(!showPass)}
          style={{
            width: wp(10),
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
          }}>
          {showPass ? (
            <FontAwesome5 name="eye-slash" size={hp(2.3)} color="#595959" />
          ) : (
            <FontAwesome5 name="eye" size={hp(2.3)} color="#595959" />
          )}
        </TouchableOpacity> */}
      </TouchableOpacity>
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({});
