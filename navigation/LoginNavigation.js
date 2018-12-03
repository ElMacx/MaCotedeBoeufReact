import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AppNavigator from './AppNavigator';
import LoadingScreen from '../screens/LoadingScreen';

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Inscription'
    }
  }
})

const LoginSwitchNavigator = createSwitchNavigator({
    LoginStackNavigator,
    AppNavigator,
    LoadingScreen,
  }, {
    initialRouteName: 'LoadingScreen'
})

export default LoginSwitchNavigator
