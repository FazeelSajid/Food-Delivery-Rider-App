import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Fonts, Images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

const FavoriteItemCard = ({image, title, description, price}) => {
        const  {Colors } = useSelector(store => store.auth)
        const styles = StyleSheet.create({
          itemView: {
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:  Colors.secondary_color,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
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
            fontFamily: Fonts.PlusJakartaSans_Bold,
            color: Colors.primary_text,
            fontSize: RFPercentage(2),
            lineHeight: 25,
          },
          nameText: {
            fontFamily: Fonts.PlusJakartaSans_Medium,
            color: Colors.secondary_text,
            fontSize: RFPercentage(1.5),
            lineHeight: 25,
          },
          ratingText: {
            fontFamily: Fonts.PlusJakartaSans_Bold,
            color: Colors.primary_text,
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
        });
        
  return (
    <View style={styles.itemView}>
      <ImageBackground
        source={image}
        blurRadius={40}
        style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <View style={styles.rowViewSB}>
          <Text style={styles.title}>{title}</Text>
          <AntDesign name="heart" color={Colors.Orange} size={20} />
        </View>
        <Text style={styles.nameText}>{description}</Text>
        <Text style={{...styles.title, color:Colors.primary_color}}>$ {price}</Text>
      </View>
    </View>
  );
};

export default FavoriteItemCard;

