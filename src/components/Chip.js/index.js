import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const Chip = ({title, onPress, selected, icon}) => {
        const  {Colors } = useSelector(store => store.auth)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: '#E6E9ED',
        backgroundColor: selected ?Colors.primary_color : Colors.secondary_color,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        flexDirection: 'row',
      }}>
      {icon && <View style={{marginRight: 5}}>{icon}</View>}
      <Text style={{color: selected ? Colors.secondary_color : Colors.secondary_text}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({});
