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
import Feather from 'react-native-vector-icons/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts, Icons} from '../../constants';

const MenuHeader = ({title, rightIcon, translucent}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <StatusBar
        backgroundColor={'#FFFFFF'}
        barStyle={'dark-content'}
        translucent={translucent ? translucent : false}
      />
      <View
        style={{
          ...styles.headerView,
          marginTop: translucent ? StatusBar.currentHeight : 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation?.toggleDrawer()}
          style={styles.iconContainer}>
          <Feather name="menu" size={hp(3)} color={Colors.Orange} />
        </TouchableOpacity>
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

export default MenuHeader;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingBottom: hp(4),
  },
  headerView: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  mainText: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    letterSpacing: 1,
  },
});
