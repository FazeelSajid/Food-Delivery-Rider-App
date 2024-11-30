import {createSlice} from '@reduxjs/toolkit';

const MySlice = createSlice({
  name: 'mySlice',
  initialState: {
    messages: [],
    showPopUp: false,
    popUpColor: '',
    PopUpMesage: '',
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setShowPopUp(state, action) {
      state.showPopUp = action.payload;
    },
    setPopUpColor(state, action) {
      state.popUpColor = action.payload;
    }, 
    setPopUpMesage(state, action) {
      state.PopUpMesage = action.payload;
    },
   
  },
});

export const {setMessages, setShowPopUp, setPopUpColor, setPopUpMesage } = MySlice.actions;

export default MySlice.reducer;
