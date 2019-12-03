/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useState} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../common/Button';
import Loader from '../common/Loader';

import {COLORS} from '../../styles';
import {firebaseService} from '../../services';
import {UserContext} from '../../contexts';
import {Icon} from 'react-native-elements';

const data = ['How are you?', 'What`s your name?'];

export default function Message({message, side}) {
  const {uid} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [image, showImage] = useState(0);

  const isLeftSide = side === 'left';
  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;
  const userStyles = isLeftSide ? styles.leftUser : styles.rightUser;
  const textStyles = isLeftSide
    ? flattenedStyles.leftText
    : flattenedStyles.rightText;

  const handlePress = useCallback(function(param) {
    setIsLoading(true);
    firebaseService.createMessageButton(param, {uid}).then(function() {
      setIsLoading(false);
    });
  });

  const detailImage = param => {
    if (param.includes('open')) {
      showImage(image + 1);
    } else {
      showImage(image - 1);
    }
  };
  return message.includes('suggestion') ? (
    isLeftSide ? null : (
      <View>
        <View
          style={
            isLeftSide ? null : {...styles.rightUser, flexDirection: 'row'}
          }>
          {data.map((item, index) => (
            <Button
              key={index}
              text={item}
              onPress={() => handlePress(item)}
              disabled={isLoading}
              style={styles.suggestionButton}
            />
          ))}
          {isLoading && <Loader />}
        </View>
      </View>
    )
  ) : message.includes('gif') ? (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        {isLeftSide ? (
          <Text style={userStyles}>Dia</Text>
        ) : (
          <Text style={userStyles}>Saya</Text>
        )}
        <TouchableOpacity onPress={() => detailImage('open')}>
          <Image
            source={{
              uri: message,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        {image > 0 && (
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => detailImage('close')}
            isVisible={true}>
            <View>
              <Icon
                name={'close'}
                color={COLORS.WHITE}
                size={20}
                onPress={() => detailImage('close')}
              />
              <Image source={{uri: message}} style={styles.modalImage} />
            </View>
          </Modal>
        )}
      </View>
    </View>
  ) : message.includes('//') ? (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        {isLeftSide ? (
          <Text style={userStyles}>Dia</Text>
        ) : (
          <Text style={userStyles}>Saya</Text>
        )}
        <TouchableOpacity onPress={() => detailImage('open')}>
          <Image
            source={{
              uri: `data:image/gif;base64,${message}`,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        {image > 0 && (
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => detailImage('close')}
            isVisible={true}>
            <View>
              <Icon
                name={'close'}
                color={COLORS.WHITE}
                size={20}
                onPress={() => detailImage('close')}
              />
              <Image
                source={{uri: `data:image/gif;base64,${message}`}}
                style={styles.modalImage}
              />
            </View>
          </Modal>
        )}
      </View>
    </View>
  ) : (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        {isLeftSide ? (
          <Text style={userStyles}>Dia</Text>
        ) : (
          <Text style={userStyles}>Saya</Text>
        )}
        <Text style={textStyles}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    maxWidth: 240,
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 10,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  rightTextContainer: {
    backgroundColor: COLORS.DARKGREEN,
    marginRight: 10,
    maxWidth: 240,
  },
  leftText: {
    textAlign: 'left',
    color: COLORS.DARKGREEN,
  },
  leftUser: {
    fontWeight: 'bold',
    color: COLORS.DARKGREEN,
    alignSelf: 'flex-start',
  },
  rightText: {
    textAlign: 'right',
    color: COLORS.WHITE,
  },
  rightUser: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
  suggestionButton: {
    marginLeft: -12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  modalImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text]),
};
