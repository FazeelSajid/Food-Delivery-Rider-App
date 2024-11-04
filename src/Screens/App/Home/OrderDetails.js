import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { googleMapKey } from '../../../utils/globalVariables';
import { Colors, Fonts } from '../../../constants';
import StartLocation from '../../../Assets/svg/StartLocation.svg';
import MapPinActive from '../../../Assets/svg/Location.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { handelAcceptRejectOrder, updateOrderDeliveryStatus } from '../../../utils/helpers/orderApis';
import { useDispatch, useSelector } from 'react-redux';
import PopUp from '../../../components/Popup/PopUp';
import { setPopUpColor, setPopUpMesage, setShowPopUp } from '../../../redux/MySlice';
import { setIsOrderUpdate } from '../../../redux/OrderSlice';
import api from '../../../constants/api';



const OrderDetails = ({ navigation, route }) => {
    const mapRef = useRef()
    const { showPopUp, popUpColor, PopUpMesage } = useSelector(store => store.store)
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [selected, setSelected] = useState(0);
    const { rider_id } = useSelector(store => store.auth)
    let { isOrderUpdate } = useSelector(store => store.order);
    const [orderStatus, setOrderStatus] = useState()
    const [accepted, setAccepted] = useState()
    const dispatch = useDispatch()

    // Dummy locations for map markers and polyline
    const pickupLocation = {
        latitude: orderDetails?.restaurantData?.latitude, // Replace with destination latitude
        longitude: orderDetails?.restaurantData?.longitude, // Replace with origin longitude
    };
    const dropoffLocation = {
        latitude: orderDetails?.locationData?.latitude, // Replace with destination latitude
        longitude: orderDetails?.locationData?.longitude, // Replace with destination longitude
    };

    const getDetail = id => {
        setLoading(true);
        fetch(api.get_order_by_id + id)
            .then(response => response.json())
            .then(response => {

                console.log('Order iD  +++++++++++ ', id, { response });
                if (response.error == false) {


                    setOrderDetails(response.result);
                    // if (response?.result?.order_status == 'out_for_delivery') {
                    //     setSelected(0);
                    // } else if (response?.result?.order_status == 'delievered') {
                    //     setSelected(1);
                    // } else {
                    //     setSelected(0);
                    // }



                } else {
                    setOrderDetails(route?.params?.item);
                }
            })
            .catch(err => console.log('error : ', err))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        setOrderDetails(route?.params?.item)
        // setOrderStatus(route?.params?.item?.order_status)
        // setAccepted(route.params?.item?.accepted_by_rider)
        getDetail(route?.params?.item?.order_id);

    }, [isOrderUpdate])


    useEffect(() => {
        if (orderDetails) {
            if (mapRef.current) {
                mapRef.current.fitToCoordinates([pickupLocation, dropoffLocation], {
                    edgePadding: { top: 200, right: 100, bottom: 200, left: 100 }, // Adjust padding as needed
                    animated: true,
                });
            }
        }

    }, [pickupLocation, dropoffLocation]);


    const updateOrderDeliveryStatus = async (status, order_id, rider_id, dispatch, isOrderUpdate) => {
        let data = {
            order_id: order_id,
            order_status: status, //out_for_delivery, delivered
            rider_id: rider_id
        }
        console.log({ data, });
        console.log({ isOrderUpdate });
        fetch(api.updateOrderStatusByRider, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(async response => {
                console.log('response  :  ', response);
                if (response?.error == true) {
                    dispatch(setShowPopUp(true))
                    dispatch(setPopUpColor('red'))
                    dispatch(setPopUpMesage('Something is went wrong, While updating orders'))

                    setTimeout(() => {
                        dispatch(setShowPopUp(false))
                        dispatch(setPopUpColor(''))
                        dispatch(setPopUpMesage(''))
                    }, 1000);
                } else {
                    dispatch(setIsOrderUpdate(!isOrderUpdate))
                    setAccepted(response?.result?.accepted_by_rider)
                    setOrderStatus(response?.result?.order_status)
                    if (status === 'delivered') {
                        dispatch(setShowPopUp(true))
                        dispatch(setPopUpColor(Colors.Orange))
                        dispatch(setPopUpMesage('Order Delivered'));

                        setTimeout(() => {
                            dispatch(setShowPopUp(false))
                            dispatch(setPopUpColor(''))
                            navigation.goBack()
                            dispatch(setPopUpMesage(''))
                        })
                    } else if (status === 'out_for_delivery') {
                        dispatch(setShowPopUp(true))
                        dispatch(setPopUpColor(Colors.Orange))
                        dispatch(setPopUpMesage('Order is on the way'));

                        setTimeout(() => {
                            dispatch(setShowPopUp(false))
                            dispatch(setPopUpColor(''))

                            dispatch(setPopUpMesage(''))
                        })
                    }
                }
            })
            .catch(err => {
                console.log('Error in accept/reject order :  ', err);
                showAlert('Something went wrong');
            })
            .finally(() => {

            });
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
    //                 //     dispatch(setPopUpColor(Colors.Orange))
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
                        color={Colors.White}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order# {orderDetails?.order_id}</Text>
                <TouchableOpacity style={styles.chatButton}>
                    {/* Placeholder for chat icon */}
                    <Text style={styles.chatButtonText}>💬</Text>
                </TouchableOpacity>
            </View>

            {/* Map Section */}



            {/* Order Information Section */}
            <ScrollView contentContainerStyle={styles.detailsContainer} refreshControl={<RefreshControl refreshing={loading} colors={[Colors.Orange]} onRefresh={() => {
                getDetail(route?.params?.item?.order_id)
            }} />} >
                {
                    orderDetails &&
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('OrderMapScreen', {
                        item: orderDetails
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
                                strokeColor={Colors.Orange}
                            />
                        </MapView>
                    </TouchableOpacity>

                }
                <View style={{ padding: wp(4) }} >


                    <Text style={styles.orderId}>Order# {orderDetails?.order_id}</Text>
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
                                    {orderDetails?.restaurantData?.user_name}
                                </Text>
                                <Text style={styles.locationText}>
                                    {orderDetails?.restaurantData?.location}
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
                                    {orderDetails?.customerData?.user_name}
                                </Text>


                                <Text style={styles.locationText}>
                                    {orderDetails?.locationData?.address}
                                </Text>

                            </View>

                        </View>
                    </View>

                    {/* Estimated Commission */}
                    <Text style={styles.estimatedCommissionTitle}>Estimated Commission</Text>
                    <Text style={styles.commissionAmount}>£{orderDetails?.delivery_charges}</Text>

                    {/* Special Instructions */}
                    <Text style={styles.estimatedCommissionTitle}>Special Instructions</Text>
                    <Text style={styles.commissionAmount}>
                        {orderDetails?.description}
                    </Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.btncontainer}>

                {/* {
                     orderStatus === 'placed' && accepted === false ? <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handelAcceptRejectOrder('accept', orderDetails.order_id, rider_id, dispatch, isOrderUpdate)} style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectButton} onPress={() => handelAcceptRejectOrder('reject', orderDetails.order_id, rider_id, dispatch)} >
                            <Text style={styles.rejectButtonText}>Reject</Text>
                        </TouchableOpacity>
                    </View> :  null
                } */}


                {
                    orderDetails?.accepted_by_rider ?
                        <View style={styles.buttonContainer} >
                            <TouchableOpacity onPress={() => orderDetails?.order_status === 'placed' ? updateOrderDeliveryStatus('out_for_delivery', orderDetails.order_id, rider_id, dispatch, isOrderUpdate) : updateOrderDeliveryStatus('delivered', orderDetails.order_id, rider_id, dispatch, isOrderUpdate)} style={[styles.acceptButton]}>
                                <Text style={styles.buttonText}>{orderDetails?.order_status === 'placed' ? "Out For Delivery" : 'Delivered'}</Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={styles.buttonContainer}  >

                            <TouchableOpacity onPress={() => handelAcceptRejectOrder('accept', orderDetails.order_id, rider_id, dispatch, isOrderUpdate)} style={styles.acceptButton}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelAcceptRejectOrder('reject', orderDetails.order_id, rider_id, dispatch)} style={styles.rejectButton}>
                                <Text style={styles.rejectButtonText}>Reject (00:60)</Text>
                            </TouchableOpacity>
                        </View>
                }








                {/* 
                {
                    orderStatus === 'placed'&& accepted === true ?
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() =>  updateOrderDeliveryStatus('out_for_delivery', orderDetails.order_id, rider_id, dispatch, isOrderUpdate) }  style={[styles.acceptButton, {}]}>
                        <Text style={styles.buttonText}>{"Out For Delivery"}</Text>
                    </TouchableOpacity>
                </View>:  orderStatus === 'out_for_delivery' ?
                     <View style={styles.buttonContainer}>
                     <TouchableOpacity onPress={() => updateOrderDeliveryStatus('delivered', item.order_id, rider_id, dispatch, isOrderUpdate)}  style={[styles.acceptButton]}>
                         <Text style={styles.buttonText}>{'Delivered'}</Text>
                     </TouchableOpacity>
                 </View> : ''
                } */}







            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: Colors.Orange,
    },
    backButton: {
        marginRight: wp(2),
    },
    backButtonText: {
        color: '#FFF',
        fontSize: wp(5),
    },
    headerTitle: {
        color: Colors.White,
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
        color: Colors.Black
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
        backgroundColor: Colors.Orange,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(2),
    },
    iconText: {
        color: '#FFF',
        fontSize: wp(3.5),
    },
    sectionTitle: {
        fontSize: wp(4),
        fontWeight: '700',
        flex: 1,
    },
    distance: {
        fontSize: wp(3.5),
        color: '#333',
    },
    subtitle: {
        fontSize: wp(4),
        fontWeight: '600',
        color: '#555',
    },
    address: {
        fontSize: wp(3.5),
        color: '#666',
        marginTop: hp(0.5),
    },
    estimatedCommissionTitle: {
        fontSize: wp(4.5),
        fontFamily: Fonts.PlusJakartaSans_Bold,
        color: Colors.Black
    },
    commissionAmount: {
        fontSize: wp(4.5),
        fontFamily: Fonts.PlusJakartaSans_Medium,
        color: Colors.grayText,
        marginVertical: hp(0.5),
    },
    btncontainer: {
        backgroundColor: '#FFFFFF', // Background color of the container
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
        backgroundColor: Colors.Orange,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(25),
        borderRadius: wp(5),
        marginBottom: hp(1),
    },
    rejectButton: {
        borderColor: Colors.Orange,
        borderWidth: 2,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(25),
        borderRadius: wp(5),
    },
    buttonText: {
        color: Colors.White,
        fontSize: wp(4),
        fontFamily: Fonts.PlusJakartaSans_SemiBold,
        textAlign: 'center',
        width: '100%',
        // backgroundColor: 'green'
    },
    rejectButtonText: {
        color: Colors.Orange,
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
        borderColor: Colors.Orange,
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
        color: '#f57c00',
        marginRight: wp(2),
    },
    locationText: {
        // fontSize: wp(3.5),
        color: Colors.grayText,
        flex: 1,
        // fontFamily: Fonts.PlusJakartaSans_Regular,
        marginLeft: wp(2),
        fontFamily: Fonts.PlusJakartaSans_Medium, fontSize: wp(4)
    },
});

export default OrderDetails;
