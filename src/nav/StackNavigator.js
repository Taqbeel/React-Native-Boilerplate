import React, { Component } from 'react'
import * as colors from '../styles/colors';
import { createStackNavigator } from '@react-navigation/stack';
import CheckState from './CheckState';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CarsListScreen from '../screens/CarsListScreen';
import AddEditCarScreen from '../screens/AddEditCarScreen';

const Stack = createStackNavigator();

class StackNavigator extends Component {

  render() {

    return (
      <Stack.Navigator
        initialRouteName="CheckState"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: colors.WHITE,
          headerStyle: { backgroundColor: colors.PRIMARY },
        }}>
        <Stack.Screen options={{ headerShown: false }} name="CheckState" component={CheckState} />

        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='CarsListScreen' component={CarsListScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AddEditCarScreen' component={AddEditCarScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
