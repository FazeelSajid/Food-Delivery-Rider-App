import {createSlice} from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    order_requests: [],
    order_history: [],
    assigned_orders: [],
    isOrderUpdate: true,
  },
  reducers: {
    setOrderRequests(state, action) {
      state.order_requests = action.payload;
    },
    setAssignedOrders(state, action) {
      state.assigned_orders = action.payload;
    },
    setOrderHistory(state, action) {
      state.order_history = action.payload;
    },
    setIsOrderUpdate(state, action) {
      state.isOrderUpdate = action.payload;
    },
  },
});

export const {
  setOrderRequests,
  setAssignedOrders,
  setOrderHistory,
  setIsOrderUpdate,
} = OrderSlice.actions;

export default OrderSlice.reducer;
