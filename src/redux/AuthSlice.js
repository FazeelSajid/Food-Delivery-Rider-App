import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    rider_id: null,
    rider_details: null,
    selectedLanguage: 'English',
  },
  reducers: {
    setRiderId(state, action) {
      state.rider_id = action.payload;
    },
    setRiderDetails(state, action) {
      state.rider_details = action.payload;
    },
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const {setRiderId, setRiderDetails, setSelectedLanguage} =
  AuthSlice.actions;

export default AuthSlice.reducer;
