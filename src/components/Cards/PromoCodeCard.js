import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';

const PromoCodeCard = ({selected, percentage, expiry_date, code, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      // onPress={() => handleSelect(item)}
      style={{
        ...styles.card,
        borderColor: selected ?Colors.primary_color : '#DADADA',
      }}>
      <View>
        <Text style={styles.boldText}>{percentage}%OFF</Text>
        <Text style={styles.description}>Code expires {expiry_date}</Text>
      </View>
      <Text style={styles.codeText}>{code}</Text>
    </TouchableOpacity>
  );
};

export default PromoCodeCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    // marginHorizontal: 20,
    width: '100%',
  },
  boldText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.2),
    color: Colors.primary_text,
  },
  codeText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.5),
    color:Colors.primary_color,
  },
  description: {
    color: '#8D93A1',
    fontFamily: Fonts.PlusJakartaSans_Medium,
    fontSize: RFPercentage(1.5),
  },
});
