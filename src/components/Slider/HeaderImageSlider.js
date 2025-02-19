import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {memo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL_IMAGE} from '../../utils/globalVariables';
import { useSelector } from 'react-redux';

const HeaderImageSlider = ({
  data,
  marginBottom,
  backIconColor,
  onBackPress,
}) => {
  
      const { Colors} = useSelector(store => store.auth);
  const navigation = useNavigation();
  const dotSize = wp(2.2);
  const styles = StyleSheet.create({
    imageCard: {
      width: wp(100),
      height: hp(38),
      // backgroundColor: '#ccc',
      //   marginHorizontal: wp(4.5),
      //   borderRadius: 10,
      overflow: 'hidden',
    },
    sliderContainer: {
      //   marginVertical: 20,
      marginBottom: marginBottom ? marginBottom : 20,
      paddingHorizontal: 0,
      //   height: hp(30),
      height: hp(40),
    },
    paginationStyle: {
      marginBottom: -hp(2.4),
    },
    paginationStyleItemActive: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor:Colors.primary_color,
      margin: 0,
      marginHorizontal: 3,
    },
    paginationStyleItemInactive: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize,
      backgroundColor: Colors.secondary_color,
      borderWidth: 1,
      borderColor:Colors.primary_color,
      opacity: 0.7,
      marginHorizontal: 3,
    },
  });

  return (
    <View style={styles.sliderContainer}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />

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
              // source={item.image}
              source={{uri: BASE_URL_IMAGE + item}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
        )}
        paginationStyle={styles.paginationStyle}
        paginationStyleItemActive={styles.paginationStyleItemActive}
        paginationStyleItemInactive={styles.paginationStyleItemInactive}
      />

      <TouchableOpacity
        onPress={onBackPress ? onBackPress : () => navigation?.goBack()}
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + hp(2.5),
          marginLeft: wp(8),
        }}>
        <Ionicons
          name={'chevron-back'}
          size={hp(3)}
          color={backIconColor ? backIconColor : Colors.button.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HeaderImageSlider);
