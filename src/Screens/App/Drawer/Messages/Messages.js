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
  import { Colors, Fonts } from '../../../../constants';
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
    
    const { rider_id, rider_details, contacts  } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    // const rider_id = 'rider_1681273'
    const navigation = useNavigation()

    function getRoomIdByRestaurantId(restaurantId) {
      for (const item of contacts) {
          if (item?.restaurant_id === restaurantId) {
              return item?.room_id; // Return the room_id if the restaurant_id matches
          }
      }

      // console.log(restaurantId);
      
      return null; // Return null if no match is found
    }
    
    const RestaruantContact = { "customer_id": null, "receiver_id": rider_details.rest_id, "receiver_type": "restaurant", "restaurant_id": rider_details.rest_id, "rider_id": rider_id, "room_id": getRoomIdByRestaurantId(rider_details.rest_id), "sender_id": rider_id, "sender_type": "rider", "restaurant_name": 'Grill Out' }
// console.log(rider_details);

  
  
  const socketUrl = 'https://food-delivery-be.caprover-demo.mtechub.com/';
  // const rest_ID = "res_4074614";
  // const customer_id = 202028; 
  // const rider_id = "rider_1673186"; 
  
  
  // const socketUrl = 'http://192.168.18.120:3017/';
  const rest_ID = "res_4074614";
  const customer_id = 202028; 
//   const rider_id = "rider_1673186"; 
  
  
    const [socket, setSocket] = useState(null);
      // const [message, setMessage] = useState(`Hey testing message from cutomer  (${customer_id}) to restaurent from app`);
      const [messages, setMessages] = useState([]);
      const [roomId, setRoomId] = useState(null);
     
  
      
  
      // useEffect(() => {
      //     const newSocket = io(socketUrl);
      //     setSocket(newSocket); 
  
      //     // Fetch contacts on socket connection
      //     newSocket.on('connect', () => {
      //         newSocket.emit('getContacts', { customer_id });  // Emit event to fetch contacts
      //     });
  
      //     // Listen for contacts data
      //     newSocket.on('contacts', (contactsData) => {
      //         // console.log("contactsData", contactsData)
      //         setContacts(contactsData);  // Set contacts with the last message
      //     });
  
      //     // Listen for room join confirmation
      //     newSocket.on('roomJoined', ({ roomId }) => {
      //         setRoomId(roomId);
      //         console.log(`Joined room: ${roomId}`);
      //     });
  
      //     // Listen for previous messages
      //     newSocket.on('previousMessages', ({ messages }) => {
      //         setMessages(messages);
      //         console.log('Previous messages loaded:', messages);
      //     });
  
      //     newSocket.emit('joinRoom', customer_id);
      //     newSocket.on('roomJoined', ({ roomId }) => {
      //         setRoomId(roomId);
      //         console.log(`Joined room: ${roomId}`);
      //     });
  
  
      //     // if (rest_ID || customer_id) {
      //     //     const initialContact = {
      //     //         customer_id,
      //     //         // rider_id,
      //     //         rest_ID
      //     //     };
  
      //     //     // Automatically join the room or create a new room based on available IDs
      //     //     newSocket.emit('joinRoom', initialContact);
      //     //     newSocket.on('roomJoined', ({ roomId }) => {
      //     //         setRoomId(roomId);
      //     //         console.log(`Joined room: ${roomId}`);
      //     //     });
  
      //     //     // Fetch previous messages for the room if available
      //     //     newSocket.on('previousMessages', ({ messages }) => {
      //     //         setMessages(messages);
      //     //         console.log('Previous messages loaded:', messages);
      //     //     });
      //     // }
  
      //     // Listen for new messages
         
      //     newSocket.on('newMessage', ({ sender_type, senderId, message }) => {
  
      //         console.log(sender_type, senderId, message);
  
      //         setMessages((prevMessages) => [
      //             ...prevMessages,
      //             { sender_type, senderId, message },
      //         ]);
  
      //         // Update the contacts list by moving the contact to the top
      //         setContacts((prevContacts) => {
      //             // Find the contact that received the new message
      //             const updatedContacts = prevContacts.map(contact => {
      //                 if (contact.customer_id === senderId) {
      //                     return {
      //                         ...contact,
      //                         message: message,
      //                         last_message_time: new Date().toISOString() // Update the last message time
      //                     };
      //                 }
      //                 return contact;
      //             });
      //             // Sort contacts to bring the one with the latest message to the top
      //             return updatedContacts.sort((a, b) => new Date(b.last_message_time) - new Date(a.last_message_time));
      //         });
      //     });
  
      //     // Handle errors
      //     newSocket.on('error', (error) => {
      //         console.error('Socket Error:', error.message);
      //     });
  
      //     // Cleanup on component unmount
      //     return () => {
      //         newSocket.disconnect();
      //     };
      // }, []);
  
  
  
  
  
      useEffect(() => {
        const newSocket = io(BASE_URL);
        // setSocket(newSocket);
  
        // Fetch contacts on socket connection
        newSocket.on('connect', () => {
            newSocket.emit('getContacts', { rider_id }); 
        });
  
        // Listen for contacts data
        newSocket.on('contacts', (contactsData) => {
            dispatch( setContacts(contactsData))  

            
        });
  
        // Listen for room join confirmation
        // newSocket.on('roomJoined', ({ roomId }) => {
        //     setRoomId(roomId);
        //     console.log(`Joined room: ${roomId}`);
        // });
  
        // Listen for previous messages
        // newSocket.on('previousMessages', ({ messages }) => {
        //     setMessages(messages);
        //     console.log('Previous messages loaded:', messages);
        // });
  
        // newSocket.emit('joinRoom', customer_id);
        // newSocket.on('roomJoined', ({ roomId }) => {
        //     setRoomId(roomId);
        //     console.log(`Joined room: ${roomId}`);
        // });
  
  
        // if (rest_ID || customer_id) {
        //     const initialContact = {
        //         customer_id,
        //         // rider_id,
        //         rest_ID
        //     };
  
        //     // Automatically join the room or create a new room based on available IDs
        //     newSocket.emit('joinRoom', initialContact);
        //     newSocket.on('roomJoined', ({ roomId }) => {
        //         setRoomId(roomId);
        //         console.log(`Joined room: ${roomId}`);
        //     });
  
        //     // Fetch previous messages for the room if available
        //     newSocket.on('previousMessages', ({ messages }) => {
        //         setMessages(messages);
        //         console.log('Previous messages loaded:', messages);
        //     });
        // }
  
        // Listen for new messages
        
        // newSocket.on('newMessage', ({ sender_type, senderId, message }) => {
  
        //     console.log(sender_type, senderId, message);
  
        //     setMessages((prevMessages) => [
        //         ...prevMessages,
        //         { sender_type, senderId, message },
        //     ]);
  
        //     // Update the contacts list by moving the contact to the top
        //     setContacts((prevContacts) => {
        //         // Find the contact that received the new message
        //         const updatedContacts = prevContacts.map(contact => {
        //             if (contact.customer_id === senderId) {
        //                 return {
        //                     ...contact,
        //                     message: message,
        //                     last_message_time: new Date().toISOString() // Update the last message time
        //                 };
        //             }
        //             return contact;
        //         });
        //         // Sort contacts to bring the one with the latest message to the top
        //         return updatedContacts.sort((a, b) => new Date(b.last_message_time) - new Date(a.last_message_time));
        //     });
        // });
  
        // Handle errors
        
        
        newSocket.on('error', (error) => {
            console.error('Socket Error:', error.message);
        });
  
        // Cleanup on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);
      
      // const sendMessage = () => {
  
      //     console.log(roomId, rider_id);
          
  
      //     if (message.trim() && roomId) {
      //         // socket.emit('sendMessage', {
      //         //     roomId,
      //         //     sender_type: 'customer',
      //         //     senderId: customer_id,
      //         //     message,
      //         // });
  
      //         socket.emit('sendMessage', {
      //             roomId, sender_type: "customer", senderId: customer_id, receiver_type: "restaurant",
      //             receiverId: rest_ID, message
      //         });
  
      //         setMessage('');  // Clear message input after sending
  
      //         // Update contacts after sending a message
      //         setContacts((prevContacts) => {
      //             const updatedContacts = prevContacts.map(contact => {
      //                 if (contact.room_id === roomId) {
      //                     return {
      //                         ...contact,
      //                         message: message,
      //                         last_message_time: new Date().toISOString() // Update the last message time
      //                     };
      //                 }
      //                 return contact;
      //             });
      //             // Sort contacts to bring the one with the latest message to the top
      //             return updatedContacts.sort((a, b) => new Date(b.last_message_time) - new Date(a.last_message_time));
      //         });
      //     }
      // };
  
      // Handle selecting a contact
    
     
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
            console.log({item});
            
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
  
  
        {/* <Button title='send' onPress={()=> handleSelectContact(contac)} /> */}
  
      </View>
    );
  };
  
  export default Messages;
  
  const styles = StyleSheet.create({
    card: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20},
    // iconContainer: {
    //   height: 50,
    //   width: 50,
    //   borderRadius: 50 / 2,
    //   backgroundColor: '#FF572233',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
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
      // elevation: 7,
      justifyContent: 'space-between',
    },
    // title: {
    //   fontFamily: Fonts.Inter_SemiBold,
    //   color: Colors.primary_text,
    //   fontSize: RFPercentage(2),
    //   lineHeight: 30,
    // },
    timeText: {
      fontFamily: Fonts.Inter_Medium,
      color: Colors.secondary_text,
      fontSize: RFPercentage(1.5),
    },
    // description: {
    //   fontFamily: Fonts.Inter_Regular,
    //   color: '#595959',
    //   fontSize: RFPercentage(1.5),
    //   flex: 0.9,
    // },
    restaurant_name:{
      color: Colors.secondary_text,
      fontFamily: Fonts.PlusJakartaSans_SemiBold,
      fontSize: RFPercentage(2.8),
      textAlign: 'center',
      textAlignVertical: 'center'
      
    }
  });
  