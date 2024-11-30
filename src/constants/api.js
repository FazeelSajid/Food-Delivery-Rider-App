import {BASE_URL} from '../utils/globalVariables';

const api = {
  //universal apis
  upload_image: BASE_URL + 'uploadImage',
  send_email: BASE_URL + 'rider/forgetpassword',
  verify_otp: BASE_URL + 'rider/otpVerification',
  update_password: BASE_URL + 'rider/updatePassword',
  // auth
  login: BASE_URL + 'rider/login',
  create_rider_request: BASE_URL + 'rider_requests/createRequest',
  get_rider_details_by_id: BASE_URL + 'rider/view_user_profile?rider_id=',
  create_update_profile_request: BASE_URL + 'updateRiderProfile/createRequest',
  signUp: BASE_URL + 'rider/register',
  updateProfile :  BASE_URL +  'rider/updateProfile',
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
  updateOrderStatusByRider: BASE_URL + 'orders/updateOrderStatusByRider',
  get_all_orders : BASE_URL + 'orders/getAllOrders?page=1&limit=10&order_status=placed',
  distribute_payment_order : BASE_URL + `wallet/distribute?order_id=`,

  // wallet
  create_rider_wallet: BASE_URL + 'wallet/createRiderWallet',
  get_available_payment_of_rider:
    BASE_URL + 'wallet/getAvaliablePaymentsOfRider?rider_id=',
    add_payment_to_Rider_wallet:
    BASE_URL + 'wallet/makeRiderWalletPayment',
    getRiderTransactionHistory: BASE_URL+'wallet/getRiderTransactions?rider_id=',
  // complaints
  get_all_complaints_by_rider:
    BASE_URL + 'complaint/getAllComplaintsByRider_id?rider_id=',

// Rating

GetRiderRating: BASE_URL + 'riderRating/getByRider?rider_id=',
    // Stripe
    create_customer_stripe_card:
    BASE_URL + 'payment/getCustomerStripeId?customer_id=',
  // notifications
  get_all_notifications:
    BASE_URL + 'notifications/getNotificationRider?rider_id=',
};

export default api;
