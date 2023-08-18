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

export const MYStore = configureStore({
  reducer: {
    store: MySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});
