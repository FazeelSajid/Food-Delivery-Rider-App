import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const FoodCardWithRating = ({
  image,
  title,
  description,
  price,
  onPress,
  imageHeight,
  disabled,
  imageStyle,
  cardStyle,
  showNextButton,
  showRatingOnBottom,
  showRating,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      activeOpacity={0.7}
      onPress={
        onPress ? onPress : () => navigation?.navigate('NearByDealsDetails')
      }
      style={{...styles.card1, ...cardStyle}}>
      {image && (
        <>
          <ImageBackground
            source={image}
            style={{
              ...styles.imageContainer,
              height: imageHeight ? imageHeight : hp(8),
            }}
            blurRadius={40}>
            <Image source={image} style={{...styles.image, ...imageStyle}} />
          </ImageBackground>
        </>
      )}

      {/* <View style={styles.textContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
          {price && <Text style={styles.price}>{price}</Text>}
        </View> */}

      <View style={{flex: 1, marginLeft: 15}}>
        <View style={styles.rowViewSB1}>
          <Text style={styles.name}>{title ? title : 'Green Salad'}</Text>
          {showRatingOnBottom == true || showRating == false ? null : (
            <View style={styles.rowView}>
              <Icons.Rating />
              <Text
                style={{
                  marginLeft: 5,
                  color: '#C7C5C5',
                  fontFamily: Fonts.PlusJakartaSans_Bold,
                  fontSize: RFPercentage(1.6),
                }}>
                4.3
              </Text>
            </View>
          )}
        </View>

        <View style={styles.rowViewSB}>
          <Text style={styles.priceText}>$12.50</Text>
          {showNextButton == false ? null : (
            <TouchableOpacity>
              <Icons.Next />
            </TouchableOpacity>
          )}
          {showRatingOnBottom == true && (
            <View style={styles.rowView}>
              <Icons.Rating />
              <Text
                style={{
                  marginLeft: 5,
                  color: '#C7C5C5',
                  fontFamily: Fonts.PlusJakartaSans_Bold,
                  fontSize: RFPercentage(1.6),
                }}>
                4.3
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCardWithRating;

const styles = StyleSheet.create({
  name: {
    color: '#02010E',
    fontFamily: Fonts.PlusJakartaSans_SemiBold,
    fontSize: RFPercentage(2),
  },
  rowViewSB1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rowView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  priceText: {
    color: Colors.Orange,
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: RFPercentage(2.5),
    marginTop: -5,
  },
  //
  card1: {
    borderWidth: 1,
    borderColor: '#E6E7EB',
    paddingVertical: 7,
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'center',
    marginTop: 6,
    alignItems: 'center',
    marginLeft: 10,
  },
  imageContainer: {
    width: hp(9),
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
