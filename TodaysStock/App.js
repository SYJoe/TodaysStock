import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import listScreen from './src/ListScreen';
import mainScreen from './src/MainScreen';
import testScreen from './src/test';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
    const Stack = createStackNavigator();
	return (
		<NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
			<Stack.Screen
				name="Main"
            	component={mainScreen}
            	options={{ title: 'Main', headerShown : false, }}>
			</Stack.Screen>
			<Stack.Screen
            	name="List"
            	component={listScreen}
            	options={{ title: 'List', headerShown : false, }}>
			</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});