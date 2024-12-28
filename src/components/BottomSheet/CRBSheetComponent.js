import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CRBSheetComponent = ({refRBSheet, content, height}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <RBSheet
        ref={refRBSheet}
        height={height ? height : 320}
        openDuration={300}
        // closeOnDragDown
        customStyles={{
          container: {
            // justifyContent: 'center',
            paddingVertical: 20,
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
      </RBSheet>
    </View>
  );
};

export default CRBSheetComponent;

const styles = StyleSheet.create({});
