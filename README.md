# Simple-Chat

## Getting started

1. Install React Native as described at [https://facebook.github.io/react-native/docs/getting-started.html#content](https://facebook.github.io/react-native/docs/getting-started.html#content)
2. Clone this repository
3. Run `npm install` , all required components will be installed automatically

    ### iOS
      
    1. Run `pod install` from `/ios` folder
    2. Start XCode and open generated `SimpleChat.xcworkspace` on `/ios` folder

    note : it needs signing & release apple account to run on iOS

    ### Android
    
    no steps required
        
4. It is recommended to run `react-native start` command from root project directory.
5. Run your project from XCode (`Cmd+R`) for iOS or `react-native run-ios`, and use `react-native run-android` to run your project on Android.

## Project dependencies

The project uses the following third-party dependencies:
- "react-native-elements" - to implement icon
- "react-native-firebase" - to store data message on firestore 
- "react-native-image-picker" - to choose image from local storage
- "react-native-modal" - to show modal
