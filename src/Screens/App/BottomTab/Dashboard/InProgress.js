import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {Fonts } from '../../../../constants'
import OrderCard from '../../../../components/Cards/OrderCard'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getAssignedOrders, updateOrderDeliveryStatus } from '../../../../utils/helpers/orderApis';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';
import RBSheetConfirmation from '../../../../components/BottomSheet/RBSheetConfirmation';
import { useNavigation } from '@react-navigation/native';
import NoOrderReq from '../../../../Assets/svg/NoOrderReq.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Alert from '../../../../Assets/svg/alert.svg';
const InProgress = () => {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const {rider_id, Colors} = useSelector(store => store.auth)
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

    const filteredItems = assigned_orders.filter(order => order.order_status !== 'cancelled' && order.order_status !== 'delivered');

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
                    // console.log(item.order_id)
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

