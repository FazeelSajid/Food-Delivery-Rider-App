import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Use any progress bar component or install react-native-paper
import { Colors } from '../../constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';



const ProfileStatus = ({ profile }) => {
  const [completion, setCompletion] = useState(0);
  const navigation = useNavigation();
      const { Colors} = useSelector(store => store.auth);

  useEffect(() => {
    // Calculate profile completion based on the filled fields
    const requiredFields = [
      'name',
      'photo',
      'cnic',
      'address',
      'dob',
      'gender',
      'license_front_image',
      'license_back_image',
      'vehicle_ownership',
      'id_card_front_image',
      'id_card_back_image',
      'vechile_registration_no',
      'vehicle_model',
      'vehicle_name',
      'longitude',
      'latitude',
      'phone'
    ];

    let filledFields = 0;
    requiredFields.forEach(field => {
      if (profile[field]) filledFields += 1;
    });

    const completionPercentage = (filledFields / requiredFields.length) * 100;
    setCompletion(completionPercentage);
  }, [profile]);

  const styles = StyleSheet.create({
    Pcontainer: {
      padding: 16,
    },
    Pheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    Ptitle: {
      fontSize:  RFPercentage(2),
      fontWeight: 'bold',
      color: Colors.primary_text,
    },
    percentage: {
      fontSize: RFPercentage(2),
      color: Colors.secondary_text,
      marginTop: hp(1)
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
  });
  
  return (
    <View style={styles.Pcontainer}>
      <View style={styles.Pheader}>
        <Text style={styles.Ptitle}>Profile Status</Text>
       <TouchableOpacity onPress={()=> navigation.navigate('UpdateProfile')} >
       <Feather
                name={'chevron-right'}
                size={25}
                color={Colors.secondary_text}
              />
       </TouchableOpacity>
      </View>
      <ProgressBar progress={completion / 100} color={Colors.Orange} style={styles.progressBar} />
      <Text style={styles.percentage}>{Math.round(completion)}%</Text>
    </View>
  );
};



export default ProfileStatus;
