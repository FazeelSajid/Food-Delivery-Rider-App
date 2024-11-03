import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import MySlice from './MySlice';
import AuthSlice from './AuthSlice';
import OrderSlice from './OrderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for persistence
  whitelist: ['auth'] // Specify the slices you want to persist
};

const rootReducer = combineReducers({
  store: MySlice,
  auth: AuthSlice,
  order: OrderSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const MYStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      immutableCheck: false,
      serializableCheck: false,
    }),
});


export const persistor = persistStore(MYStore);
