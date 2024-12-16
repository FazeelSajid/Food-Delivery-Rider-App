import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {Avatar} from 'react-native-paper';
import {Fonts, Icons, Colors} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';

const CustomerCard = ({
  profile,
  name,
  phoneNo,
  location,
  showChatIcon,
  width,
  description,
  textContainerStyle,
  descriptionStyle,
  itemContainerStyle,
  onPress,
  disabled,
  onChatPress,
  showNameProfile,
  descriptionLines,
}) => {
  const getFirstTwoLettersOfName = name => {
    let data = name?.split(' ').map(name => name[0]);
    if (data) {
      return data?.toString().replace(/,/g, '');
    } else {
      return '';
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...styles.itemContainer,
        width: width ? width : '100%',
        ...itemContainerStyle,
      }}>
      {showNameProfile ? (
        <Avatar.Text
          size={50}
          label={getFirstTwoLettersOfName(showNameProfile)}
          style={{backgroundColor: Colors.primary_color}}
          labelStyle={{color: Colors.secondary_color}}
        />
      ) : profile ? (
        <Avatar.Image
          // source={profile}
          source={{uri: profile}}
          size={50}
          style={{backgroundColor: Colors.AvatarBG}}
        />
      ) : (
        <Avatar.Image
          source={profile}
          // source={{uri: profile}}
          size={50}
          style={{backgroundColor: Colors.AvatarBG}}
        />
      )}

      <View style={styles.rowViewSB}>
        <View style={{...styles.textContainer, ...textContainerStyle}}>
          <Text style={styles.title}>{name}</Text>
          {phoneNo && (
            <View style={styles.rowView}>
              <Icons.PhoneOutlineActive />
              <Text style={styles.description}>{phoneNo}</Text>
            </View>
          )}

          {description && (
            <View style={{...styles.rowView, width: '90%'}}>
              {descriptionLines ? (
                <Text
                  numberOfLines={descriptionLines}
                  style={{...styles.description, ...descriptionStyle}}>
                  {description}
                </Text>
              ) : (
                <Text style={{...styles.description, ...descriptionStyle}}>
                  {description}
                </Text>
              )}
            </View>
          )}

          {location && (
            <View style={{...styles.rowView, width: '90%'}}>
              <Icons.MarkerOutlineActive />
              <Text style={{...styles.description, lineHeight: 15}}>
                {location}
              </Text>
            </View>
          )}
        </View>
        {showChatIcon && (
          <TouchableOpacity onPress={onChatPress} style={{flex: 0.4}}>
            <Icons.ChatActive />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomerCard);

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.Inter_Medium,
    color: Colors.primary_text,
    fontSize: RFPercentage(2),
    lineHeight: 25,
  },
  description: {
    fontFamily: Fonts.Inter_Regular,
    color: Colors.secondary_text,
    fontSize: RFPercentage(1.5),
    lineHeight: 25,
    marginLeft: 10,
  },
  description1: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: Colors.secondary_text,
    fontSize: RFPercentage(1.5),
    // lineHeight: 25,
    marginLeft: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
