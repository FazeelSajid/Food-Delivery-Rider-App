import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Routes/router';
import {Provider} from 'react-redux';
import {MYStore, persistor} from './src/redux/MyStore';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={MYStore}>
      <PersistGate persistor={persistor}>

     
      <NavigationContainer>
        <Router></Router>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
