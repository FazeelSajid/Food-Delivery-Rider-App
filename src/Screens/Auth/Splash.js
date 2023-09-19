import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation, route}) => {
  const getData = async () => {
    let rider_id = await AsyncStorage.getItem('rider_id');
    if (rider_id) {
      //   navigation?.popToTop();
      navigation?.replace('Drawer');
    } else {
      //   navigation?.popToTop();
      navigation?.replace('OnBoarding');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <Loader />;
};

export default Splash;
