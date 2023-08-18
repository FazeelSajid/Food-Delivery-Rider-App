import {createSlice} from '@reduxjs/toolkit';

const MySlice = createSlice({
  name: 'mySlice',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const {setMessages} = MySlice.actions;

export default MySlice.reducer;
