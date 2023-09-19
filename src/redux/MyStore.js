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

export const MYStore = configureStore({
  reducer: {
    store: MySlice,
    auth: AuthSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});
