import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import sise from './src/Sise';
import krx from 'krx-stock-api';

export default function App() {
  return 
 
(async () => console.log(await krx.getStock('005930')))();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
