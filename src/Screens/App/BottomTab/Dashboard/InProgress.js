import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors, Fonts } from '../../../../constants'
import OrderCard from '../../../../components/Cards/OrderCard'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { getAssignedOrders, updateOrderDeliveryStatus } from '../../../../utils/helpers/orderApis';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';
import RBSheetConfirmation from '../../../../components/BottomSheet/RBSheetConfirmation';
import { useNavigation } from '@react-navigation/native';
import NoOrderReq from '../../../../Assets/svg/NoOrderReq.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CRBSheetComponent from '../../../../components/BottomSheet/CRBSheetComponent';
import CButton from '../../../../components/Buttons/CButton';
import Alert from '../../../../Assets/svg/alert.svg';
const InProgress = () => {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const rider_id = useSelector(store => store.auth.rider_id)
    let { assigned_orders, isOrderUpdate } = useSelector(store => store.order);
    const ref_RBSheet = useRef()
    const alert_RBSheet = useRef()
    const [BtmSheetValues, setBtmSheetValues] = useState({
        title: '',
        btnText: '',
        order_Id: 0,
        status: '',
        restaurantId: '',
        amountToTransfer: 0,
        payment_option: ''
    })

    const dispatch = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);
        getAssignedOrders(rider_id, dispatch, null, setRefreshing)
    };


    useEffect(() => {
        setRefreshing(true);
        getAssignedOrders(rider_id, dispatch, null, setRefreshing)
    }, [isOrderUpdate])


    // useFocusEffect(
    //     React.useCallback(() => {
    //     setRefreshing(true);
    //     getAssignedOrders(rider_id,dispatch,null, setRefreshing)
    //     }, [isOrderUpdate]),
    //   );

    //   console.log({assigned_orders});


    //   const filteredItems = []
    const filteredItems = assigned_orders.filter(order => order.order_status !== 'cancelled' && order.order_status !== 'delivered');
    //   console.log({filteredItems});

    // console.log(assigned_orders);
    


    const orderArray = [
        {
            "order_id": 202033,
            "customer_id": 202028,
            "cart_items_ids": [
                202030
            ],
            "description": "Order creating",
            "location_id": 202031,
            "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
            "restaurant_id": "res_4074614",
            "accepted_by_restaurant": false,
            "accepted_by_rider": false,
            "rejectedby": null,
            "rating": 0,
            "rider_id": null,
            "phone_no": "9200000000000",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "cancelled",
            "sub_total": 1200,
            "total_amount": 1409,
            "delivery_charges": 29,
            "gst": 180,
            "created_at": "2024-10-25T05:53:55.106Z",
            "updated_at": "2024-10-25T05:53:55.106Z",
            "customerData": {
                "customer_id": 202028,
                "user_name": "Testing@123",
                "phone_no": "123",
                "email": "bonajep397@regishub.com",
                "signup_type": "email",
                "password": "$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
                "location": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "fcm_token": "cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
                "recieve_notification": false,
                "verified": true,
                "block_status": false,
                "trash": false,
                "created_at": "2024-10-25T05:45:14.589Z",
                "updated_at": "2024-10-25T05:45:14.589Z",
                "recieve_email": false,
                "stripe_customer_id": null,
                "deleted_at": null,
                "rest_id": null
            },
            "cart_items_Data": [
                {
                    "cart_item_id": 202030,
                    "cart_id": 0,
                    "item_id": 201955,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 2,
                    "created_at": "2024-10-25T05:52:46.731Z",
                    "updated_at": "2024-10-25T05:52:46.731Z",
                    "variation_id": 231,
                    "sub_total": 600,
                    "itemData": {
                        "item_id": 201955,
                        "item_name": "Greek Salad",
                        "cuisine_id": 201953,
                        "description": "A fresh salad with cucumbers, tomatoes, onions, olives, and feta cheese, topped with olive oil and oregano.",
                        "price": null,
                        "images": [
                            "images/1729754235671--Greek-Salad.webp",
                            "images/1729754296730--Greek-Salad.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T02:19:49.997Z",
                        "updated_at": "2024-10-24T02:19:49.997Z"
                    },
                    "variationData": {
                        "variation_id": 231,
                        "item_id": 201955,
                        "variation_name": "Small",
                        "price": "600",
                        "created_at": "2024-10-24T02:19:50.276Z",
                        "updated_at": "2024-10-24T02:19:50.276Z"
                    }
                }
            ],
            "locationData": {
                "location_id": 202031,
                "customer_id": 202028,
                "street_number": "",
                "area": "",
                "floor": "",
                "house_number": "",
                "instructions": null,
                "label": "Lahori Nashta Centre",
                "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "distance": "2.9 km",
                "trash": false,
                "created_at": "2024-10-25T05:53:33.294Z",
                "updated_at": "2024-10-25T05:53:33.294Z"
            },
            "restaurantData": {
                "restaurant_id": "res_4074614",
                "user_name": "Grill Out",
                "phone_no": "1234567890",
                "email": "stoneove123@gmail.com",
                "password": "$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
                "fcm_token": "fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
                "cnic": "12345-6789012-3",
                "buisness_type": "Restaurant",
                "buisness_license": "LIC123456",
                "buisness_name": "Grill Out",
                "images": [
                    "image1.jpg",
                    "image2.jpg"
                ],
                "location": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "rating": null,
                "buisness_address": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "buisness_website": "www.doe.com",
                "buisness_email": "contact@doe.com",
                "minimum_order": "100",
                "working_hours": "9 AM - 9 PM",
                "request_status": null,
                "recieve_notification": true,
                "recieve_email": true,
                "block_status": false,
                "restaurant_timing": null,
                "longitude": 73.0760657787323,
                "latitude": 33.651552140687556,
                "trash": false,
                "created_at": "2024-10-23T05:27:50.178Z",
                "updated_at": "2024-10-23T05:27:50.178Z"
            }
        },
        {
            "order_id": 202035,
            "customer_id": 202028,
            "cart_items_ids": [
                202030
            ],
            "description": "Order creating",
            "location_id": 202031,
            "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
            "restaurant_id": "res_4074614",
            "accepted_by_restaurant": false,
            "accepted_by_rider": false,
            "rejectedby": null,
            "rating": 0,
            "rider_id": null,
            "phone_no": "9200000000000",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "cancelled",
            "sub_total": 1200,
            "total_amount": 1409,
            "delivery_charges": 29,
            "gst": 180,
            "created_at": "2024-10-25T05:55:31.146Z",
            "updated_at": "2024-10-25T05:55:31.146Z",
            "customerData": {
                "customer_id": 202028,
                "user_name": "Testing@123",
                "phone_no": "123",
                "email": "bonajep397@regishub.com",
                "signup_type": "email",
                "password": "$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
                "location": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "fcm_token": "cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
                "recieve_notification": false,
                "verified": true,
                "block_status": false,
                "trash": false,
                "created_at": "2024-10-25T05:45:14.589Z",
                "updated_at": "2024-10-25T05:45:14.589Z",
                "recieve_email": false,
                "stripe_customer_id": null,
                "deleted_at": null,
                "rest_id": null
            },
            "cart_items_Data": [
                {
                    "cart_item_id": 202030,
                    "cart_id": 0,
                    "item_id": 201955,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 2,
                    "created_at": "2024-10-25T05:52:46.731Z",
                    "updated_at": "2024-10-25T05:52:46.731Z",
                    "variation_id": 231,
                    "sub_total": 600,
                    "itemData": {
                        "item_id": 201955,
                        "item_name": "Greek Salad",
                        "cuisine_id": 201953,
                        "description": "A fresh salad with cucumbers, tomatoes, onions, olives, and feta cheese, topped with olive oil and oregano.",
                        "price": null,
                        "images": [
                            "images/1729754235671--Greek-Salad.webp",
                            "images/1729754296730--Greek-Salad.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T02:19:49.997Z",
                        "updated_at": "2024-10-24T02:19:49.997Z"
                    },
                    "variationData": {
                        "variation_id": 231,
                        "item_id": 201955,
                        "variation_name": "Small",
                        "price": "600",
                        "created_at": "2024-10-24T02:19:50.276Z",
                        "updated_at": "2024-10-24T02:19:50.276Z"
                    }
                }
            ],
            "locationData": {
                "location_id": 202031,
                "customer_id": 202028,
                "street_number": "",
                "area": "",
                "floor": "",
                "house_number": "",
                "instructions": null,
                "label": "Lahori Nashta Centre",
                "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "distance": "2.9 km",
                "trash": false,
                "created_at": "2024-10-25T05:53:33.294Z",
                "updated_at": "2024-10-25T05:53:33.294Z"
            },
            "restaurantData": {
                "restaurant_id": "res_4074614",
                "user_name": "Grill Out",
                "phone_no": "1234567890",
                "email": "stoneove123@gmail.com",
                "password": "$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
                "fcm_token": "fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
                "cnic": "12345-6789012-3",
                "buisness_type": "Restaurant",
                "buisness_license": "LIC123456",
                "buisness_name": "Grill Out",
                "images": [
                    "image1.jpg",
                    "image2.jpg"
                ],
                "location": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "rating": null,
                "buisness_address": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "buisness_website": "www.doe.com",
                "buisness_email": "contact@doe.com",
                "minimum_order": "100",
                "working_hours": "9 AM - 9 PM",
                "request_status": null,
                "recieve_notification": true,
                "recieve_email": true,
                "block_status": false,
                "restaurant_timing": null,
                "longitude": 73.0760657787323,
                "latitude": 33.651552140687556,
                "trash": false,
                "created_at": "2024-10-23T05:27:50.178Z",
                "updated_at": "2024-10-23T05:27:50.178Z"
            }
        },
        {
            "order_id": 202041,
            "customer_id": 202028,
            "cart_items_ids": [
                202039
            ],
            "description": "Order creating",
            "location_id": 202031,
            "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
            "restaurant_id": "res_4074614",
            "accepted_by_restaurant": false,
            "accepted_by_rider": false,
            "rejectedby": null,
            "rating": 0,
            "rider_id": null,
            "phone_no": "9200000000000",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "cancelled",
            "sub_total": 600,
            "total_amount": 719,
            "delivery_charges": 29,
            "gst": 90,
            "created_at": "2024-10-25T06:17:25.097Z",
            "updated_at": "2024-10-25T06:17:25.097Z",
            "customerData": {
                "customer_id": 202028,
                "user_name": "Testing@123",
                "phone_no": "123",
                "email": "bonajep397@regishub.com",
                "signup_type": "email",
                "password": "$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
                "location": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "fcm_token": "cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
                "recieve_notification": false,
                "verified": true,
                "block_status": false,
                "trash": false,
                "created_at": "2024-10-25T05:45:14.589Z",
                "updated_at": "2024-10-25T05:45:14.589Z",
                "recieve_email": false,
                "stripe_customer_id": null,
                "deleted_at": null,
                "rest_id": null
            },
            "cart_items_Data": [
                {
                    "cart_item_id": 202039,
                    "cart_id": 0,
                    "item_id": 201955,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 1,
                    "created_at": "2024-10-25T06:16:56.596Z",
                    "updated_at": "2024-10-25T06:16:56.596Z",
                    "variation_id": 231,
                    "sub_total": 600,
                    "itemData": {
                        "item_id": 201955,
                        "item_name": "Greek Salad",
                        "cuisine_id": 201953,
                        "description": "A fresh salad with cucumbers, tomatoes, onions, olives, and feta cheese, topped with olive oil and oregano.",
                        "price": null,
                        "images": [
                            "images/1729754235671--Greek-Salad.webp",
                            "images/1729754296730--Greek-Salad.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T02:19:49.997Z",
                        "updated_at": "2024-10-24T02:19:49.997Z"
                    },
                    "variationData": {
                        "variation_id": 231,
                        "item_id": 201955,
                        "variation_name": "Small",
                        "price": "600",
                        "created_at": "2024-10-24T02:19:50.276Z",
                        "updated_at": "2024-10-24T02:19:50.276Z"
                    }
                }
            ],
            "locationData": {
                "location_id": 202031,
                "customer_id": 202028,
                "street_number": "",
                "area": "",
                "floor": "",
                "house_number": "",
                "instructions": null,
                "label": "Lahori Nashta Centre",
                "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "distance": "2.9 km",
                "trash": false,
                "created_at": "2024-10-25T05:53:33.294Z",
                "updated_at": "2024-10-25T05:53:33.294Z"
            },
            "restaurantData": {
                "restaurant_id": "res_4074614",
                "user_name": "Grill Out",
                "phone_no": "1234567890",
                "email": "stoneove123@gmail.com",
                "password": "$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
                "fcm_token": "fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
                "cnic": "12345-6789012-3",
                "buisness_type": "Restaurant",
                "buisness_license": "LIC123456",
                "buisness_name": "Grill Out",
                "images": [
                    "image1.jpg",
                    "image2.jpg"
                ],
                "location": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "rating": null,
                "buisness_address": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "buisness_website": "www.doe.com",
                "buisness_email": "contact@doe.com",
                "minimum_order": "100",
                "working_hours": "9 AM - 9 PM",
                "request_status": null,
                "recieve_notification": true,
                "recieve_email": true,
                "block_status": false,
                "restaurant_timing": null,
                "longitude": 73.0760657787323,
                "latitude": 33.651552140687556,
                "trash": false,
                "created_at": "2024-10-23T05:27:50.178Z",
                "updated_at": "2024-10-23T05:27:50.178Z"
            }
        },
        {
            "order_id": 202037,
            "customer_id": 202028,
            "cart_items_ids": [
                202030
            ],
            "description": "Order creating",
            "location_id": 202031,
            "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
            "restaurant_id": "res_4074614",
            "accepted_by_restaurant": false,
            "accepted_by_rider": false,
            "rejectedby": "restaurant",
            "rating": 0,
            "rider_id": null,
            "phone_no": "9200000000000",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "cancelled",
            "sub_total": 1200,
            "total_amount": 1409,
            "delivery_charges": 29,
            "gst": 180,
            "created_at": "2024-10-25T05:56:24.155Z",
            "updated_at": "2024-10-25T05:56:24.155Z",
            "customerData": {
                "customer_id": 202028,
                "user_name": "Testing@123",
                "phone_no": "123",
                "email": "bonajep397@regishub.com",
                "signup_type": "email",
                "password": "$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
                "location": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "fcm_token": "cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
                "recieve_notification": false,
                "verified": true,
                "block_status": false,
                "trash": false,
                "created_at": "2024-10-25T05:45:14.589Z",
                "updated_at": "2024-10-25T05:45:14.589Z",
                "recieve_email": false,
                "stripe_customer_id": null,
                "deleted_at": null,
                "rest_id": null
            },
            "cart_items_Data": [
                {
                    "cart_item_id": 202030,
                    "cart_id": 0,
                    "item_id": 201955,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 2,
                    "created_at": "2024-10-25T05:52:46.731Z",
                    "updated_at": "2024-10-25T05:52:46.731Z",
                    "variation_id": 231,
                    "sub_total": 600,
                    "itemData": {
                        "item_id": 201955,
                        "item_name": "Greek Salad",
                        "cuisine_id": 201953,
                        "description": "A fresh salad with cucumbers, tomatoes, onions, olives, and feta cheese, topped with olive oil and oregano.",
                        "price": null,
                        "images": [
                            "images/1729754235671--Greek-Salad.webp",
                            "images/1729754296730--Greek-Salad.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T02:19:49.997Z",
                        "updated_at": "2024-10-24T02:19:49.997Z"
                    },
                    "variationData": {
                        "variation_id": 231,
                        "item_id": 201955,
                        "variation_name": "Small",
                        "price": "600",
                        "created_at": "2024-10-24T02:19:50.276Z",
                        "updated_at": "2024-10-24T02:19:50.276Z"
                    }
                }
            ],
            "locationData": {
                "location_id": 202031,
                "customer_id": 202028,
                "street_number": "",
                "area": "",
                "floor": "",
                "house_number": "",
                "instructions": null,
                "label": "Lahori Nashta Centre",
                "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "distance": "2.9 km",
                "trash": false,
                "created_at": "2024-10-25T05:53:33.294Z",
                "updated_at": "2024-10-25T05:53:33.294Z"
            },
            "restaurantData": {
                "restaurant_id": "res_4074614",
                "user_name": "Grill Out",
                "phone_no": "1234567890",
                "email": "stoneove123@gmail.com",
                "password": "$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
                "fcm_token": "fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
                "cnic": "12345-6789012-3",
                "buisness_type": "Restaurant",
                "buisness_license": "LIC123456",
                "buisness_name": "Grill Out",
                "images": [
                    "image1.jpg",
                    "image2.jpg"
                ],
                "location": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "rating": null,
                "buisness_address": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "buisness_website": "www.doe.com",
                "buisness_email": "contact@doe.com",
                "minimum_order": "100",
                "working_hours": "9 AM - 9 PM",
                "request_status": null,
                "recieve_notification": true,
                "recieve_email": true,
                "block_status": false,
                "restaurant_timing": null,
                "longitude": 73.0760657787323,
                "latitude": 33.651552140687556,
                "trash": false,
                "created_at": "2024-10-23T05:27:50.178Z",
                "updated_at": "2024-10-23T05:27:50.178Z"
            }
        },
        {
            "order_id": 202045,
            "customer_id": 202028,
            "cart_items_ids": [
                202043
            ],
            "description": "Order creating",
            "location_id": 202031,
            "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
            "restaurant_id": "res_4074614",
            "accepted_by_restaurant": true,
            "accepted_by_rider": false,
            "rejectedby": null,
            "rating": 0,
            "rider_id": null,
            "phone_no": "92000000000",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "placed",
            "sub_total": 700,
            "total_amount": 834,
            "delivery_charges": 29,
            "gst": 105,
            "created_at": "2024-10-25T06:20:12.118Z",
            "updated_at": "2024-10-25T06:20:12.118Z",
            "customerData": {
                "customer_id": 202028,
                "user_name": "Testing@123",
                "phone_no": "123",
                "email": "bonajep397@regishub.com",
                "signup_type": "email",
                "password": "$2b$10$iJIk.vVcscE1a/9XCN87gO1IeeGQlrv6bhEV1skEVVrPwp/EUVgT2",
                "location": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "fcm_token": "cezpQiFeSJq15COvwkv-ZV:APA91bFsqA-3652ZjerxQOCHfVJcbx_wVyWJpJMx1JmsrfDsl3gSQ9Zj--FMxhOd4gHA1yZEUZ32NOPZXiZZRUVabAmWrCXdWrB0PZpJGMxzyfY652wDGYE",
                "recieve_notification": false,
                "verified": true,
                "block_status": false,
                "trash": false,
                "created_at": "2024-10-25T05:45:14.589Z",
                "updated_at": "2024-10-25T05:45:14.589Z",
                "recieve_email": false,
                "stripe_customer_id": null,
                "deleted_at": null,
                "rest_id": null
            },
            "cart_items_Data": [
                {
                    "cart_item_id": 202043,
                    "cart_id": 0,
                    "item_id": 201966,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 1,
                    "created_at": "2024-10-25T06:19:23.480Z",
                    "updated_at": "2024-10-25T06:19:23.480Z",
                    "variation_id": 275,
                    "sub_total": 700,
                    "itemData": {
                        "item_id": 201966,
                        "item_name": "Biryani",
                        "cuisine_id": 201950,
                        "description": "Fragrant basmati rice cooked with marinated meat or vegetables and aromatic spices.",
                        "price": null,
                        "images": [
                            "images/1729760912675--biryani.jpg",
                            "images/1729760934786--chicken-biryani.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T04:09:32.530Z",
                        "updated_at": "2024-10-24T04:09:32.530Z"
                    },
                    "variationData": {
                        "variation_id": 275,
                        "item_id": 201966,
                        "variation_name": "Small",
                        "price": "700",
                        "created_at": "2024-10-24T04:09:32.794Z",
                        "updated_at": "2024-10-24T04:09:32.794Z"
                    }
                }
            ],
            "locationData": {
                "location_id": 202031,
                "customer_id": 202028,
                "street_number": "",
                "area": "",
                "floor": "",
                "house_number": "",
                "instructions": null,
                "label": "Lahori Nashta Centre",
                "address": "M32M+M4P, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "longitude": 73.08297514915466,
                "latitude": 33.651753086372594,
                "distance": "2.9 km",
                "trash": false,
                "created_at": "2024-10-25T05:53:33.294Z",
                "updated_at": "2024-10-25T05:53:33.294Z"
            },
            "restaurantData": {
                "restaurant_id": "res_4074614",
                "user_name": "Grill Out",
                "phone_no": "1234567890",
                "email": "stoneove123@gmail.com",
                "password": "$2b$10$RRCMdyaZVqoWW.XUGnPwiOBATSBl5E54L7C/iX2KrqIQX3YpSnqzu",
                "fcm_token": "fRxMnw18QBW22-dadegKHH:APA91bFDQzXcrUlCDCQeCU9e8G5lAMyKUZ2xPgaJ-8vP7iMSRS7n_vNzEdtqS9Gd8L7JoJESAfB6JqJtD8v_DOVYXdXDnvWGw0iXgiXhE5SzChM5_XTeZ96Kt-QqbraN1AE0B2EFAwR8",
                "cnic": "12345-6789012-3",
                "buisness_type": "Restaurant",
                "buisness_license": "LIC123456",
                "buisness_name": "Grill Out",
                "images": [
                    "image1.jpg",
                    "image2.jpg"
                ],
                "location": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "rating": null,
                "buisness_address": "M32G+JCG, Rawalpindi Stadium Rd, Shamsabad, Rawalpindi, Punjab, Pakistan",
                "buisness_website": "www.doe.com",
                "buisness_email": "contact@doe.com",
                "minimum_order": "100",
                "working_hours": "9 AM - 9 PM",
                "request_status": null,
                "recieve_notification": true,
                "recieve_email": true,
                "block_status": false,
                "restaurant_timing": null,
                "longitude": 73.0760657787323,
                "latitude": 33.651552140687556,
                "trash": false,
                "created_at": "2024-10-23T05:27:50.178Z",
                "updated_at": "2024-10-23T05:27:50.178Z"
            }
        }
    ]
    return (
        <View style={styles.container} >
            <FlatList refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    colors={[Colors.primary_color]}
                    onRefresh={onRefresh}
                />
            }
                contentContainerStyle={{ paddingVertical: hp(2) }}
                data={filteredItems}
                renderItem={({ item }) => {
                    console.log(item.order_id)
                    return (
                        < OrderCard item={item} status={item.accepted_by_rider} refe={ref_RBSheet} setBtmSheetValues={setBtmSheetValues} alert_RBSheet = {alert_RBSheet} />
                    )
                }}
                ListEmptyComponent={
                    assigned_orders.length === 0 && refreshing === false ?
                        <View style={styles.ListEmptyComponent} >
                            <NoOrderReq />
                            <Text style={styles.ListEmptyComponentText} >Empty! No Order's Requests</Text>
                        </View> : null

                }
            />

            <RBSheetConfirmation
                refRBSheet={ref_RBSheet}
                title={BtmSheetValues.title}
                // description={'Do you want to logout?'}
                okText={BtmSheetValues.btnText}
                height={360}
                onOk={async () => {
                    ref_RBSheet?.current?.close();
                    if (BtmSheetValues.status === 'out_for_delivery') {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
                    } else if (BtmSheetValues.status === "delivered") {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate, () => navigation.navigate('DeliverySuccess', {
                            commission: BtmSheetValues?.commission,
                            amount: BtmSheetValues?.amount,
                            restaurantId: BtmSheetValues.restaurantId,
                            amountToTransfer: BtmSheetValues.amountToTransfer,
                            order_Id: BtmSheetValues.order_Id,
                            payment_option: BtmSheetValues.payment_option
                        }))
                    }

                }}
            />
            <RBSheetConfirmation
                refRBSheet={ref_RBSheet}
                title={BtmSheetValues.title}
                // description={'Do you want to logout?'}
                okText={BtmSheetValues.btnText}
                height={360}
                onOk={async () => {
                    ref_RBSheet?.current?.close();
                    if (BtmSheetValues.status === 'out_for_delivery') {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
                    } else if (BtmSheetValues.status === "delivered") {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate, () => navigation.navigate('DeliverySuccess', {
                            commission: BtmSheetValues?.commission,
                            amount: BtmSheetValues?.amount,
                            restaurantId: BtmSheetValues.restaurantId,
                            amountToTransfer: BtmSheetValues.amountToTransfer,
                            order_Id: BtmSheetValues.order_Id,
                            payment_option: BtmSheetValues.payment_option
                        }))
                    }

                }}
            />
            <RBSheetConfirmation
                refRBSheet={alert_RBSheet}
                title={"Alert"}
                description={"For an order to be marked as 'Out for Delivery,' its status must be 'Ready for Delivery.'"}
                okText={'Close'}
                svg={<Alert/>}
                height={360}
                onOk={async () => {
                    alert_RBSheet?.current?.close();
                   

                }}
            />
             {/* <CRBSheetComponent
                height={310}
                refRBSheet={alert_RBSheet}
                content={
                    <View style={{ width: wp(90) }} >
                        <View style={[styles.rowViewSB1, { alignItems: 'flex-end' }]}>
                            <TouchableOpacity
                                onPress={() => alert_RBSheet?.current?.close()}>
                                <Ionicons name={'close'} size={22} color={'#1E2022'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <Alert height={80} />
                            <Text style={{ marginTop: hp(3), fontSize: RFPercentage(2.4), color: Colors.primary_text, textAlign: 'center' }}>
                                You don't have enough amount in wallet</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: wp(80),
                                alignSelf: 'center'
                            }}>
                            <CButton
                                title={'Cancel'}
                                width={wp(36)}
                                height={hp(5.5)}
                                marginTop={hp(5)}
                                onPress={() => alert_RBSheet?.current?.close()}
                                transparent={true}
                            />
                            <CButton
                                title={'Top-Up'}
                                width={wp(36)}
                                height={hp(5.5)}
                                marginTop={hp(5)}
                                onPress={() => {
                                    alert_RBSheet?.current?.close()
                                    

                                }}
                            />
                        </View>


                    </View>
                }
            /> */}
        </View>
    )
}

export default InProgress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary_color
    },
    ListEmptyComponent: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: hp(8)
    },
    ListEmptyComponentText: {
        fontSize: RFPercentage(2.5),
        color: Colors.primary_text,
        fontFamily: Fonts.PlusJakartaSans_SemiBold,
        paddingTop: hp(3),
        textAlign: 'center'
    }
})