import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { googleMapKey } from '../../utils/globalVariables';
import { Colors, Fonts } from '../../constants';
import StartLocation from '../../Assets/svg/StartLocation.svg';
import MapPinActive from '../../Assets/svg/Location.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOrderUpdate, setUpdatedOrder } from '../../redux/OrderSlice';
import { handelAcceptRejectOrder, updateOrderDeliveryStatus } from '../../utils/helpers/orderApis';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ item, status, refe, setBtmSheetValues, alert_RBSheet }) => {
    const { rider_id } = useSelector(store => store.auth)
    let { isOrderUpdate } = useSelector(store => store.order);
    const navigation = useNavigation()

    // console.log(item.order_id, item.order_status, item.payment_option);
    // const Colors = ''


    const [timer, setTimer] = useState(60); // 1-minute timer
    const timerRef = useRef(null);


    const dispatch = useDispatch()

   {!status &&
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current); // Stop the timer
                    console.log("time end"); // Log when the timer ends
                    return 0; // Ensure the timer stops at 0
                }
                return prev - 1; // Decrement the timer
            });
        }, 1000);

        return () => clearInterval(timerRef.current); // Cleanup on component unmount
    }, []);

   } 

    const mapRef = useRef(null);

    const origin = {
        latitude: item?.restaurantData?.latitude, // Replace with destination latitude
        longitude: item?.restaurantData?.longitude, // Replace with origin longitude
    };

    const destination = {
        latitude: item?.locationData?.latitude, // Replace with destination latitude
        longitude: item?.locationData?.longitude, // Replace with destination longitude
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates([origin, destination], {
                edgePadding: { top: 200, right: 100, bottom: 200, left: 100 }, // Adjust padding as needed
                animated: true,
            });
        }
    }, [origin, destination]);

    const openBtmSheet = (obj) => {
        console.log(obj.status);
        
        if (item.order_status === 'out_for_delivery' || item.order_status === 'delivered' || item.order_status === 'ready_to_deliver' || obj.status === 'accept' || obj.status === "reject" ) {
            refe?.current?.open();
            setBtmSheetValues(obj);
        }
        else{
            alert_RBSheet?.current?.open()
        }
    };

    const onpress = () => {
        navigation.navigate('OrdersDetail', {
            item: item,
            id: item.order_id
        })
        dispatch(setUpdatedOrder(item))
    }
    const statusStyles = {
        preparing_food: { color: '#5E3A09', backgroundColor: '#FFD7B0' },
        placed: { color: '#5E3A09', backgroundColor: '#FFD7B0' },
        out_for_delivery: { color: '#09275E', backgroundColor: '#B9D7FF' },
        delivered: { color: '#384308', backgroundColor: '#F2FFB9' },
        ready_to_deliver :  { color: '#09275E', backgroundColor: '#B9D7FF' },

    };

    const statusText = {
        placed: 'Preparing',
        preparing_food: 'Preparing',
        ready_to_deliver: 'Ready To Deliver',
        out_for_delivery: 'Out For Delivery',
        delivered: 'Delivered',
    };
    const handlePress = () => {
        if (item?.order_status === 'placed' || 
            item?.order_status === 'preparing_food' || 
            item?.order_status === 'ready_to_deliver') {
            openBtmSheet({
                title: 'Out For Delivery',
                btnText: 'Out For Delivery',
                order_Id: item.order_id,
                status: 'out_for_delivery',
            });
        } else {
            openBtmSheet({
                title: 'Delivered',
                btnText: 'Delivered',
                order_Id: item.order_id,
                status: 'delivered',
                amount: item.total_amount,
                restaurantId: item.restaurant_id,
                amountToTransfer: item.gst + item.sub_total,
                commission: item.delivery_charges,
                payment_option: item.payment_option,
            });
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onpress} >
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>Order# {item?.order_id}</Text>
                {
                    status ? (
                        <Text
                            style={[
                                styles.statusTxt,
                                statusStyles[item?.order_status] || {}, // Use the corresponding styles or default to an empty object
                            ]}
                        >
                            {statusText[item?.order_status] || item?.order_status} {/* Use mapped text or fallback to the raw status */}
                        </Text>
                    ) : (
                        <Text style={styles.price}>£{item?.total_amount}</Text>
                    )
                }
            </View>

           

            {/* Map View */}
          {origin && destination?  <MapView
                scrollEnabled={false}  // Disable scrolling (panning)
                zoomEnabled={false}    // Disable zooming
                rotateEnabled={false}  // Disable rotating
                pitchEnabled={false}   // Disable pitch adjustments
                ref={mapRef}
                style={styles.mapView}
                initialRegion={{
                    latitude: (origin.latitude + destination.latitude) / 2,
                    longitude: (origin.longitude + destination.longitude) / 2,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
                focusable={true}
            >
                <Marker coordinate={origin} title="Pickup Location" />
                <Marker coordinate={destination} title="Drop-off Location" />

                {/* Draw Route */}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={googleMapKey}
                    strokeWidth={3}
                    strokeColor={Colors.primary_color}
                />
            </MapView>: null}

            {/* Location Details */}
            <View style={styles.locationContainer}>
                <View style={styles.locationRow}>
                    <StartLocation height={hp(3)} width={wp(6)} />
                    <Text style={styles.locationText}>
                        {item?.restaurantData?.location}
                    </Text>
                </View>
                <View style={styles.verticalDottedLine} />
                <View style={styles.locationRow}>
                    <MapPinActive height={hp(3)} width={wp(6)} />
                    <Text style={styles.locationText}>
                        {item?.locationData?.address}
                    </Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                {
                    status ? <TouchableOpacity onPress={() => item?.order_status === 'placed' ||item?.order_status === 'preparing_food' || item?.order_status === 'ready_to_deliver'  ? openBtmSheet({
                        title: 'Out For Delivery',
                        btnText: 'Out For Delivery',
                        order_Id: item.order_id,
                        status: 'out_for_delivery'
                    }) : openBtmSheet({
                        title: 'Delivered',
                        btnText: 'Delivered',
                        order_Id: item.order_id,
                        status: 'delivered',
                        amount: item.total_amount,
                        restaurantId: item.restaurant_id,
                        amountToTransfer: item.gst + item.sub_total,
                        commission: item.delivery_charges,
                        payment_option: item.payment_option
                    })} style={[styles.acceptButton, { flex: 1 }]}>
                        <Text style={styles.buttonText}>{item?.order_status === 'placed' ||item?.order_status === 'preparing_food' || item?.order_status === 'ready_to_deliver' ? "Out For Delivery" : 'Delivered'}</Text>
                    </TouchableOpacity> : <>
                        <TouchableOpacity onPress={() => openBtmSheet({
                            title: 'Are you sure to Reject this order?',
                            btnText: 'Reject',
                            order_Id: item.order_id,
                            status: 'reject'
                        })} style={styles.rejectButton}>
                            <Text style={styles.rejectButtonText}>Reject {Math.floor(timer / 60)}:{`0${timer % 60}`.slice(-2)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openBtmSheet({
                            title: 'Are you sure to Accept this order?',
                            btnText: 'Accept',
                            order_Id: item.order_id,
                            status: 'accept'
                        })} style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                    </>
                }

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondary_color,
        borderRadius: 8,
        padding: wp(3),
        marginVertical: hp(1),
        marginHorizontal: wp(3),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
    },
    orderId: {
        fontSize: wp(4),
        fontFamily: Fonts.PlusJakartaSans_Bold,
        color: Colors.primary_text
    },
    price: {
        fontSize: wp(4),
        color: Colors.secondary_text,
        fontFamily: Fonts.PlusJakartaSans_Bold
    },
    statusTxt: {
        color:Colors.primary_colorLight,
        fontFamily: Fonts.PlusJakartaSans_Medium,
        fontSize: RFPercentage(1.7),
        marginBottom: wp(1),
        paddingHorizontal: wp(3),
        borderRadius: wp(6)

    },
    mapView: {
        width: '100%',
        height: hp(15),
        borderRadius: 8,
        marginBottom: hp(1),
    },
    locationContainer: {
        marginVertical: hp(1),
    },
    verticalDottedLine: {
        // height: 45,
        minHeight: 30,
        flex: 1,
        borderWidth: 0.8,
        borderColor: Colors.primary_color,
        borderStyle: 'dashed',
        width: 0.5,
        // marginLeft: 19,
        marginLeft: 8,
        position: 'absolute',
        left: 2,
        top: 22,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
   
    locationText: {
        fontSize: wp(3.5),
        color: Colors.secondary_text,
        flex: 1,
        fontFamily: Fonts.PlusJakartaSans_Regular,
        marginLeft: wp(2)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(1),
        // backgroundColor: 'green'
    },
    rejectButton: {
        backgroundColor: Colors.button.secondary_button,
        borderRadius: wp(10),
        // paddingVertical: hp(1.2),
        // paddingHorizontal: wp(5),
        borderWidth: 1,
        borderColor: Colors.button.secondary_button_text,
        // flex: 0.5,
        alignItems: 'center',
        width: '45%',
        height: 40,
        justifyContent: 'center'
    },
    acceptButton: {
        backgroundColor: Colors.button.primary_button,
        borderRadius: wp(10),
        // paddingVertical: hp(1.2), 
        // paddingHorizontal: wp(5),
        // flex: 0.5,
        alignItems: 'center',
        width: '45%',
        height: 40,
        justifyContent: 'center'


    },
    buttonText: {
        color: Colors.button.primary_button_text,
        fontSize: wp(3.5),
        fontFamily: Fonts.PlusJakartaSans_Regular,
        textAlign: 'center'

    },
    rejectButtonText: {
        color: Colors.button.secondary_button_text,
        fontSize: wp(3.5),
        fontFamily: Fonts.PlusJakartaSans_Regular,
        textAlign: 'center',
    },
    timerText: {
        fontSize: wp(4),
        color: Colors.secondary_text,
        textAlign: 'center',
        marginVertical: hp(1),
        fontFamily: Fonts.PlusJakartaSans_Bold,
    },
});

export default OrderCard;
