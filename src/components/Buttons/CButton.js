import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const CButton = ({
  title = '',
  onPress,
  loading = false,
  bgColor,
  color,
  marginTop,
  bold = false,
  txtSize = 14,
  transparent,
  style,
  height,
  width,
  padding,
  disabled,
  iconImage,
  activeOpacity,
  textStyle,
  leftIcon,
  borderColor
}) => {
  let isDarkMode = false;
  // console.log({marginTop});
    const  {Colors } = useSelector(store => store.auth)
  
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : 0.8}
      disabled={disabled ? disabled : loading}
      style={{
        ...styles.btn,
        height: height ? height : hp(5.8),
        width: width ? width : wp(90),
        padding: padding ? padding : 0,
        borderWidth: transparent ? 1 : 0,
        borderColor: borderColor? borderColor : Colors.button.primary_button,
        backgroundColor: transparent
          ? Colors.button.secondary_button
          : bgColor
          ? bgColor
          : isDarkMode
          ? Colors.primary_text
          :  Colors.button.primary_button,
        marginTop: marginTop ? marginTop : hp(1.5),
        ...style,
      }}
      onPress={onPress}>
      {loading && (
        <ActivityIndicator
          color={transparent || isDarkMode ? Colors.button.primary_button : Colors.button.secondary_button}
          size={'small'}
        />
      )}
      {leftIcon && leftIcon}
      {title && (
        <Text
          style={{
            ...styles.btnText,
            fontWeight: bold ? 'bold' : 'normal',
            color: transparent
              ? color
                ? color
                : isDarkMode
                ? Colors.button.primary_button_text
                : Colors.button.secondary_button_text
              : color
              ? color
              : isDarkMode
              ? Colors.button.primary_button_text
              : Colors.button.secondary_button_text,
            fontSize: txtSize,
            // textTransform: 'uppercase',
            ...textStyle,
          }}>
          {title}
        </Text>
      )}

      {iconImage && (
        <Image
          source={iconImage}
          style={{
            height: wp(6.5),
            width: wp(6.5),
            resizeMode: 'contain',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: '#10A37F',
    // padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(8),
    marginTop: hp(3),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  btnText: {
    // color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: wp(3),
  },
});
