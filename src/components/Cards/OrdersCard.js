import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Images, Fonts} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import PriceText from '../Text';

const OrdersCard = ({
  image,
  title,
  description,
  price,
  label,
  type,
  disabled,
  width,
  onPress,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      onPress={
        onPress
          ? onPress
          : () => navigation.navigate('OrderDetails', {type: type})
      }
      style={{...styles.itemView, width: width ? width : 'auto'}}>
      <ImageBackground
        source={image}
        blurRadius={40}
        style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.nameText}>{description}</Text>
        {/* <Text style={{...styles.title, color: Colors.Orange}}>${price}</Text> */}
        {/* <View style={styles.rowView}>
          <Text
            style={{
              ...styles.title,
              color: Colors.Orange,
              marginBottom: 7,
              marginRight: 3,
              fontSize: RFPercentage(1.8),
            }}>
            $
          </Text>
          <Text style={{...styles.title, color: Colors.Orange}}>{price}</Text>
        </View> */}

        <PriceText text={price} />
      </View>
      {label && (
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  itemView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageContainer: {
    width: 80,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.Text,
    fontSize: RFPercentage(1.8),
    // lineHeight: 25,
  },
  nameText: {
    fontFamily: Fonts.Inter_Regular,
    color: '#7E8CA0',
    fontSize: RFPercentage(1.5),
    lineHeight: 20,
  },
  ratingText: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: Colors.Text,
    fontSize: RFPercentage(2),
    lineHeight: 25,
    marginLeft: 5,
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.Orange,
    padding: 4,
    paddingHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: Colors.White,
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.PlusJakartaSans_Regular,
  },
});
