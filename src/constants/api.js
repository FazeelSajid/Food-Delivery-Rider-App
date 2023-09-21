import {BASE_URL} from '../utils/globalVariables';

const api = {
  //universal apis
  upload_image: BASE_URL + 'fileUpload/upload',
  send_email: BASE_URL + 'emailVerification/sendEmail',
  verify_otp: BASE_URL + 'emailVerification/verifyOTP',
  update_password: BASE_URL + 'rider/updatePassword',
  // auth
  login: BASE_URL + 'rider/login',
  create_rider_request: BASE_URL + 'rider_requests/createRequest',
  get_rider_details_by_id: BASE_URL + 'rider/view_user_profile?rider_id=',
  create_update_profile_request: BASE_URL + 'updateRiderProfile/createRequest',
  //
  get_all_categories: BASE_URL + 'category/getAllCategories',

  // order
  get_nearest_orders: BASE_URL + 'orders/nearestOrdersForRider',
  get_order_by_id: BASE_URL + 'orders/getById?order_id=',
  accept_reject_order_by_rider: BASE_URL + 'orders/accept_reject_by_rider',
  get_rider_assigned_orders:
    BASE_URL + 'orders/getAsignedOrdersOfRider?rider_id=',

  get_rider_orders: BASE_URL + 'orders/getAllOrdersByRider_id?rider_id=',

  update_order_status: BASE_URL + 'orders/updateOrderStatus',

  // wallet
  create_rider_wallet: BASE_URL + 'wallet/createRiderWallet',

  // complaints
  get_all_complaints_by_rider:
    BASE_URL + 'complaint/getAllComplaintsByRider_id?rider_id=',
};

export default api;
