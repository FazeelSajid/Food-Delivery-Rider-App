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

export const MYStore = configureStore({
  reducer: {
    store: MySlice,
    auth: AuthSlice,
    order: OrderSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});
