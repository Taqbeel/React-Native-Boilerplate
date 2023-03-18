import React from 'react';
import { StatusBar, LogBox, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/nav/StackNavigator';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';


LogBox.ignoreAllLogs();

let persistor = null;

if (!__DEV__) {
  console.log = () => { };
}

class App extends React.Component {

  state = {
    rehydrating: true,
  };

  async componentDidMount() {
    persistor = await persistStore(store, null, async () => {

      let isFirstTime = await AsyncStorage.getItem('isFirstTime');

      if (!isFirstTime) {
        await AsyncStorage.setItem('isFirstTime', 'true');
        setTimeout(() => {
          RNRestart.Restart();
        }, 1);
      }
      this.setState({ rehydrating: false });
    });
  }


  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar translucent backgroundColor={'transparent'} />
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;