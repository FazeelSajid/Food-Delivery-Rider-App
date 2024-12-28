import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ChatHeader from '../../../../components/Header/ChatHeader';
import Loader from '../../../../components/Loader';
import { io } from 'socket.io-client';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import CameraBottomSheet from '../../../../components/BottomSheet/CameraBottomSheet';
import { BASE_URL } from '../../../../utils/globalVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Conversation = ({ navigation, route }) => {
  // const [loading, setLoading] = useState(false);
  const contact = route?.params?.contact;
  const { rider_id,Colors } = useSelector(store => store.auth)
  const cameraBtmSheetRef = useRef()
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);

  // const ref = useRef('');

  // useEffect(() => {
  //   const newSocket = io(socketUrl);
  //   setSocket(newSocket);

  //   // Join room and fetch previous messages
  //   newSocket.emit('joinRoom', {
  //     room_id: contact.room_id,
  //     rest_ID: contact.restaurant_id || '',
  //     customer_id: contact.customer_id,
  //     rider_id: rider_id || '',
  //   });

  //   // newSocket.emit('joinRoom', customer_id);
  //   // newSocket.on('roomJoined', ({ roomId }) => {
  //   //     setRoomId(roomId);
  //   //     console.log(`Joined room: ${roomId}`);
  //   // });

  //   // setRoomId(contact.room_id);

  //   newSocket.on('previousMessages', ({ messages }) => {
  //     const formattedMessages = messages.map((msg, index) => ({
  //       ...msg,
  //       createdAt: new Date(msg.created_at),
  //     }));
  //     setMessages(formattedMessages.reverse());
  //   });

  //   newSocket.on('newMessage', (message) => {
  //     setMessages((prevMessages) => [message, ...prevMessages]);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);
  const room_id = contact.room_id; // Use the room ID from the contact details
  // console.log({room_id});
  
  useEffect(() => {

    
    const newSocket = io(BASE_URL);
    setSocket(newSocket);
    newSocket.on('connect', () => {
      // if (contact.customer_id) {
      //   newSocket.emit('joinRoom', {
      //     room_id,
      //     rest_ID: null,
      //     customer_id:  contact.customer_id, // Example customer ID
      //     rider_id: rider_id,
      //   });
      //   newSocket.on('roomJoined', ({ roomId }) => {
      //     console.log(`Joined room: ${roomId}`);
      //     setRoomId(roomId);
      //   });
    
      // } else if (contact.restaurant_id) {
      //   newSocket.emit('joinRoom', {
      //     room_id,
      //     rest_ID: contact.restaurant_id,
      //     rider_id: rider_id
      //   });
      //   newSocket.on('roomJoined', ({ roomId }) => {
      //     console.log(`Joined room: ${roomId}`);
      //     setRoomId(roomId);
      //   });
    
      // } else {
      //   newSocket.emit('joinRoom', rider_id);
      //   newSocket.on('roomJoined', ({ roomId }) => {
      //     console.log(`Joined room: ${roomId}`);
      //     setRoomId(roomId);
      //   });
    
      // }

      // if (room_id) {
        newSocket.emit('joinRoom', {
              room_id,
              rest_ID: contact.restaurant_id,
              customer_id:  contact.customer_id, // Example customer ID
              rider_id: rider_id,
              order_id: contact.order_id
            });
            console.log( contact);
            
            newSocket.on('roomJoined', ({ roomId }) => {
              console.log(`Joined room: ${roomId}, conversations`);
              setRoomId(roomId);
            });
    
            // console.log('somewhere', {
            //   room_id,
            //   rest_ID: contact.restaurant_id,
            //   customer_id: contact.customer_id, // Example customer ID
            //   rider_id: null
            // });
      // } 
      // else {
      //     newSocket.emit('joinRoom', rider_id);
      //     newSocket.on('roomJoined', ({ roomId }) => {
      //       console.log(`Joined room: ${roomId}, conversation Screen`);
      //       setRoomId(roomId);
      //     });
          
      //   }
  });

   
   

    // Listen for room join confirmation and previous messages
    // newSocket.on('roomJoined', ({ roomId }) => {
    //   console.log(`Joined room: ${roomId}`);
    //   setRoomId(roomId);
    // });

    newSocket.on('previousMessages', ({ messages }) => {
      const formattedMessages = messages.map((msg, index) => ({
        ...msg,
        createdAt: new Date(msg.created_at),
      }));
      // console.log('adasos');

      // console.log({messages});
      
      
      setMessages(formattedMessages.reverse());
    });

    // Listen for new messages
    newSocket.on('newMessage', (message) => {
      console.log(' new message received', message);
      
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      newSocket.off('roomJoined');
      newSocket.off('previousMessages');
      newSocket.off('newMessage');
    };
  }, [contact]);

  const sendMessage = () => {
    if (message.trim()) {
        socket.emit('sendMessage', {
          roomId,
          sender_type: 'rider',
          senderId: rider_id,
          receiver_type: contact.customer_id ? 'customer' : 'restaurant',
          receiverId: contact.customer_id || contact.restaurant_id,
          message,
          timestamp : new Date().toISOString(),
          order_id: contact.order_id
        });
      setMessage('');

    }
  };

  // console.log(image);
  
  const renderItem = ({ item }) => {
    const isRider = item.sender_type === 'rider';

    return (
      <View
        style={[
          styles.messageContainer,
          isRider ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isRider ? styles.customerBubble : styles.restaurantBubble,
          ]}
        >

          {item?.image_url ? (
            <Image
              source={{ uri: item?.image_url }}
              style={styles.chatImage}
            />
          ): item?.imageUrl ? (
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.chatImage}
            />
          ): null }

           {item.message && (
            <Text
              style={[
                styles.messageText,
                isRider ? { color: Colors.secondary_color } : { color: Colors.secondary_text },
              ]}
            >
              {item.message}
            </Text>
          )}
        </View>

        <Text style={styles.timestamp}>
          { item.created_at ? new Date(item.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }) : new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };


  const styles = StyleSheet.create({
    chatContainer: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('2%'),
    },
    messageContainer: {
      marginVertical: hp('1%'),
      flexDirection: 'column',
    },
    messageRight: {
      alignItems: 'flex-end',
    },
    messageLeft: {
      alignItems: 'flex-start',
    },
    bubble: {
      maxWidth: wp('70%'),
      borderRadius: wp('3%'),
      padding: wp('1%'),
      overflow:'hidden',
    },
    customerBubble: {
      backgroundColor:Colors.primary_color,
      borderTopRightRadius: 0,
      width: wp(62)
    },
    restaurantBubble: {
      backgroundColor: '#EDEDED',
      borderTopLeftRadius: 0,
      width: wp(62),
      
    },
    messageText: {
      fontSize: wp('4%'),
      color: Colors.primary_text,
      marginBottom: hp('0.5%'),
      marginTop: hp('0.5%'),
      marginLeft: wp('1%'),
    },
    timestamp: {
      fontSize: wp('3.2%'),
      color: Colors.secondary_text,
      marginTop: hp('0.5%'),
    },
    chatImage: {
      height: hp(30), // Set proportional height for better responsiveness
      width: wp(60),  // Adjust width to fit bubble size
      borderRadius: wp(2), // Add rounded corners
      // marginTop: hp(1), // Add spacing from text
      alignSelf: 'center', // Center the image
      resizeMode: 'stretch', // Ensure the image covers the area proportionally
      shadowColor: '#000', // Add shadow for depth
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.3, 
      shadowRadius: 4,
      // elevation: 3, // Shadow support for Android
      borderWidth: 1, // Optional: Add border for a sleek look
      borderColor: '#ddd', // Border color
      overflow: 'hidden',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: hp('1%'),
      paddingHorizontal: wp('4%'),
      borderTopWidth: 1,
      borderTopColor: '#EDEDED',
    },
    textInput: {
      flex: 1,
      height: hp('5%'),
      borderWidth: 1,
      borderColor: '#EDEDED',
      borderRadius: wp('5%'),
      paddingHorizontal: wp('4%'),
      backgroundColor: '#F9F9F9',
      fontSize: wp('4%'),
      color: Colors.primary_text,
    },
    sendButton: {
      marginLeft: wp('2%'),
      backgroundColor: Colors.button.primary_button,
      borderRadius: wp('5%'),
      padding: wp('3%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendText: {
      color: Colors.button.primary_button_text,
      fontSize: wp('5%'),
      fontWeight: 'bold',
    },
  });
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ChatHeader
        profile={route?.params?.image ? route?.params?.image : null}
        title={route?.params?.name ? route?.params?.name : ''}
      />

      {/* <Loader loading={loading} /> */}

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
  <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholderTextColor={Colors.secondary_text}
        />
    
    <TouchableOpacity style={{marginHorizontal: wp('2%'),}} onPress={()=> cameraBtmSheetRef?.current?.open()} >
        <Ionicons name="camera" size={wp('9')} color={Colors.button.primary_button} />

        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>

      <CameraBottomSheet refRBSheet={cameraBtmSheetRef}  obj={ {
          roomId,
          sender_type: 'rider',
          senderId: rider_id,
          receiver_type: contact.customer_id ? 'customer' : 'restaurant',
          receiverId: contact.customer_id || contact.restaurant_id,
          socket  : socket,
          order_id: contact.order_id
        }}/>
    </View>
  );
};

export default Conversation;


