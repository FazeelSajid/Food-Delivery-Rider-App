import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  Fonts } from '../../../../constants'
import HistoryOrderCard from '../../../../components/Cards/HistoryOrderCard'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import NoOrderHistory from '../../../../Assets/svg/NoOrderHistory.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';


const History = () => {

    let { assigned_orders } = useSelector(store => store.order);
        const { Colors} = useSelector(store => store.auth);

    const filteredItems = assigned_orders.filter(item => item.order_status === "cancelled" || item.order_status === "delivered")
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.secondary_color,
        },
        ListEmptyComponent:{
            flex:1, 
            alignSelf:'center',
            paddingTop: hp(8)
         },
         ListEmptyComponentText: {
           fontSize: RFPercentage(2.5),
           color: Colors.primary_text,
           fontFamily: Fonts.PlusJakartaSans_SemiBold,
           paddingTop: hp(3),
           textAlign :'center'
         }
    })
    return (
        <View style={styles.container} >
            <FlatList contentContainerStyle={{ paddingVertical: hp(2) }}
                data={filteredItems}
                ListEmptyComponent={
                    <View style={styles.ListEmptyComponent} >
                        <NoOrderHistory />
                        <Text style={styles.ListEmptyComponentText} >Empty! no order history</Text>
                    </View>
                }
                renderItem={({ item }) => {
                    return (
                        <HistoryOrderCard item={item} />
                    )
                }} />
        </View>
    )
}

export default History

