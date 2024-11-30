import {StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons, Images} from '../../../constants';
import StackHeader from '../../../components/Header/StackHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-paper';
import ItemSeparator from '../../../components/Separator/ItemSeparator';
import {GetAllNotifications} from '../../../utils/helpers/notificationApis';
import moment from 'moment';
import NoDataFound from '../../../components/NotFound/NoDataFound';
import Loader from '../../../components/Loader';
import { useSelector } from 'react-redux';
import Empty from '../../../Assets/svg/Empty.svg';

const Notification = ({navigation, route}) => {
  const { rider_id } = useSelector(store => store.auth)
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

//   const [data, setData] = useState([

//     {
//       "rider_notifications_id":202316,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Testing  check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:00.854Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202317,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Testing  check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:00.870Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202318,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Rider check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:01.128Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202319,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Rider check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:01.140Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202320,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear John Doe check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:01.405Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202321,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Rider check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:01.411Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//    {
//       "rider_notifications_id":202322,
//       "notification_type":"order",
//       "title":"New order",
//       "status":"pending",
//       "description":"Dear Rider check out the new order",
//       "order_id":202296,
//       "created_at":"2024-11-01T02:11:01.695Z",
//       "rider_id":"rider_1673186",
//       "orderData":{
//          "order_id":202296,
//          "customer_id":202028,
//          "cart_items_ids":[
//             202293,
//             202294
//          ],
//          "description":"Order creating",
//          "location_id":202031,
//          "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//          "restaurant_id":"res_4074614",
//          "accepted_by_restaurant":true,
//          "accepted_by_rider":true,
//          "rejectedby":null,
//          "rating":0,
//          "rider_id":"rider_1673186",
//          "phone_no":"921234568990",
//          "promo_code":null,
//          "payment_option":"cash",
//          "customer_payment":null,
//          "comments":null,
//          "estimated_delivery_time":45,
//          "order_status":"cancelled",
//          "sub_total":5000,
//          "total_amount":5779,
//          "delivery_charges":29,
//          "gst":750,
//          "created_at":"2024-11-01T01:50:18.170Z",
//          "updated_at":"2024-11-01T02:48:45.133Z",
//          "customerData":{
//             "customer_id":202028,
//             "user_name":"Testing@123",
//             "phone_no":"123",
//             "email":"bonajep397@regishub.com",
//             "signup_type":"email",
//             "password":"$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
//             "location":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "fcm_token":"cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
//             "recieve_notification":false,
//             "verified":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-25T05:45:14.589Z",
//             "updated_at":"2024-10-25T05:45:14.589Z",
//             "recieve_email":false,
//             "stripe_customer_id":null,
//             "deleted_at":null,
//             "rest_id":null
//          },
//          "cart_items_Data":[
//             {
//                "cart_item_id":202294,
//                "cart_id":0,
//                "item_id":202058,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.436Z",
//                "updated_at":"2024-11-01T01:45:14.436Z",
//                "variation_id":null,
//                "sub_total":1000,
//                "itemData":{
//                   "deal_id":202058,
//                   "name":"Lunch Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1000",
//                   "images":[
//                      "images/1729755669278--crispy-shrimp.webp",
//                      "images/1729754856622--shawerma-wraps.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201957,
//                         "quantity":2,
//                         "variation_id":239
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:12:48.808Z",
//                   "updated_at":"2024-10-26T05:12:48.808Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201957,
//                         "item_name":"Shawarma Wrap",
//                         "cuisine_id":201953,
//                         "description":"Marinated chicken or lamb, grilled to perfection and wrapped in pita with vegetables and garlic sauce.",
//                         "price":null,
//                         "images":[
//                            "images/1729754856622--shawerma-wraps.jpg",
//                            "images/1729754883131--Shawarma-Wrap.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:28:25.490Z",
//                         "updated_at":"2024-10-24T02:28:25.490Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             },
//             {
//                "cart_item_id":202293,
//                "cart_id":0,
//                "item_id":202061,
//                "item_type":"deal",
//                "comments":null,
//                "quantity":2,
//                "created_at":"2024-11-01T01:45:14.435Z",
//                "updated_at":"2024-11-01T01:45:14.435Z",
//                "variation_id":null,
//                "sub_total":1500,
//                "itemData":{
//                   "deal_id":202061,
//                   "name":"Some Special",
//                   "description":"Enjoy a delicious lunch with our special deal.",
//                   "price":"1500",
//                   "images":[
//                      "images/1729754630660--falafel-platter.jpg",
//                      "images/1729756402984--mexian-beef-tacos.jpg"
//                   ],
//                   "expiry_date":"2024-12-31",
//                   "items":[
//                      {
//                         "item_id":201956,
//                         "quantity":2,
//                         "variation_id":235
//                      },
//                      {
//                         "item_id":201961,
//                         "quantity":1,
//                         "variation_id":256
//                      }
//                   ],
//                   "restaurant_id":"res_7705009",
//                   "ordered":null,
//                   "trash":false,
//                   "created_at":"2024-10-26T05:38:29.492Z",
//                   "updated_at":"2024-10-26T05:38:29.492Z",
//                   "dealItemData":[
//                      {
//                         "item_id":201956,
//                         "item_name":"Falafel Platter",
//                         "cuisine_id":201953,
//                         "description":"Crispy fried falafel served with tahini sauce, salad, and pita bread.",
//                         "price":null,
//                         "images":[
//                            "images/1729754630660--falafel-platter.jpg",
//                            "images/1729754652148--falafel-plate-olives.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:24:34.731Z",
//                         "updated_at":"2024-10-24T02:24:34.731Z"
//                      },
//                      {
//                         "item_id":201961,
//                         "item_name":"Beef Tacos",
//                         "cuisine_id":201951,
//                         "description":"Soft or crispy tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
//                         "price":null,
//                         "images":[
//                            "images/1729756402984--mexian-beef-tacos.jpg",
//                            "images/1729756429304--mexian-beef-tacos-.jpg"
//                         ],
//                         "total_orders":null,
//                         "restaurant_id":"res_4074614",
//                         "trash":false,
//                         "created_at":"2024-10-24T02:54:14.163Z",
//                         "updated_at":"2024-10-24T02:54:14.163Z"
//                      }
//                   ],
//                   "dealItemRestaurantData":{
//                      "restaurant_id":"res_7705009",
//                      "user_name":"John Doe",
//                      "phone_no":"1234567890",
//                      "email":"restaurant1@gmail.com",
//                      "password":"$2b$10$iQcfqgo5wodqAqWWKXMvTuuAlebIppqPWcXdsy/.9OaEHi/rz.gLm",
//                      "fcm_token":"fcm_token",
//                      "cnic":"12345-6789012-3",
//                      "buisness_type":"Restaurant",
//                      "buisness_license":"LIC123456",
//                      "buisness_name":"Doe's Diner",
//                      "images":[
//                         "image1.jpg",
//                         "image2.jpg"
//                      ],
//                      "location":"123 Street, City",
//                      "rating":null,
//                      "buisness_address":"456 Avenue",
//                      "buisness_website":"www.doe.com",
//                      "buisness_email":"contact@doe.com",
//                      "minimum_order":"100",
//                      "working_hours":"9 AM - 9 PM",
//                      "request_status":null,
//                      "recieve_notification":true,
//                      "recieve_email":true,
//                      "block_status":false,
//                      "restaurant_timing":null,
//                      "longitude":67.001,
//                      "latitude":24.86,
//                      "trash":false,
//                      "created_at":"2024-10-17T07:16:33.144Z",
//                      "updated_at":"2024-10-17T07:16:33.144Z"
//                   }
//                }
//             }
//          ],
//          "locationData":{
//             "location_id":202031,
//             "customer_id":202028,
//             "street_number":"",
//             "area":"",
//             "floor":"",
//             "house_number":"",
//             "instructions":null,
//             "label":"Lahori Nashta Centre",
//             "address":"M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "longitude":73.08297514915466,
//             "latitude":33.651753086372594,
//             "distance":"2.9 km",
//             "trash":false,
//             "created_at":"2024-10-25T05:53:33.294Z",
//             "updated_at":"2024-10-25T05:53:33.294Z"
//          },
//          "restaurantData":{
//             "restaurant_id":"res_4074614",
//             "user_name":"Grill Out",
//             "phone_no":"1234567890",
//             "email":"stoneove123@gmail.com",
//             "password":"$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
//             "fcm_token":"fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
//             "cnic":"12345-6789012-3",
//             "buisness_type":"Restaurant",
//             "buisness_license":"LIC123456",
//             "buisness_name":"Grill Out",
//             "images":[
//                "image1.jpg",
//                "image2.jpg"
//             ],
//             "location":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "rating":null,
//             "buisness_address":"M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
//             "buisness_website":"www.doe.com",
//             "buisness_email":"contact@doe.com",
//             "minimum_order":"100",
//             "working_hours":"9 AM - 9 PM",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "restaurant_timing":null,
//             "longitude":73.0760657787323,
//             "latitude":33.651552140687556,
//             "trash":false,
//             "created_at":"2024-10-23T05:27:50.178Z",
//             "updated_at":"2024-10-23T05:27:50.178Z"
//          },
//          "riderData":{
//             "rider_id":"rider_1673186",
//             "country":null,
//             "location":null,
//             "fcm_token":"dQh0srw3SHuagmqYXcYnmW:APA91bFK4X92eAIAOi-Kt-Y1k3kemWM7TvfS4Bn5N2jhXR1Ut8N6M1mrUsKac8LQ15yon1WC14M4GU9SXC3j2C21efWvGwWALmaC5486ebYaTIKN13-eqC0",
//             "phone":"921234568790455",
//             "name":"Rider",
//             "photo":"images/1730539657224--rn_image_picker_lib_temp_80300791-8346-44b7-b14e-a5e3b79ae933.jpg",
//             "cnic":"1234567890",
//             "email":"higeha9863@regishub.com",
//             "password":"$2b$10$DQvdaK69xuoVopaUcXPk8O5ubFttXT4Oy.vA.yNRZXINQ0ACcdjz2",
//             "address":"Some locatiom",
//             "dob":"2024-04-02T08:04:00.000Z",
//             "gender":"male",
//             "driver_license":null,
//             "vehicle_ownership":"Fuzzy",
//             "id_card_front_image":"images/1730539632349--rn_image_picker_lib_temp_0c9e1a5e-80a7-4bcc-bd69-fa186082eb31.jpg",
//             "id_card_back_image":"images/1730358093595--rn_image_picker_lib_temp_356f35cb-a1d6-45c5-b61c-20194890674a.jpg",
//             "rating":3.75,
//             "vehicle_model":"Alto",
//             "vehicle_name":"Alto",
//             "request_status":null,
//             "recieve_notification":true,
//             "recieve_email":true,
//             "block_status":false,
//             "trash":false,
//             "created_at":"2024-10-31T01:58:53.175Z",
//             "updated_at":"2024-11-03T14:08:06.701Z",
//             "stripe_rider_id":"cus_R9e7nGUZRaACEv",
//             "active":true,
//             "deleted_at":null,
//             "longitude":null,
//             "latitude":null,
//             "license_front_image":"images/1730358093686--rn_image_picker_lib_temp_4088b8fc-9ed4-460f-808b-a93fed6f593a.jpg",
//             "license_back_image":"images/1730358093764--rn_image_picker_lib_temp_4a7b38c0-b28c-4fa6-bf8e-e9f698ed0423.jpg",
//             "vechile_registration_no":"22554634949",
//             "signup_type":"email"
//          }
//       }
//    },
//     // {
//     //   id: 0,
//     //   title: 'New order request',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'request',
//     // },
//     // {
//     //   id: 1,
//     //   title: 'Order is preparing',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'preparing',
//     // },
//     // {
//     //   id: 2,
//     //   title: 'Order is ready to deliver',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'ready',
//     // },
//     // {
//     //   id: 3,
//     //   title: 'Customer gives you ratings',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'rating',
//     // },
//     // {
//     //   id: 4,
//     //   title: 'Lorem ipsum dolor sit amet ',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user2,
//     // },
//     // {
//     //   id: 5,
//     //   title: 'Lorem ipsum dolor sit amet ',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user3,
//     // },
//     // {
//     //   id: 6,
//     //   title: 'Lorem ipsum dolor sit amet ',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user4,
//     // },
//     // {
//     //   id: 7,
//     //   title: 'Lorem ipsum dolor sit amet ',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user5,
//     // },
//     // {
//     //   id: 8,
//     //   title: 'Lorem ipsum dolor sit amet',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user2,
//     // },
//     // {
//     //   id: 9,
//     //   title: 'Lorem ipsum dolor sit amet',
//     //   description: 'Morem ipsum dolor sit amet, consectetur elit',
//     //   time: '03:00 pm',
//     //   type: 'other',
//     //   profile: Images.user3,
//     // },
//   ]);
  const [data, setData] = useState([])

  const getData = async () => {
    let list = await GetAllNotifications(rider_id);
    console.log({list});
    
    setData(list);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setRefreshing(false);
    getData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      {/* <Loader loading={loading} /> */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Orange]}
            onRefresh={() => onRefresh()}
          />
        }
        data={data}
        ListHeaderComponent={() => <StackHeader title={'Notifications'} />}
        ListEmptyComponent={
         data.length === 0 && refreshing === false ?
             <View style={styles.ListEmptyComponent} >
         <Empty/>
         <Text style={styles.ListEmptyComponentText} >Empty! No Order's Requests</Text>
         </View> :null
         }
         style={{flex: 1,}}
        ItemSeparatorComponent={() => <ItemSeparator style={{width: wp(88)}} />}
      //   contentContainerStyle={{paddingBottom: 30}}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={()=> item?.notification_type == 'order' && navigation.navigate('OrdersDetail',{ 
            item: item.orderData
          
        })} style={styles.card}>
            {item?.type == 'request' ||
            item?.orderData?.order_status == 'in_process' ||
            item?.orderData?.order_status == 'order_placed' ||
            item?.orderData?.order_status == 'placed' ||
            item?.orderData?.order_status == 'pending' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderPlaced />
              </View>
            ) : item?.type == 'preparing' ||
              item?.orderData?.order_status == 'preparing_food' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderInProcess />
              </View>
            ) : item?.type == 'ready' ||
              item?.orderData?.order_status == 'out_for_delivery' ||
              item?.orderData?.order_status == 'ready_to_deliver' ? (
              <View style={styles.iconContainer}>
                <Icons.OrderOutForDelivery />
              </View>
            ) : item?.notification_type == 'updates' ? (
              <View style={styles.iconContainer}>
                <Icons.Refresh />
              </View>
            ) : item?.type == 'rating' ||
              item?.notification_type == 'rating' ? (
              <View style={styles.iconContainer}>
                <Icons.RatingActive />
              </View>
            ) : item?.type == 'order' ||
            item?.notification_type == 'order' ? (
            <View style={styles.iconContainer}>
              <Icons.OrderPlaced />
            </View>
          ):(
              <Avatar.Image
                source={item?.profile}
                size={50}
                style={{backgroundColor: Colors.AvatarBG}}
              />
            )}

            <View style={{marginLeft: 10, flex: 1}}>
              <View style={styles.rowViewSB}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.timeText}>
                  {item?.created_at ? moment(item?.created_at).fromNow() : ''}
                </Text>
              </View>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22},
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#FF572233',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowViewSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.Inter_SemiBold,
    color: Colors.Black,
    fontSize: RFPercentage(1.7),
    lineHeight: 30,
  },
  timeText: {
    fontFamily: Fonts.Inter_Medium,
    color: '#595959',
    fontSize: RFPercentage(1.5),
  },
  description: {
    fontFamily: Fonts.Inter_Regular,
    color: '#595959',
    fontSize: RFPercentage(1.5),
    opacity: 0.7,
  },
  ListEmptyComponent:{
   //  backgroundColor: 'blue',
   //  flex:1, 
   //  alignSelf:'center',
    paddingTop: hp(8),
    alignItems: 'center',
    justifyContent: 'center'

 },
 ListEmptyComponentText: {
   fontSize: RFPercentage(2.5),
   color: Colors.Black,
   fontFamily: Fonts.PlusJakartaSans_SemiBold,
   paddingTop: hp(3)
 }
});
