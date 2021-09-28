import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sise from './src/Sise'
import mainScreen from './src/MainScreen'

export default class App extends React.Component {
	static Stack = createStackNavigator();
  render() {
    const Stack = App.Stack;
    return (
      <NavigationContainer>
          <Stack.Screen
            name="Main"
            component={mainScreen}
            options={{ title: 'Main', headerShown : false, }}
          />
      </NavigationContainer>
    );
  }
}
