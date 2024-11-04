import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants'
import HistoryOrderCard from '../../../../components/Cards/HistoryOrderCard'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';


const History = () => {

    let { assigned_orders } = useSelector(store => store.order);

    const filteredItems = assigned_orders.filter(item => item.order_status === "cancelled" || item.order_status === "delivered")


    return (
        <View style={styles.container} >
            <FlatList contentContainerStyle={{paddingVertical: hp(2)}} data={filteredItems} renderItem={({item})=> {
            return (
                <HistoryOrderCard item={item} />
            )
        }} /> 
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,


    }
})