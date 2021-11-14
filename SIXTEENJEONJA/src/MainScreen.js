import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Arrow_up from '../assets/arrow_up.png'
import StockList from './ListScreen.js'

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
	  var currentValue = data[0]?.replace(',', '');
	  var preValue = data[1]?.replace(',', '');
	  const diff = currentValue - preValue;
	  
		if(diff > 0)
		{
			return (
				<SafeAreaView backgroundColor = {"#1e88e5"} style = {styles.container_card_up}>
					<SafeAreaView style = {styles.container_icon}>
          				<Image source={{
            				uri: 'http://openweathermap.org/img/wn/01d@4x.png',
            				width: 180,
            				height: 180,
          				}} />
					</SafeAreaView>
					<SafeAreaView style = {styles.container_diff}>
						<Text style = {styles.text_updown}>
							{"▲" + diff}
						</Text>
					</SafeAreaView>
				</SafeAreaView>
			);
		}
		else if(diff < 0)
		{
			return (
				<SafeAreaView backgroundColor = {"#424242"} style = {styles.container_card_up}>
					<SafeAreaView style = {styles.container_icon}>
          				<Image source={{
            				uri: 'http://openweathermap.org/img/wn/09d@4x.png',
            				width: 180,
            				height: 180,
          				}}/>
					</SafeAreaView>
					<SafeAreaView style = {styles.container_diff}>
						<Text style = {styles.text_updown} color = {"blue"}>
							{"▼" + diff}
						</Text>
					</SafeAreaView>
				</SafeAreaView>
			);
		}
		else
		{
			return (
				<SafeAreaView backgroundColor = {"#78909c"} style = {styles.container_card_up}>
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
			<SafeAreaView style = {styles.container_card}>
				{renderIconAndBackground()}
				<SafeAreaView style={styles.container_sise}>
					<SafeAreaView style = {styles.container_current}>
						<SafeAreaView style = {styles.container_sise_text}>
							<Text style ={styles.text_sise1}>
								{"현재가  "}
							</Text>
						</SafeAreaView>
						<Text style ={styles.text_sise}>
							{data[0]}
						</Text>
					</SafeAreaView>
					<SafeAreaView style = {styles.container_current}>
						<SafeAreaView style = {styles.container_sise_text}>
							<Text style ={styles.text_sise1}>
								{"전일가  "}
							</Text>
						</SafeAreaView>
						<Text style ={styles.text_sise}>
							{data[1]}
						</Text>
					</SafeAreaView>
				</SafeAreaView>
			</SafeAreaView>
			<SafeAreaView style = {styles.container_listbut}>
				<TouchableOpacity style = {{alignItems : "center"}} onPress = {StockList}>
					<Image source = {Arrow_up} style = {{width : 35, height : 35}}/>
				</TouchableOpacity>
			</SafeAreaView>
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
	container_sise: {
		flex : 1,
		backgroundColor : "#f5f5f5",
    	flexDirection: 'column',
    	alignItems: "center",
    	justifyContent: "center",
		borderBottomRightRadius : 10,
		borderBottomLeftRadius : 10
	},
	container_card: {
		flex: 15,
		margin : 20,
		flexDirection: 'column',
    	alignItems: "stretch",
    	justifyContent: "center",
		borderRadius: 10,
		...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
		})
	},
	container_card_up: {
		flex : 3,
    	flexDirection: 'column',
    	alignItems: "center",
    	justifyContent: "center",
		borderTopLeftRadius : 10,
		borderTopRightRadius : 10
	},
	text_sise: {
		fontSize: 40,
    	color: "black",
	},
	text_sise1: {
		fontSize: 20,
		color: "black",
	},
	text_updown: {
		fontSize: 20
	},
	container_current: {
		flexDirection: 'row'
  	},
	container_sise_text: {
		paddingTop: 20
  	},
	container_diff: {
		flex : 1
	},
	container_icon: {
		flex : 13,
		alignItems : "center",
    	justifyContent: "center",
	},
	container_listbut: {
		flex : 1,
    	alignItems: "stretch",
    	justifyContent: "center",
	}
});