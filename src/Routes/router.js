import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Screens/Auth/SignIn';
import OnBoarding from '../Screens/Auth/OnBoarding';
import SignUp from '../Screens/Auth/SignUp';
import RegistrationForm from '../Screens/Auth/RegistrationForm';
import RegistrationDocuments from '../Screens/Auth/RegistrationDocuments';

function Router() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      <Stack.Screen
        name="RegistrationDocuments"
        component={RegistrationDocuments}
      />
    </Stack.Navigator>
  );
}
export default Router;
