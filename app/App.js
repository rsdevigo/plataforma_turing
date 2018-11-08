import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/pages/home-screen'
import AuthScreen from './src/pages/auth-screen'
import AuthLoadingScreen from './src/pages/auth-loading-screen'

const Rotas = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen
    },
    Home: {
      screen: HomeScreen
    },
    AuthLoading: {
      screen: AuthLoadingScreen,
    }
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Rotas />
    );
  }
}
