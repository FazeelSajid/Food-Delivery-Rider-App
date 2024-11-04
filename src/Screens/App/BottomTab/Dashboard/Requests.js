import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../constants'
import OrderCard from '../../../../components/Cards/OrderCard'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../../../components/Popup/PopUp';
import { RefreshControl } from 'react-native-gesture-handler';
import { getAllOrders } from '../../../../utils/helpers/orderApis';
import { useFocusEffect } from '@react-navigation/native';

const Requests = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    let { order_requests, order_history, assigned_orders, isOrderUpdate } = useSelector(store => store.order);
    
    // console.log(order_requests);
    const onRefresh = () => {
        setRefreshing(true);
        getAllOrders(dispatch, null ,setRefreshing)
      };

      useFocusEffect(
        React.useCallback(() => {
        setRefreshing(true);
        getAllOrders(dispatch,null, setRefreshing)
        }, [isOrderUpdate]),
      );

      
    const orderArray =   [
        {
            "order_id": 202237,
            "customer_id": 202028,
            "cart_items_ids": [
                202234,
                202235
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
            "phone_no": "9212345678",
            "promo_code": null,
            "payment_option": "cash",
            "customer_payment": null,
            "comments": null,
            "estimated_delivery_time": 45,
            "order_status": "placed",
            "sub_total": 3900,
            "total_amount": 4514,
            "delivery_charges": 29,
            "gst": 585,
            "created_at": "2024-10-31T08:53:45.982Z",
            "updated_at": "2024-10-31T08:53:45.982Z",
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
                    "cart_item_id": 202234,
                    "cart_id": 0,
                    "item_id": 201954,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 1,
                    "created_at": "2024-10-31T08:50:36.374Z",
                    "updated_at": "2024-10-31T08:50:36.374Z",
                    "variation_id": 227,
                    "sub_total": 500,
                    "itemData": {
                        "item_id": 201954,
                        "item_name": "Hummus with Pita Bread",
                        "cuisine_id": 201953,
                        "description": "A creamy blend of chickpeas, tahini, olive oil, and spices, served with warm pita bread.",
                        "price": null,
                        "images": [
                            "images/1729753548825--AvocadoHummus-2.jpg",
                            "images/1729754042061--Hummus.jpg"
                        ],
                        "total_orders": null,
                        "restaurant_id": "res_4074614",
                        "trash": false,
                        "created_at": "2024-10-24T02:14:35.003Z",
                        "updated_at": "2024-10-24T02:14:35.003Z"
                    }
                },
                {
                    "cart_item_id": 202235,
                    "cart_id": 0,
                    "item_id": 201955,
                    "item_type": "item",
                    "comments": "Adding item in cart",
                    "quantity": 1,
                    "created_at": "2024-10-31T08:50:44.616Z",
                    "updated_at": "2024-10-31T08:50:44.616Z",
                    "variation_id": 234,
                    "sub_total": 3400,
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
        <FlatList  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Orange]}
            onRefresh={onRefresh}
          />
        } contentContainerStyle={{paddingVertical: hp(2)}}  data={order_requests} renderItem={({item})=> {
            // console.log(item);
            
            return (
               < OrderCard item={item} status={item.accepted_by_ridere} />
            )
        }} /> 
    </View>
  )
}

export default Requests

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        // paddingTop: hp(4)


    }
})