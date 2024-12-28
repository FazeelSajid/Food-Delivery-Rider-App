import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Badge} from 'react-native-paper';
import {Colors} from '../../constants';
import { useSelector } from 'react-redux';

const CBadge = ({text}) => {
        const  {Colors } = useSelector(store => store.auth)
  return (
    <Badge
      style={{
        color: Colors.secondary_color,
        backgroundColor:Colors.primary_color,
      }}>
      {text}
    </Badge>
  );
};

export default CBadge;

const styles = StyleSheet.create({});
