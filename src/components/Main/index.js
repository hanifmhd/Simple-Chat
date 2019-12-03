/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useReducer} from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from 'react-native';
import {UserContext} from '../../contexts';
import {firebaseService} from '../../services';
import {chatRoomStyles as styles} from '../../styles';
import Input from '../Input';
import Message from '../Message';
import {messagesReducer} from './reducers';

export default function Main() {
  const {uid} = useContext(UserContext);
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(function() {
    return firebaseService.messageRef
      .orderBy('created_at', 'desc')
      .onSnapshot(function(snapshot) {
        dispatchMessages({type: 'add', payload: snapshot.docs});
      });
  }, []);
  return (
    <View style={styles.messagesContainer}>
      <ImageBackground
        source={require('../../assets/image/background-chat.jpg')}
        style={styles.backgroundContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function(item) {
            return item.id;
          }}
          renderItem={function({item}) {
            const data = item.data();
            const side = data.user_id === uid ? 'right' : 'left';
            return <Message side={side} message={data.message} />;
          }}
        />
        <KeyboardAvoidingView behavior="padding">
          <ScrollView style={styles.inputContainer}>
            <Input />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
