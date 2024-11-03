import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rider_id: null,
  rider_details: null,
  signUpWith: null,
  selectedLanguage: 'English',
  searchOrders: [
  ]
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
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
    setSignUpWith(state, action) {
      state.signUpWith = action.payload;
    },
    setSearchOrders(state, action) {
      state.searchOrders = action.payload;
    },
    addSearchOrderItem(state, action) {
      state.searchOrders.push(action.payload);
    },
    removeSearchOrderItem(state, action) {
      state.searchOrders = state.searchOrders.filter(
        (item, index) => index !== action.payload
      );
    },
    // Reset all states to their initial values
    resetState() {
      return initialState;
    },
  },
});

export const { 
  setRiderId, 
  setRiderDetails, 
  setSelectedLanguage, 
  setSignUpWith, 
  setSearchOrders, 
  addSearchOrderItem, 
  removeSearchOrderItem, 
  resetState 
} = AuthSlice.actions;

export default AuthSlice.reducer;
