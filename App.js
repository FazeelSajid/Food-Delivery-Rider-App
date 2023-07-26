import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Routes/router';

export default function App() {
  return (
    <NavigationContainer>
      <Router></Router>
    </NavigationContainer>
  );
}
