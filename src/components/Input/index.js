/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {UserContext} from '../../contexts';
import {firebaseService} from '../../services';
import {COLORS} from '../../styles';
import Button from '../common/Button';
import Loader from '../common/Loader';

export default function Input() {
  const {uid} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePress = useCallback(
    function() {
      if (message.includes('gif')) {
        setIsLoading(true);
        firebaseService
          .createMessageButton(
            `https://www.clicktorelease.com/code/gif/${random(4)}.gif`,
            {uid},
          )
          .then(function() {
            setIsLoading(false);
          });
        setMessage('');
      } else {
        setIsLoading(true);
        firebaseService.createMessage({message, uid}).then(function() {
          setIsLoading(false);
          setMessage('');
        });
      }
    },
    [message, uid],
  );

  const random = param => {
    let a = Math.ceil(Math.random(1) * param);
    return a;
  };

  const browseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setIsLoading(true);
        firebaseService
          .createMessageButton(response.data, {uid})
          .then(function() {
            setIsLoading(false);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message"
        />
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
        }}
        onPress={() => browseImage()}>
        <Icon name={'attach-file'} size={20} color={COLORS.GREY} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button text="Send" onPress={handlePress} disabled={isLoading} />
      </View>

      {isLoading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingRight: 10,
  },
  inputContainer: {flex: 1},
  buttonContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
