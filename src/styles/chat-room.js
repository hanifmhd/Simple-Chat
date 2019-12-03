import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  backgroundContainer: {flex: 1},
  messagesContainer: {
    height: Dimensions.get('window').height,
  },
  inputContainer: {
    height: 80,
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
  },
});
