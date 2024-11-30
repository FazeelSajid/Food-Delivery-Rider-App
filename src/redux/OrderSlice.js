import {createSlice} from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    order_requests: [],
    order_history: [],
    assigned_orders: [],
    isOrderUpdate: true,
    updatedOrder: {}
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
    setUpdatedOrder(state, action) {
      state.updatedOrder = action.payload;
    },
    setUpdatedOrdr(state, action) {
      state.updatedOrder = {...state.updatedOrder, ...action.payload};
    },
  },
});

export const {
  setOrderRequests,
  setAssignedOrders,
  setOrderHistory,
  setIsOrderUpdate,
  setUpdatedOrder,
  setUpdatedOrdr
} = OrderSlice.actions;

export default OrderSlice.reducer;
