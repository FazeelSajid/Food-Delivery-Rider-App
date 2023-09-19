import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    rider_id: null,
    rider_details: null,
  },
  reducers: {
    setRiderId(state, action) {
      state.rider_id = action.payload;
    },
    setRiderDetails(state, action) {
      state.rider_details = action.payload;
    },
  },
});

export const {setRiderId, setRiderDetails} = AuthSlice.actions;

export default AuthSlice.reducer;
