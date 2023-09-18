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
  //
  get_all_categories: BASE_URL + 'category/getAllCategories',
};

export default api;
