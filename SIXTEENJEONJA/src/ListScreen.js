import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Arrow_up from '../assets/arrow_up.png'

const axios = require("axios");
const Iconv = require("iconv-lite");

const options = {
  url: 'https://finance.naver.com/sise/sise_market_sum.naver?&page=1',
  method: 'GET',
  headers: {'User-Agent':'Chrome/81.0.4044.92'}
};

export default ListScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
	/*
  const getList = async () => {
    try {
		axios(options).then(response => {
			
		}).catch((error) => {
			console.error(error);
		});
	} catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, []);
	*/
	return (
		<SafeAreaView style = {styles.container}>
			<SafeAreaView style = {styles.container_listbut}>
				<TouchableOpacity style = {{alignItems : "center"}} onPress = {StockList}>
					<Image source = {Arrow_up} style = {{width : 35, height : 35}}/>
				</TouchableOpacity>
			</SafeAreaView>
			<Text>
				{"Test"}
			</Text>
		</SafeAreaView>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
		paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
	},
	container_listbut: {
		flex : 1,
    	alignItems: "stretch",
    	justifyContent: "center",
	}
});