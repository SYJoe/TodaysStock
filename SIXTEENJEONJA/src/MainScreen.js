import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import Constants from 'expo-constants';

const axios = require("axios");
const Iconv = require("iconv-lite");

const options = {
  url: 'https://finance.naver.com/item/main.nhn?code=005930',
  method: 'GET',
  headers: {'User-Agent':'Chrome/81.0.4044.92'}
};

export default MainScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
	
  const getSise = async () => {
    try {
		axios(options).then(response => {
			const cur_value_index = response.data.indexOf('현재가'); 
			const cur_value = response.data.substr(cur_value_index + 4, 6);
			const pre_value_index = response.data.indexOf('전일가'); 
			const pre_value = response.data.substr(pre_value_index + 4, 6);
    		console.log(cur_value);
			console.log(pre_value);
			let sise = [cur_value, pre_value];
			setData(sise);
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
    getSise();
  }, []);

  const renderIconAndBackground = () =>  {
	  var currentValue = data[0].replace(',', '');
	  var preValue = data[1].replace(',', '');
	  
		if(currentValue - preValue > 0)
		{
			return (
				<SafeAreaView backgroundColor = {"#1e88e5"} style={styles.container_icon}>
          			<Image source={{
            			uri: 'http://openweathermap.org/img/wn/01d@4x.png',
            			width: 180,
            			height: 180,
          			}} />
				</SafeAreaView>
			);
		}
		else if(currentValue - preValue < 0)
		{
			return (
				<SafeAreaView backgroundColor = {"#424242"} style={styles.container_icon}>
          		<Image source={{
            		uri: 'http://openweathermap.org/img/wn/09d@4x.png',
            		width: 180,
            		height: 180,
          		}} />
					
					</SafeAreaView>
			);
		}
		else
		{
			return (
				<SafeAreaView backgroundColor = {"#78909c"} style={styles.container_icon}>
          		<Image source={{
            		uri: 'http://openweathermap.org/img/wn/03d@4x.png',
            		width: 180,
            		height: 180,
          		}} />
					</SafeAreaView>
			);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
				{renderIconAndBackground()}
			<SafeAreaView style={styles.container_sise}>
				<Text style ={styles.text_sise}>
					{data[0]}
				</Text>
				<Text style ={styles.text_sise}>
					{data[1]}
				</Text>
			</SafeAreaView>
    	</SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
	flex : 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight
  },
	container_sise: {
		flex : 1,
		backgroundColor : 'white',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
	container_icon: {
		flex : 3,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: 1
  },
  text_sise: {
    fontSize: 40,
    color: "black",
  }
});