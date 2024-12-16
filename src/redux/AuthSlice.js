import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rider_id: '',
  rider_details: null,
  signUpWith: null,
  selectedLanguage: 'English',
  searchOrders: [
  ],
  userAppOpenLocation: {
    latitude:0, 
    longitude: 0
  },
  totalWalletAmount: 0,
  contacts: [],
  resId: '',
  Colors: {
    button: {
      primary_button: "#FF5722",
      primary_button_text: "#FFFFFF",
      secondary_button: "#FFFFFF",
      secondary_button_text: "#FF5722",
      secondary_button_border: "#FF5722",
      icon: "#FF5722",
    },
    darkTextColor: '#545151',
    primary_color: "#FF5722",
    // Orange: "#FF5722",
    // OrangeLight: '#F99145',
    White: '#FFFFFF',
    Black: '#000000',
    Text: "#FF5722",
    primary_text: '#0A212B',
    secondary_text: '#56585B',
    AvatarBG: '#FF572233',
    Border: '#B0B0B0',
    grayText: '#56585B',
    OrangeExtraLight: '#FFF6F3',
    primary1_color: '#FFF6F3',
    secondary_color: '#FFFFFF',
  }
  ,
  
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
    setResId(state, action) {
      state.resId = action.payload;
    },
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
    setWalletTotalAmount(state, action) {
      state.totalWalletAmount = action.payload;
    },
    setUserAppOpenLocation(state, action) {
      state.userAppOpenLocation = action.payload;
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
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    setColors(state, action) {
      state.Colors = {...state.Colors,...action.payload };
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
  resetState,
  setUserAppOpenLocation,
  setWalletTotalAmount,
  setContacts,
  setColors, 
  setResId
} = AuthSlice.actions;

export default AuthSlice.reducer;
