import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Alert } from 'react-native';
import Expo from "expo";
import { Facebook } from "expo";

export default class AuthScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  async logIn() {
    const {
      type,
      token
    } = await Expo.Facebook.logInWithReadPermissionsAsync("259661681418419", {
      permissions: ["public_profile", "email"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      await AsyncStorage.setItem('current_user_token', token);
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Button
          onPress={() => this.logIn()}
          title="Login com Facebook"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
