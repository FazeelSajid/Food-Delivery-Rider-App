import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

const CustomStatusBar = ({backgroundColor, ...props}) => {
  console.log('re-render', backgroundColor);
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  },
});

export default CustomStatusBar;
