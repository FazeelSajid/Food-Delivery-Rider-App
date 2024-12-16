import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DefaultTheme, TextInput as TextInputPaper} from 'react-native-paper';
import {Colors, Fonts} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CPaperInput = props => {
  //   let isDarkMode = useSelector(state => state.theme.isDarkMode);
  let isDarkMode = false;
  const paperInputStyle = StyleSheet.create({
    heading: {
      color: '#0B0B0B',
      fontSize: 13,
      fontFamily: Fonts.Inter_Medium,
    },
    paperInputThemeColor: {
      primary:Colors.primary_color,
      // surface: 'red',
      text: '#fff',

      // backgroundColor: 'red',
      onSurfaceVariant: '#000',
      // placeholder: 'red',
      // underlineColor: 'red',
    },
    paperInputContinaer: {
      width: props?.width ? props?.width : wp(85),
      backgroundColor: 'transparent',
      height: 40,
      color: '#fff',
      fontSize: 14,
      // marginVertical: 10,
      // paddingHorizontal: 10,
      // height: 30,
      // paddingHorizontal: 0,
    },
    underlineColor: '#858585',
    iconSize: 23,
    iconColor: 'gray',
  });
  return (
    <View style={{marginVertical: 15}}>
      {props?.heading && (
        <Text style={paperInputStyle.heading}>{props?.heading}</Text>
      )}
      <TextInputPaper
        // label={'Email'}
        {...props}
        //   placeholder="Password"
        //   secureTextEntry={!showPassword}
        //   value={password}
        //   onChangeText={text => setPassword(text)}
        //   left={props?.left}
        //   right={props?.right}
        underlineColor={paperInputStyle.underlineColor}
        theme={{
          colors: paperInputStyle.paperInputThemeColor,
          // fonts: {
          //   bodyLarge: {
          //     ...DefaultTheme.fonts.bodyLarge,
          //     // fontFamily: appFonts.Poppins_Light,
          //   },
          // },
        }}
        contentStyle={{
          // backgroundColor: 'red',
          // marginTop: 4,
          paddingTop: 5,
          marginHorizontal: -15,
          marginVertical: -2,
        }}
        style={paperInputStyle.paperInputContinaer}
      />
    </View>
  );
};

export default CPaperInput;

const styles = StyleSheet.create({});
