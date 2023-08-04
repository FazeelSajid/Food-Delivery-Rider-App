import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useCallback, memo, useRef} from 'react';
import StackHeader from '../../../components/Header/StackHeader';
import ChatHeader from '../../../components/Header/ChatHeader';
import {Colors, Fonts, Icons, Images} from '../../../constants';

import {
  GiftedChat,
  Send,
  Bubble,
  Time,
  InputToolbar,
  Composer,
  SystemMessage,
  Actions,
} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

import uuid from 'react-native-uuid';

const CGiftedChat = ({messages, setMessages}) => {
  const [newMessage, setNewMessage] = useState('');
  //   const [messages, setMessages] = useState([]);
  const [user_id, setUser_id] = useState(1);
  const ref = useRef('');
  const inputRef = useRef('');
  useEffect(() => {
    ref.current = '';
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 10,
  //       text: 'Ok,Lorem ipsum dolor sit amet,',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 9,
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 8,
  //       text: 'Ok,Lorem ipsum dolor sit amet,',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 7,
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       sent: true,
  //       received: true,
  //     },
  //     {
  //       _id: 6,
  //       text: 'Ok,Lorem ipsum dolor sit amet,',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 5,
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       sent: true,
  //       received: true,
  //     },
  //     {
  //       _id: 4,
  //       text: 'Ok, thanks for answer all the questions.Lorem ipsum dolor sit amet, consectetur adipis.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       // Mark the message as sent, using one tick
  //       sent: true,
  //       // Mark the message as received, using two tick
  //       received: true,
  //       // Mark the message as pending with a clock loader
  //       // pending: true,
  //       // // Any additional custom parameters are passed through
  //       // system: true,
  //       // Any additional custom parameters are passed through
  //     },
  //     {
  //       _id: 3,
  //       text: 'Ok,Lorem ipsum dolor sit amet,',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 1,
  //       text: 'Good afternoon, How can i help?',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);
  //   const onSend = useCallback((messages = []) => {
  //     console.log('onSend', messages);
  //     // setMessages(previousMessages =>
  //     //   GiftedChat.append(previousMessages, messages),
  //     // );
  //   }, []);

  const onSend = useCallback(
    async text => {
      console.log('onSend', text);
      ref.current = '';
      inputRef.current = '';
      let obj = {
        _id: uuid.v4(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      console.log('obj  : ', obj);
      Keyboard.dismiss();
      setTimeout(() => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, obj),
        );
      }, 200);

      // setNewMessage(text);
      // inputRef?.current?.clear();
    },
    [messages],
  );

  const CustomBubble = props => {
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: Colors.Orange,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 15,
              marginBottom: 35,
              marginRight: 10,
              alignItems: 'flex-end', // Align the content to the right
              paddingTop: 10,
              paddingBottom: 5,
              paddingHorizontal: 5,
            },
            left: {
              backgroundColor: '#F1F1F1',
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 5,
              marginBottom: 35,
              marginLeft: 10,
              alignItems: 'flex-start', // Align the content to the left
              paddingTop: 10,
              paddingBottom: 5,
              paddingHorizontal: 5,
            },
          }}
          containerStyle={{
            backgroundColor: 'red',
          }}
          timeTextStyle={{
            left: {
              color: '#000000',
              fontFamily: Fonts.Inter_Medium,
              fontSize: RFPercentage(1.4),
              marginBottom: -35,
              top: 18,
              position: 'relative',
            },
            right: {
              color: '#000000',
              fontFamily: Fonts.Inter_Medium,
              fontSize: RFPercentage(1.4),
              marginBottom: -35,
              top: 18,
              position: 'relative',
            },
          }}
        />

        {props?.currentMessage?.user?._id != user_id ? (
          <View
            style={{
              backgroundColor: '#F1F1F1',
              height: 10,
              width: 20,
              borderTopLeftRadiusRadius: 2,
              borderBottomLeftRadius: 8,
              position: 'absolute',
              top: 0,
              left: 5,
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: Colors.Orange,
              height: 10,
              width: 20,
              borderTopRightRadius: 2,
              borderBottomRightRadius: 8,
              position: 'absolute',
              top: 0,
              right: 5,
            }}
          />
        )}
      </View>
    );
  };

  const CustomTicks = currentMessage => {
    console.log('CustomTicks render');
    // console.log('props::::   ', currentMessage);
    // console.log('currentMessage?.sent  : ', !!currentMessage?.sent);
    // console.log('currentMessage?.received  : ', !!currentMessage?.received);
    return (
      <View style={{position: 'relative', top: 21, left: -70}}>
        {/* <Text style={[{color: Colors.Orange}]}>✓✓</Text> */}
        {/* {!!currentMessage?.sent && !!currentMessage?.received && ( */}
        {currentMessage?.sent == true && !!currentMessage?.received == true && (
          <Icons.DoubleTick />
        )}
      </View>
    );
  };

  const CustomInputToolbar = props => {
    console.log('CustomInputToolbar render');
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          paddingVertical: 20,
          paddingTop: 8,
          borderTopWidth: 0,
          width: '90%',
          marginHorizontal: 20,
        }}
        // renderComposer={props => renderComposer(props)}
        renderComposer={props => {
          return <RenderComposer {...props} />;
        }}
        renderSend={props => {
          return <RenderSend {...props} />;
        }}
      />
    );
  };

  const RenderSend = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('ref :: ', inputRef.current);
          onSend(inputRef.current);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 8,
        }}>
        <View
          style={{
            justifyContent: 'center',
            padding: 20,
            paddingVertical: 15,
            borderRadius: 10,
            borderWidth: 0,
            backgroundColor: Colors.Orange,
          }}>
          <Icons.Send />
        </View>
      </TouchableOpacity>
    );
  };
  const onChangeText = item => {
    ref.current = item;
    console.log('item  : ', ref.current);
    // setNewMessage(item);
    inputRef.current = item;
  };
  const RenderComposer = props => {
    return (
      <TextInput
        {...props}
        ref={ref}
        style={{
          flex: 1,
          fontSize: 16,
          paddingHorizontal: 15,
          borderRadius: 10,
          backgroundColor: '#F5F5F5',
        }}
        placeholder="Write message..."
        multiline={true}
        // value={newMessage}
        // value={typeof ref.current == 'string' ? ref.current : ''}
        // onChangeText={text => setNewMessage(text)}
        onChangeText={onChangeText}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ChatHeader profile={Images.user1} title={'Anabel Ramon'} /> */}
      <View style={{flex: 1}}>
        <GiftedChat
          messagesContainerStyle={{paddingBottom: 30}}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: user_id,
          }}
          renderInputToolbar={props => {
            return <CustomInputToolbar {...props} />;
          }}
          // renderAvatar={props => {
          //   return null;
          // }}
          renderAvatar={null}
          renderBubble={props => {
            return <CustomBubble {...props} />;
          }}
          renderTicks={props => {
            return <CustomTicks {...props} />;
          }}
          alwaysShowSend
          onInputTextChanged={text => {
            console.log('text : ', text);
          }}
        />
      </View>
    </View>
  );
};

export default memo(CGiftedChat);
