import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BASE_URL, googleMapKey } from '../../../utils/globalVariables';
import {  Colors, Fonts, Icons } from '../../../constants';
import StartLocation from '../../../Assets/svg/StartLocation.svg';
import MapPinActive from '../../../Assets/svg/Location.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { handelAcceptRejectOrder, updateOrderDeliveryStatus } from '../../../utils/helpers/orderApis';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../../components/Popup/PopUp';
import {  setUpdatedOrder } from '../../../redux/OrderSlice';
import api from '../../../constants/api';
import RBSheetConfirmation from '../../../components/BottomSheet/RBSheetConfirmation';
import Alert from '../../../Assets/svg/alert.svg';
import { setContacts } from '../../../redux/AuthSlice';
import { io } from 'socket.io-client';
import Loader from '../../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';



const OrderDetails = ({ navigation, route }) => {
    const mapRef = useRef()
    
    const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
    const [loading, setLoading] = useState(false);
    const { rider_id, contacts, Colors } = useSelector(store => store.auth)
    let { isOrderUpdate, updatedOrder } = useSelector(store => store.order);
    const dispatch = useDispatch()

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
    // console.log({updatedOrder});
    useEffect(() => {
        const newSocket = io(BASE_URL);
        // setSocket(newSocket);

        // Fetch contacts on socket connection
        newSocket.on('connect', () => {
            newSocket.emit('getContacts', { rider_id });
        });

        // Listen for contacts data
        newSocket.on('contacts', (contactsData) => {
            dispatch(setContacts(contactsData));

            // console.log({contactsData});



        });


        newSocket.on('error', (error) => {
            console.error('Socket Error:', error.message);
        });

        // Cleanup on component unmount
        return () => {
            newSocket.disconnect();
            dispatch(setUpdatedOrder(''))
            console.log(updatedOrder);

        };
    }, []);


    function getRoomIdByRestaurantId(restaurantId) {
        for (const item of contacts) {
            if (item.restaurant_id === restaurantId) {
                // console.log(item.room_id);

                return item.room_id; // Return the room_id if the restaurant_id matches
            }
        }
        return null; // Return null if no match is found
    }

    function getRoomIdByCustomerId(customerId) {
        for (const item of contacts) {
            if (item.customer_id === customerId) {
                return item.room_id; // Return the room_id if the customer_id matches
            }
        }
        return null; // Return null if no match is found
    }

    const RestaruantContact = { "customer_id": null, "receiver_id": updatedOrder?.restaurantData?.restaurant_id, "receiver_type": "restaurant", "restaurant_id": updatedOrder?.restaurantData?.restaurant_id, "rider_id": rider_id, "room_id": getRoomIdByRestaurantId(updatedOrder?.restaurantData?.restaurant_id), "sender_id": rider_id, "sender_type": "rider", "restaurant_name": updatedOrder?.restaurantData?.user_name , order_id: updatedOrder?.order_id }
    const customerContact = { "customer_id": updatedOrder?.customerData?.customer_id, "receiver_id": updatedOrder?.customerData?.customer_id, "receiver_type": "customer", "restaurant_id": null, "rider_id": rider_id, "room_id": getRoomIdByCustomerId(updatedOrder?.customerData?.customer_id), "sender_id": rider_id, "sender_type": "rider", "customer_name": updatedOrder?.customerData?.user_name, order_id: updatedOrder?.order_id }

    // console.log({RestaruantContact});

    // Dummy locations for map markers and polyline
    const pickupLocation = {
        latitude: updatedOrder?.restaurantData?.latitude, // Replace with destination latitude
        longitude: updatedOrder?.restaurantData?.longitude, // Replace with origin longitude
    };
    const dropoffLocation = {
        latitude: updatedOrder?.locationData?.latitude, // Replace with destination latitude
        longitude: updatedOrder?.locationData?.longitude, // Replace with destination longitude
    };

    const getDetail = id => {
        setLoading(true);
        fetch(api.get_order_by_id + id)
            .then(response => response.json())
            .then(response => {

                console.log('Order iD  +++++++++++ ', id, { response });
                if (response.error == false) {


                    // setOrderDetails(response.result);
                    dispatch(setUpdatedOrder(response.result))
                    // if (response?.result?.order_status == 'out_for_delivery') {
                    //     setSelected(0);
                    // } else if (response?.result?.order_status == 'delievered') {
                    //     setSelected(1);
                    // } else {
                    //     setSelected(0);
                    // }



                } else {
                    // setOrderDetails(route?.params?.item);
                }
            })
            .catch(err => console.log('error : ', err))
            .finally(() => setLoading(false));
    };

    // useEffect(() => {
    //     // setOrderDetails(route?.params?.item)
    //     // setOrderStatus(route?.params?.item?.order_status)
    //     // setAccepted(route.params?.item?.accepted_by_rider)
    //     // getDetail(route?.params?.item?.order_id);

    // }, [isOrderUpdate])


    useEffect(() => {

        if (updatedOrder) {
            if (mapRef.current) {
                mapRef.current.fitToCoordinates([pickupLocation, dropoffLocation], {
                    edgePadding: { top: 200, right: 100, bottom: 200, left: 100 }, // Adjust padding as needed
                    animated: true,
                });
            }
        } else {
            getDetail(route?.params?.id)
        }

    }, [pickupLocation, dropoffLocation]);




    // const updateOrderDeliveryStatus = async (status, order_id, rider_id, dispatch, isOrderUpdate) => {
    //     let data = {
    //         order_id: order_id,
    //         order_status: status, //out_for_delivery, delivered
    //         rider_id: rider_id
    //     }
    //     console.log({ data, });
    //     console.log({ isOrderUpdate });
    //     fetch(api.updateOrderStatusByRider, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(async response => {
    //             console.log('response  :  ', response);
    //             if (response?.error == true) {
    //                 dispatch(setShowPopUp(true))
    //                 dispatch(setPopUpColor('red'))
    //                 dispatch(setPopUpMesage('Something is went wrong, While updating orders'))

    //                 setTimeout(() => {
    //                     dispatch(setShowPopUp(false))
    //                     dispatch(setPopUpColor(''))
    //                     dispatch(setPopUpMesage(''))
    //                 }, 1000);
    //             } else {
    //                 dispatch(setIsOrderUpdate(!isOrderUpdate))
    //                 setAccepted(response?.result?.accepted_by_rider)
    //                 setOrderStatus(response?.result?.order_status)
    //                 if (status === 'delivered') {
    //                     dispatch(setShowPopUp(true))
    //                     dispatch(setPopUpColor(Colors.primary_color))
    //                     dispatch(setPopUpMesage('Order Delivered'));

    //                     setTimeout(() => {
    //                         dispatch(setShowPopUp(false))
    //                         dispatch(setPopUpColor(''))
    //                         navigation.goBack()
    //                         dispatch(setPopUpMesage(''))
    //                     })
    //                 } else if (status === 'out_for_delivery') {
    //                     dispatch(setShowPopUp(true))
    //                     dispatch(setPopUpColor(Colors.primary_color))
    //                     dispatch(setPopUpMesage('Order is on the way'));

    //                     setTimeout(() => {
    //                         dispatch(setShowPopUp(false))
    //                         dispatch(setPopUpColor(''))

    //                         dispatch(setPopUpMesage(''))
    //                     })
    //                 }
    //             }
    //         })
    //         .catch(err => {
    //             console.log('Error in accept/reject order :  ', err);
    //             showAlert('Something went wrong');
    //         })
    //         .finally(() => {

    //         });
    // };

    const openBtmSheet = (obj) => {
        // ref_RBSheet?.current?.open()
        // setBtmSheetValues(obj)
        if (updatedOrder?.order_status === 'out_for_delivery' || updatedOrder?.order_status === 'delivered' || updatedOrder?.order_status === 'ready_to_deliver' || obj.status === 'accept' || obj.status === "reject") {
            ref_RBSheet?.current?.open();
            setBtmSheetValues(obj);
        }
        else {
            alert_RBSheet?.current?.open()
        }

    }




    function getInitials(input) {
        // Split the string into words
        const words = input.trim().split(' ');

        // Check the number of words
        if (words.length === 1) {
            // If only one word, return the first letter in uppercase
            return words[0][0].toUpperCase();
        } else {
            // If two or more words, return the first letters of the first two words in uppercase
            return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        }
    }

    const handleSelectContact = async (contact) => {


        navigation.navigate('Conversation', {
            contact: contact,
            name: contact?.restaurant_name || contact?.customer_name
        })
    };

    // const handelAcceptRejectOrder = async (status, order_id, rider_id, dispatch, isOrderUpdate) => {
    //     console.log({ isOrderUpdate });
    //     setLoading(true)

    //     let data = {
    //         rider_id: rider_id,
    //         order_id: order_id,
    //         action: status,
    //         reason: 'Reason',
    //     };
    //     console.log({ data, });
    //     // console.log({ isOrderUpdate });
    //     fetch(api.accept_reject_order_by_rider, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(async response => {
    //             console.log('response  :  ', response);
    //             if (response?.error == true) {
    //                 dispatch(setShowPopUp(true))
    //                 dispatch(setPopUpColor('red'))
    //                 dispatch(setPopUpMesage('Something is went wrong, While updating order'))

    //                 setTimeout(() => {
    //                     dispatch(setShowPopUp(false))
    //                     dispatch(setPopUpColor(''))
    //                     dispatch(setPopUpMesage(''))
    //                 }, 1000);
    //             } else {
    //                 dispatch(setIsOrderUpdate(!isOrderUpdate))
    //                 setAccepted(response?.result?.accepted_by_rider)
    //                 setOrderStatus(response?.result?.accepted_by_rider)

    //                 console.log(response?.result?.accepted_by_rider, response?.result?.order_status);


    //                 // if (status == 'out_for_delivery') {
    //                 //     dispatch(setShowPopUp(true))
    //                 //     dispatch(setPopUpColor(Colors.primary_color))
    //                 //     dispatch(setPopUpMesage('Order Accepted'));

    //                 //     setTimeout(() => {
    //                 //         dispatch(setShowPopUp(false))
    //                 //         dispatch(setPopUpColor(''))
    //                 //         dispatch(setPopUpMesage(''))
    //                 //     })

    //                 //     setOrderStatus(status)
    //                 //     setLoading(false)
    //                 // }
    //             }
    //         })
    //         .catch(err => {
    //             console.log('Error in accept/reject order :  ', err);
    //             showAlert('Something went wrong');
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         });
    // };


    //   console.log(orderStatus);

    // console.log(updatedOrder);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.secondary_color,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: wp(4),
            paddingVertical: hp(2),
            backgroundColor: Colors.primary_color,
        },
        backButton: {
            marginRight: wp(2),
        },
      
        headerTitle: {
            color: Colors.secondary_color,
            fontSize: wp(5),
            flex: 1,
            textAlign: 'center',
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
        },
        chatButton: {
            marginLeft: wp(2),
        },
        chatButtonText: {
            fontSize: wp(5),
        },
        mapView: {
            width: '100%',
            height: hp(28),
            borderRadius: 8,
            marginBottom: hp(1),
        },
        detailsContainer: {
            // padding: wp(4),
        },
        orderId: {
            fontSize: wp(5),
            marginBottom: hp(1),
            fontFamily: Fonts.PlusJakartaSans_Bold,
            color: Colors.primary_text
        },
        infoSection: {
            marginVertical: hp(1.5),
        },
        iconLabelRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconContainer: {
            width: wp(6),
            height: wp(6),
            borderRadius: wp(3),
            backgroundColor: Colors.primary_color,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: wp(2),
        },
    
        sectionTitle: {
            fontSize: wp(4),
            fontWeight: '700',
            flex: 1,
        },
        distance: {
            fontSize: wp(3.5),
            color: Colors.secondary_text,
        },
        subtitle: {
            fontSize: wp(4),
            fontWeight: '600',
            color: Colors.secondary_text,
        },
        address: {
            fontSize: wp(3.5),
            color: Colors.secondary_text,
            marginTop: hp(0.5),
        },
        estimatedCommissionTitle: {
            fontSize: wp(4.5),
            fontFamily: Fonts.PlusJakartaSans_Bold,
            color: Colors.primary_color
        },
        commissionAmount: {
            fontSize: wp(4.5),
            fontFamily: Fonts.PlusJakartaSans_Medium,
            color: Colors.secondary_text,
            marginVertical: hp(0.5),
        },
        btncontainer: {
            backgroundColor: Colors.secondary_color, // Background color of the container
            borderTopRightRadius: wp(10), // Rounded corners for the container
            borderTopLeftRadius: wp(10), // Rounded corners for the container
            paddingVertical: hp(2), // Vertical padding inside the container
            paddingHorizontal: wp(8), // Horizontal padding inside the container
            // alignItems: 'center', // Center align items
            shadowColor: '#000', // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
            shadowOpacity: 2, // Shadow opacity for iOS
            shadowRadius: 15, // Shadow radius for iOS
            elevation: 10, // Shadow for Android
            // marginHorizontal: wp(5), // Horizontal margin around the container
        },
        buttonContainer: {
            flexDirection: 'column',
            // alignItems: 'center',
        },
        acceptButton: {
            backgroundColor: Colors.button.primary_button,
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(25),
            borderRadius: wp(5),
            marginBottom: hp(1),
        },
        rejectButton: {
            borderColor: Colors.button.secondary_button_text,
            borderWidth: 2,
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(25),
            borderRadius: wp(5),
        },
        buttonText: {
            color: Colors.button.primary_button_text,
            fontSize: wp(4),
            fontFamily: Fonts.PlusJakartaSans_SemiBold,
            textAlign: 'center',
            width: '100%',
            // backgroundColor: 'green'
        },
        rejectButtonText: {
            color: Colors.button.secondary_button_text,
            fontSize: wp(4),
            fontWeight: '600',
            textAlign: 'center',
        },
        locationContainer: {
            marginVertical: hp(1),
        },
        verticalDottedLine: {
            // height: 45,
            minHeight: 85,
            flex: 1,
            borderWidth: 0.8,
            borderColor: Colors.primary_color,
            borderStyle: 'dashed',
            width: 0.5,
            // marginLeft: 19,
            marginLeft: 8,
            position: 'absolute',
            left: 6,
            top: 28,
        },
        locationRow: {
            flexDirection: 'row',
            // alignItems: 'center',
            marginBottom: hp(0.5),
        },
        locationIcon: {
            fontSize: wp(5),
            color: Colors.primary_color,
            marginRight: wp(2),
        },
        locationText: {
            // fontSize: wp(3.5),
            color: Colors.secondary_text,
            flex: 1,
            // fontFamily: Fonts.PlusJakartaSans_Regular,
            marginLeft: wp(2),
            fontFamily: Fonts.PlusJakartaSans_Medium, fontSize: wp(4)
        },
        textContainer: {
            marginLeft: 10,
            flex: 1,
        },
        itemView: {
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#F6F6F6',
            backgroundColor: Colors.secondary_color,
            padding: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            overflow: 'hidden',
        },
        subText: {
            color: Colors.secondary_text,
            fontFamily: Fonts.Inter_Regular,
            fontSize: RFPercentage(2),
        },
        rowView: {
            flexDirection: 'row',
            alignItems: 'center',
          },
    });


    return (
        <View style={styles.container}>
            {/* Header */}
            {showPopUp && <PopUp color={popUpColor} message={PopUpMesage} />}


            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    {/* Replace with an actual back icon if needed */}
                    <Feather
                        name={'chevron-left'}
                        size={25}
                        color={Colors.button.primary_button_text}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order# {updatedOrder?.order_id}</Text>

            </View>

            {/* Map Section */}



            {/* Order Information Section */}
            <ScrollView contentContainerStyle={styles.detailsContainer} refreshControl={<RefreshControl refreshing={false} colors={[Colors.primary_color]} onRefresh={() => {
                getDetail(route?.params?.item?.order_id)
            }} />} >
                <Loader loading={loading} bgColor={'white'} />
                {
                    updatedOrder &&
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('OrderMapScreen', {
                        item: updatedOrder
                    })}>
                        <MapView

                            ref={mapRef}
                            style={styles.mapView}
                            initialRegion={{
                                latitude: (pickupLocation?.latitude + dropoffLocation?.latitude) / 2,
                                longitude: (pickupLocation?.longitude + dropoffLocation?.longitude) / 2,
                                latitudeDelta: 1,
                                longitudeDelta: 1,
                            }}
                            focusable={true}
                        >
                            <Marker coordinate={pickupLocation} title="Pickup Location" />
                            <Marker coordinate={dropoffLocation} title="Drop-off Location" />

                            {/* Draw Route */}
                            <MapViewDirections
                                origin={pickupLocation}
                                destination={dropoffLocation}
                                apikey={googleMapKey}
                                strokeWidth={3}
                                strokeColor={Colors.primary_color}
                            />
                        </MapView>
                    </TouchableOpacity>

                }
                <View style={{ padding: wp(4) }} >


                    <Text style={styles.orderId}>Order#{updatedOrder?.order_id}</Text>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationRow}>
                            <View style={{ marginTop: wp(1.5) }} >
                                <StartLocation height={hp(4)} width={wp(8)} />
                            </View>

                            <View>
                                <Text style={[styles.orderId, { fontSize: RFPercentage(2.5), marginBottom: 0, marginTop: hp(0.5) }]}>
                                    Pickup
                                </Text>
                                <Text style={[styles.locationText, { fontFamily: Fonts.PlusJakartaSans_SemiBold, fontSize: wp(4) }]}>
                                    {updatedOrder?.restaurantData?.user_name}
                                </Text>
                                <Text style={styles.locationText}>
                                    {updatedOrder?.restaurantData?.location}
                                </Text>

                            </View>

                        </View>

                        <View style={styles.verticalDottedLine} />
                        <View style={styles.locationRow}>
                            <View style={{ marginTop: wp(1.5) }} >
                                <MapPinActive height={hp(4)} width={wp(8)} />
                            </View>

                            <View>
                                <Text style={[styles.orderId, { fontSize: RFPercentage(2.5), marginBottom: 0, marginTop: hp(0.5) }]}>
                                    DropOff
                                </Text>

                                <Text style={[styles.locationText, {}]}>
                                    {updatedOrder?.customerData?.user_name}
                                </Text>


                                <Text style={styles.locationText}>
                                    {updatedOrder?.locationData?.address}
                                </Text>

                            </View>

                        </View>
                    </View>

                    

                    <View style={{ paddingVertical: hp(2) }}>
                        {updatedOrder?.cart_items_Data &&
                            updatedOrder?.cart_items_Data?.map((item, key) => {
                                // console.log(item?.itemData, ' dfsdfwe');
                                // {item?.item_type == 'deal' ? item.price * item?.quantity : item?.variationData?.price * item?.quantity}

                                return (
                                    <View key={key} style={{ ...styles.rowView, marginBottom: 5 }}>
                                        <Ionicons
                                            name={'close'}
                                            size={15}
                                            color={Colors.primary_color}
                                            style={{ marginBottom: -3 }}
                                        />
                                        <Text
                                            style={{
                                                color: Colors.primary_color,
                                                fontFamily: Fonts.PlusJakartaSans_Bold,
                                                fontSize: RFPercentage(2),
                                                marginLeft: 5,
                                                marginHorizontal: 10,
                                            }}>
                                            {item?.quantity}
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.primary_text,
                                                fontFamily: Fonts.PlusJakartaSans_Bold,
                                                fontSize: RFPercentage(2),
                                            }}>
                                            {item
                                                ? item?.item_type == 'deal'
                                                    ? item?.itemData?.name
                                                    : item?.itemData?.item_name
                                                : ''}
                                        </Text>
                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: 'right',
                                                color: Colors.primary_color,
                                                fontFamily: Fonts.PlusJakartaSans_SemiBold,
                                                fontSize: RFPercentage(2),
                                            }}>
                                            $ {item?.item_type == 'deal' ? item.sub_total * item?.quantity : item?.sub_total * item?.quantity}
                                        </Text>
                                    </View>
                                )
                            })}
                    </View>

                    {/* Estimated Commission */}
                    <Text style={styles.estimatedCommissionTitle}>Estimated Commission</Text>
                    <Text style={styles.commissionAmount}>£{updatedOrder?.delivery_charges}</Text>

                    {/* Special Instructions */}
                    <Text style={styles.estimatedCommissionTitle}>Special Instructions</Text>
                    <Text style={styles.commissionAmount}>
                        {updatedOrder?.description}
                    </Text>
                </View>
                <View style={{ marginHorizontal: wp(7) }} >


                    {updatedOrder?.customerData?.customer_id && (
                        <View style={styles.itemView}>
                            <View style={{ backgroundColor: Colors.primary_color, paddingHorizontal: wp(4), paddingVertical: wp(2.2), borderRadius: wp(10), }} ><Text style={{ color: Colors.secondary_color, fontSize: RFPercentage(2.4), padding: 0 }} >{getInitials(updatedOrder?.customerData?.user_name)}</Text></View>

                            <View style={styles.textContainer}>
                                <Text style={{ ...styles.subText, marginLeft: 5 }}>
                                    {updatedOrder?.customerData?.user_name}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() =>
                                    handleSelectContact(customerContact)
                                }>
                                <Icons.ChatActive />
                            </TouchableOpacity>
                        </View>
                    )}

                    {updatedOrder?.restaurantData?.restaurant_id && (
                        <View style={styles.itemView}>
                            <View style={{ backgroundColor: Colors.primary_color, paddingHorizontal: wp(4), paddingVertical: wp(2.2), borderRadius: wp(10), }} ><Text style={{ color: Colors.secondary_color, fontSize: RFPercentage(2.4), padding: 0 }} >{getInitials(updatedOrder?.restaurantData?.user_name)}</Text></View>
                            <View style={styles.textContainer}>
                                <Text style={{ ...styles.subText, marginLeft: 5 }}>
                                    {/* Rider's name here */}
                                    {updatedOrder?.restaurantData?.user_name}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleSelectContact(RestaruantContact)}>
                                <Icons.ChatActive />
                            </TouchableOpacity>
                        </View>
                    )}



                </View>



            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.btncontainer}>



                {
                    updatedOrder?.accepted_by_rider ?
                        <View style={styles.buttonContainer} >
                            <TouchableOpacity onPress={() => updatedOrder?.order_status === 'out_for_delivery' ? openBtmSheet({
                                title: 'Delivered',
                                btnText: 'Delivered',
                                order_Id: updatedOrder?.order_id,
                                status: 'delivered',
                                amount: updatedOrder?.total_amount,
                                restaurantId: updatedOrder?.restaurant_id,
                                amountToTransfer: updatedOrder?.gst + updatedOrder?.sub_total,
                                commission: updatedOrder?.delivery_charges,
                                payment_option: updatedOrder?.payment_option

                            }) :
                                openBtmSheet({
                                    title: 'Out For Delivery',
                                    btnText: 'Out For Delivery',
                                    order_Id: updatedOrder?.order_id,
                                    status: 'out_for_delivery'
                                })
                            } style={[styles.acceptButton]}>
                                <Text style={styles.buttonText}>{updatedOrder?.order_status === 'out_for_delivery' ? 'Delivered' : "Out For Delivery"}</Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={styles.buttonContainer}  >

                            <TouchableOpacity activeOpacity={0.8} onPress={() => openBtmSheet({
                                title: 'Are you sure to Accept this order?',
                                btnText: 'Accept',
                                order_Id: updatedOrder?.order_id,
                                status: 'accept'
                            })} style={styles.acceptButton}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => openBtmSheet({
                                title: 'Are you sure to Reject this order?',
                                btnText: 'Reject',
                                order_Id: updatedOrder?.order_id,
                                status: 'reject'
                            })} style={styles.rejectButton}>
                                <Text style={styles.rejectButtonText}>Reject (00:60)</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>












            <RBSheetConfirmation
                refRBSheet={ref_RBSheet}
                title={BtmSheetValues.title}
                // description={'Do you want to logout?'}
                okText={BtmSheetValues.btnText}
                height={360}
                onOk={async () => {
                    ref_RBSheet?.current?.close();
                    if (BtmSheetValues.status === 'reject') {
                        handelAcceptRejectOrder('reject', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate,)
                        // setupdatedOrder(Details)


                    } else if (BtmSheetValues.status === "accept") {
                        handelAcceptRejectOrder('accept', BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)

                    } else if (BtmSheetValues.status === 'out_for_delivery') {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate)
                    } else if (BtmSheetValues.status === "delivered") {
                        updateOrderDeliveryStatus(BtmSheetValues.status, BtmSheetValues.order_Id, rider_id, dispatch, isOrderUpdate, () => navigation.navigate('DeliverySuccess', {
                            commission: BtmSheetValues?.commission,
                            amount: BtmSheetValues?.amount,
                            restaurantId: BtmSheetValues?.restaurantId,
                            amountToTransfer: BtmSheetValues?.amountToTransfer,
                            order_Id: BtmSheetValues?.order_Id,
                            payment_option: BtmSheetValues?.payment_option
                        }))
                    }

                }}
            />
            <RBSheetConfirmation
                refRBSheet={alert_RBSheet}
                title={"Alert"}
                description={"For an order to be marked as 'Out for Delivery,' its status must be 'Ready for Delivery.'"}
                okText={'Close'}
                svg={<Alert />}
                height={360}
                onOk={async () => {
                    alert_RBSheet?.current?.close();


                }}
            />


        </View>
    );
};



export default OrderDetails;
