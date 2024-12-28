import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DefaultTheme, TextInput as TextInputPaper} from 'react-native-paper';
import {Fonts} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const CPaperInput = props => {
    const { Colors} = useSelector(store => store.auth);
  const paperInputStyle = StyleSheet.create({
    heading: {
      color: '#0B0B0B',
      fontSize: 13,
      fontFamily: Fonts.Inter_Medium,
    },
    paperInputThemeColor: {
      primary:Colors.primary_color,
      text: '#fff',
      onSurfaceVariant: '#000',
    },
    paperInputContinaer: {
      width: props?.width ? props?.width : wp(85),
      backgroundColor: 'transparent',
      height: 40,
      color: '#fff',
      fontSize: 14,
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
      
        underlineColor={paperInputStyle.underlineColor}
        theme={{
          colors: paperInputStyle.paperInputThemeColor,
         
        }}
        contentStyle={{
        
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
