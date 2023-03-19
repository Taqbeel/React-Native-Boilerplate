# React Native Demo App

## Features

- React Navigation v6
- Redux
- Auth
- Cars List
- Add/Update/Delete Car

User can signup/signin to dashboard where user can see different categories of cars and sort by Name/Year/Origin. User can add a car from the home screen and User can view list of cars in specific categories. On cars list screen user can edit/delete a car. 
On Page header user can have back route option with different page title and can logout to Login Page.
 

## Dependencies

Demo App uses a number of dependencies in project to work nicely:

-     "@react-native-community/async-storage": "^1.12.1",
-     "@react-navigation/native": "^6.0.2",
-     "@react-navigation/stack": "^6.0.4",
-     "lodash": "^4.17.21",
-     "react": "17.0.2",
-     "react-native": "0.66.3",
-     "react-native-dropdown-select-list": "^2.0.4",
-     "react-native-gesture-handler": "^1.10.3",
-     "react-native-keyboard-aware-scroll-view": "^0.9.4",
-     "react-native-reanimated": "^1.9.0",
-     "react-native-restart": "^0.0.22",
-     "react-native-safe-area-context": "^3.3.0",
-     "react-native-screens": "^3.5.0",
-     "react-native-splash-screen": "^3.2.0",
-     "react-native-vector-icons": "^8.1.0",
-     "react-redux": "^7.2.6",
-     "redux": "^4.1.2",
-     "redux-persist": "^6.0.0",
-     "redux-thunk": "^2.4.1"

## Installation

Demo App requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd path/to/react-native-demo-app

yarn install

ANDROID
react-native run-android

IOS
cd ios
pod install
react-native run-ios
```

## License

MIT

**Free Software!**