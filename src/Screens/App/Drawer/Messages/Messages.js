import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Button,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import { Fonts } from '../../../../constants';
  import {Avatar, Badge} from 'react-native-paper';
  import {RFPercentage} from 'react-native-responsive-fontsize';
  import StackHeader from '../../../../components/Header/StackHeader';
  import ItemSeparator from '../../../../components/Separator/ItemSeparator';
  import ChatCard from '../../../../components/Cards/ChatCard';
  import { io } from 'socket.io-client';
  import { constants } from 'buffer';
  import moment from 'moment';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigation } from '@react-navigation/native';
  import { BASE_URL } from '../../../../utils/globalVariables';
  import Restaurent from '../../../../Assets/svg/restaurent.svg';
  import ChatActive from '../../../../Assets/svg/chatActive.svg';
  import Svgs from '../../../../Assets/svg/Svgs';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { setContacts } from '../../../../redux/AuthSlice';
  const Messages = () => {
    
    const { rider_id, rider_details, contacts, Colors,   } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    function getRoomIdByRestaurantId(restaurantId) {
      for (const item of contacts) {
          if (item?.restaurant_id === restaurantId) {
              return item?.room_id; // Return the room_id if the restaurant_id matches
          }
      }
      return null; // Return null if no match is found
    }

    function getOrderIdByRestaurantId(restaurantId) {
      for (const item of contacts) {
          if (item?.restaurant_id === restaurantId) {
              return item?.order_id; // Return the room_id if the restaurant_id matches
          }
      }
      return null; 
    }
    
    const RestaruantContact = { "customer_id": null, "receiver_id": rider_details.rest_id, "receiver_type": "restaurant", "restaurant_id": rider_details.rest_id, "rider_id": rider_id, "room_id": getRoomIdByRestaurantId(rider_details.rest_id), "sender_id": rider_id, "sender_type": "rider", "restaurant_name": 'Grill Out', 'order_id': getOrderIdByRestaurantId(rider_details.rest_id) }
  
      useEffect(() => {
        const newSocket = io(BASE_URL);
        newSocket.on('connect', () => {
            newSocket.emit('getContacts', { rider_id }); 
        });
        newSocket.on('contacts', (contactsData) => {
          console.log(contactsData, 'contacts');
          
            dispatch( setContacts(contactsData))  
        });
        newSocket.on('error', (error) => {
            console.error('Socket Error:', error.message);
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);
      const handleSelectContact = async (contact) => {
          navigation.navigate('Conversation', {
            contact: contact,
            name: contact?.restaurant_name || contact?.customer_name
          })
      };
  const formatDate = (inputDate) => {
    const now = moment(); 
    const date = moment(inputDate); 
    if (date.isSame(now, 'day')) {
      return date.format("HH:mm");
    } else if (date.isSame(now.subtract(1, 'days'), 'day')) {
      return "Yesterday";
    } else {
      return date.format("DD/MM/YY");
    }
  };

    
  const styles = StyleSheet.create({
    card: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20},
    rowViewSB: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(6.5),
      paddingVertical: hp(2),
      justifyContent: 'space-between',
    },
    timeText: {
      fontFamily: Fonts.Inter_Medium,
      color: Colors.secondary_text,
      fontSize: RFPercentage(1.5),
    },
    restaurant_name:{
      color: Colors.secondary_text,
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      fontSize: RFPercentage(2.8),
      textAlign: 'center',
      textAlignVertical: 'center'
      
    }
  });
  
    return (
      <View style={{flex: 1, backgroundColor: Colors.secondary_color}}>
        <StackHeader title={'My Chats'} />
        <View style={{paddingHorizontal: wp(0), backgroundColor: `${Colors.primary_color}50`}} >

      
      <TouchableOpacity style={styles.rowView} onPress={()=> handleSelectContact(RestaruantContact)} >
        <Restaurent width={wp(12)} />
        <Text style={styles.restaurant_name} >Grill Out</Text>
        <ChatActive width={wp(12)} height={hp(5)} />
      </TouchableOpacity>
      </View>
        <FlatList
          data={contacts}
          ListHeaderComponent={() => <View style={{height: 20}} />}
          ItemSeparatorComponent={() => <ItemSeparator />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          renderItem={({item, index}) => {
            // console.log({item}); 
            
            return(
            <ChatCard
              profile={false}
              user_name={item?.restaurant_name || item?.customer_name}
              created_at={formatDate(item?.created_at)}
              message={item?.message}
              unread_count={item?.unread_count}
              onpress={()=> handleSelectContact(item)}
            />
          )}}
        />
      </View>
    );
  };
  
  export default Messages;
