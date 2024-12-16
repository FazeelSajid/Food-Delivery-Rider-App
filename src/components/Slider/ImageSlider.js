import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
const ImageSlider = ({data, marginBottom}) => {
  const styles = StyleSheet.create({
    imageCard: {
      width: wp(90),
      height: hp(25),
      // backgroundColor: '#ccc',
      marginHorizontal: wp(4.5),
      borderRadius: 10,
      overflow: 'hidden',
    },
    sliderContainer: {
      marginVertical: 20,
      marginBottom: marginBottom ? marginBottom : 20,
      paddingHorizontal: 0,
      height: hp(30),
    },
    paginationStyle: {
      // marginBottom: hp(1),
    },
    paginationStyleItemActive: {
      width: wp(2.5),
      height: wp(2.5),
      borderRadius: wp(2.5) / 2,
      backgroundColor:Colors.primary_color,
      margin: 0,
      marginHorizontal: 2,
    },
    paginationStyleItemInactive: {
      width: wp(2.5),
      height: wp(2.5),
      borderRadius: wp(2.5) / 2,
      backgroundColor: ,
      borderWidth: 1,
      borderColor:Colors.primary_color,
      opacity: 0.7,
      marginHorizontal: 2,
    },
  });
  return (
    <View style={styles.sliderContainer}>
      <SwiperFlatList
        // autoplay
        // autoplayDelay={2}
        // autoplayLoop
        // index={2}
        showPagination
        data={data}
        renderItem={({item}) => (
          <View style={styles.imageCard}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                // resizeMode: 'contain',
              }}
            />
          </View>
        )}
        paginationStyle={styles.paginationStyle}
        paginationStyleItemActive={styles.paginationStyleItemActive}
        paginationStyleItemInactive={styles.paginationStyleItemInactive}
      />
    </View>
  );
};

export default ImageSlider;
