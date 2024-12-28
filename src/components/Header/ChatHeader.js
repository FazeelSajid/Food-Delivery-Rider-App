import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {Fonts, Icons} from '../../constants';
import {Avatar} from 'react-native-paper';
import { useSelector } from 'react-redux';

const ChatHeader = ({title, profile, rightIcon}) => {
  const navigation = useNavigation();
  const getFirstTwoLettersOfName = name => {
    let data = name?.split(' ').map(name => name[0]);
    if (data) {
      return data?.toString().replace(/,/g, '');
    } else {
      return '';
    }
  };

          const  {Colors } = useSelector(store => store.auth)

          const styles = StyleSheet.create({
            header: {
              justifyContent: 'center',
              paddingVertical: 15,
            },
            headerView: {
              width: wp(100),
              flexDirection: 'row',
              alignItems: 'center',
            },
            iconContainer: {
              paddingLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
            headerTextContainer: {
              flex: 1,
            },
            mainText: {
              color: Colors.primary_text,
              fontFamily: Fonts.PlusJakartaSans_Bold,
              fontSize: RFPercentage(2.2),
            },
          });
  return (
    <View style={styles.header}>
      <StatusBar
        backgroundColor={Colors.secondary_color}
        barStyle={'dark-content'}
        translucent={false}
      />
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.iconContainer}>
          <Ionicons name={'chevron-back'} size={hp(3)} color={Colors.primary_color} />
        </TouchableOpacity>
        {profile ? (
          <Avatar.Image
            source={profile}
            size={40}
            style={{marginHorizontal: 12, backgroundColor: Colors.AvatarBG}}
          />
        ) : (
          <Avatar.Text
            size={40}
            label={getFirstTwoLettersOfName(title)}
            style={{backgroundColor: Colors.primary_color, marginHorizontal: 12}}
            labelStyle={{color: Colors.secondary_color}}
          />
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.mainText}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          {rightIcon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;


