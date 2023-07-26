import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const FoodCard = ({
  image,
  title,
  description,
  price,
  onPress,
  imageHeight,
  disabled,
  imageStyle,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      activeOpacity={0.7}
      onPress={
        onPress ? onPress : () => navigation?.navigate('NearByDealsDetails')
      }
      style={styles.card1}>
      {image && (
        <>
          <ImageBackground
            source={image}
            style={{
              ...styles.imageContainer,
              height: imageHeight ? imageHeight : hp(11),
            }}
            blurRadius={40}>
            <Image source={image} style={{...styles.image, ...imageStyle}} />
          </ImageBackground>
        </>
      )}

      <View style={styles.textContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {price && <Text style={styles.price}>{price}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  card1: {
    borderWidth: 1,
    borderColor: '#E6E7EB',
    // height: hp(23),
    paddingVertical: 7,
    flex: 0.47,
    borderRadius: hp(3),
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    marginTop: 6,
    alignItems: 'center',
  },
  imageContainer: {
    width: hp(17),
    height: hp(11),
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#0A212B',
    fontSize: RFPercentage(1.5),
    lineHeight: 30,
  },
  description: {
    fontFamily: Fonts.PlusJakartaSans_Medium,
    color: Colors.Orange,
    fontSize: RFPercentage(1.5),
  },
  price: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    color: '#0A212B',
    fontSize: RFPercentage(2.5),
  },
});
