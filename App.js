import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Routes/router';
import {Provider} from 'react-redux';
import {MYStore} from './src/redux/MyStore';

export default function App() {
  return (
    <Provider store={MYStore}>
      <NavigationContainer>
        <Router></Router>
      </NavigationContainer>
    </Provider>
  );
}
