import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts } from '../../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';


const RatingCard = ({item}) => {
  return (
    <View style={styles.card}>
      {/* Reviewer Name and Location */}
      
      <View style={styles.header}>
      <Text style={styles.title} >Order #{item.order_id}</Text>
        <Text style={styles.date}>{moment(item?.created_at).format("MMM, DD YYYY")}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}} >
      <Text style={styles.CustomerName}>Customer Id: </Text>
      <Text style={styles.name}>{item?.customer_id}</Text>
      </View>
     

      {/* Rating */}
      <AirbnbRating
                    count={5}
                    showRating={false}
                    defaultRating={item?.rating}
                    size={15}
                    
                  />
      {/* <View style={styles.rating}>
        {[...Array(5)].map((_, index) => (
          <FontAwesome
            key={index}
            name="star"
            size={16}
            color={index < 4 ? "#FFC107" : "#DDDDDD"} // 4 stars filled, 1 empty
          />
        ))}
      </View> */}

      {/* Review Title */}
      {/* <Text style={styles.title}>Moved here from another insurance company</Text> */}

      {/* Review Content */}
      <View style={{flexDirection: 'row', alignItems: 'center'}} >
      <Text style={styles.CustomerName}>Comment: </Text>
      <Text style={styles.review}>{item?.comments}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondary_color,
    borderRadius: 10,
    padding: 16,
    marginTop: 2,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
   fontFamily: Fonts.PlusJakartaSans_Bold,
    color: Colors.primary_text,
    fontSize: RFPercentage(1.6),
  },
  CustomerName: {
   fontFamily: Fonts.PlusJakartaSans_Bold,
    color: Colors.secondary_text,
    fontSize: RFPercentage(1.5),
    marginRight: widthPercentageToDP(1)
  },
  date: {
    fontFamily: Fonts.PlusJakartaSans_Regular,
    color: Colors.secondary_text,
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  title: {
    fontFamily: Fonts.PlusJakartaSans_Bold,
    fontSize: 16,
    marginTop: 8,
    color: Colors.primary_text,
  },
  review: {
    fontFamily: Fonts.PlusJakartaSans_Regular,
    color: Colors.secondary_text,
    // marginTop: 4,
  },
});

export default RatingCard;
