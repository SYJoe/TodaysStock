import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, AsyncStorage, StatusBar, RefreshControl, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

import { list } from './ParsingStockList.js';
import { getSise } from './getSise.js';
import image_menu from "../assets/menu.png";
import image_refresh from "../assets/refresh.png";

export default MainScreen = ({ route, navigation }) => {
	const [data, setData] = useState([]);
	const [name, setName] = useState([]);
	const [isRefreshing, setRefreshing] = useState(false);
	
	let code = (route.params) ? route.params.code : "000000";
	let sig = (route.params) ? route.params.sig : false;
	
	const getName = async () => {
		let index = list.findIndex(obj => obj.code == code);
		setName(list[index].name);
	}	
	
	const storeData = async () => {
		setData(await getSise(code));
		getName();
		
		try {
			await AsyncStorage.setItem('code', code);
			console.log("data store");
		} catch (error) {
			console.log("store failed!");
		}
	};
	
	const retrieveData = async () => {
		try {
			const value_code = await AsyncStorage.getItem('code');
			if (value_code !== null) {
				code = value_code;
				console.log("code change :" + code);
			}
		} catch (error) {
			console.log("no stored data!");
		}
		
		setData(await getSise(code));
		getName();
	};
	
	useEffect(() => {
		if(sig)
		{ 
			storeData();
		}
		else
		{	
			retrieveData();
		}
		sig = false;
	}, [route.params]);
	
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		retrieveData().then(() => setRefreshing(false));
	}, []);
	
	const renderIconAndBackground = () => {
	  var currentValue = data[0]?.replace(',', '');
	  var preValue = data[1]?.replace(',', '');
	  const diff = currentValue - preValue;
	  const diff_percent = (diff / preValue) * 100;
	  
		if(diff > 0)
		{
			return (
				<LinearGradient colors={["#5B86E5", "#36D1DC"]} style = {styles.container_card_up}>
					<Text style = {styles.text_name}>{name}</Text>
					<SafeAreaView style = {styles.container_icon}>
          				<Image source={{
            				uri: 'http://openweathermap.org/img/wn/01d@4x.png',
            				width: 180,
            				height: 180,
          				}} />
					</SafeAreaView>
					<SafeAreaView style = {styles.container_diff}>
						<Text style = {styles.text_diffup} >
							{"▲" + diff + " (" + diff_percent.toFixed(2) + "%)"}
						</Text>
					</SafeAreaView>
				</LinearGradient>
			);
		}
		else if(diff < 0)
		{
			return (
				<LinearGradient colors={["#29323c", "#bdc3c7"]} style = {styles.container_card_up}>
					<Text style = {styles.text_name}>{name}</Text>
					<SafeAreaView style = {styles.container_icon}>
          				<Image source={{
            				uri: 'http://openweathermap.org/img/wn/09d@4x.png',
            				width: 180,
            				height: 180,
          				}}/>
					</SafeAreaView>
					<SafeAreaView style = {styles.container_diff}>
						<Text style = {styles.text_diffdown} color = {"blue"}>
							{"▼" + diff*-1 + " (" + diff_percent.toFixed(2) + "%)"}
						</Text>
					</SafeAreaView>
				</LinearGradient>
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
			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						/>
				}>
			<SafeAreaView style = {styles.container_card}>
				{renderIconAndBackground()}
				<SafeAreaView style={styles.container_sise}>
					<SafeAreaView style = {styles.container_current}>
						<SafeAreaView style = {styles.container_sisename_pre}>
							<Text style ={styles.text_sisename_pre}>
								{"전일가  "}
							</Text>
						</SafeAreaView>
						<Text style ={styles.text_sise_pre}>
							{data[1]}
						</Text>
					</SafeAreaView>
					<SafeAreaView style = {styles.container_current}>
						<SafeAreaView style = {styles.container_sisename_cur}>
							<Text style ={styles.text_sisename_cur}>
								{"현재가  "}
							</Text>
						</SafeAreaView>
						<Text style ={styles.text_sise_cur}>
							{data[0]}
						</Text>
					</SafeAreaView>
				</SafeAreaView>
			</SafeAreaView>
			<SafeAreaView style = {styles.container_listbutton}>
				<TouchableOpacity onPress={() => navigation.navigate("List")}>
					<Image style = { styles.image_menu } source = { image_menu }/>
				</TouchableOpacity>
			</SafeAreaView>
			</ScrollView>
    	</SafeAreaView>
  );
};

const styles = StyleSheet.create({
	 scrollView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
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
		flex: 1,
		margin : 20,
		flexDirection: 'column',
    	alignItems: "stretch",
    	justifyContent: "center",
		borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20
	},
	container_card_up: {
		flex : 3,
    	flexDirection: 'column',
    	alignItems: "center",
    	justifyContent: "center",
		borderTopLeftRadius : 10,
		borderTopRightRadius : 10,
		paddingTop : 10
	},
	text_sise_cur: {
		fontSize: 40,
    	color: "black",
	},
	text_sise_pre: {
		fontSize: 25,
    	color: "black",
	},
	text_sisename_cur: {
		fontSize: 20,
		color: "black",
	},
	text_sisename_pre: {
		fontSize: 15,
		color: "black",
	},
	text_diffup: {
		fontSize: 20,
		color : '#d32f2f'
	},
	text_diffdown: {
		fontSize: 20,
		color : '#1e88e5'
	},
	container_current: {
		flexDirection: 'row'
  	},
	container_sisename_cur: {
		paddingTop: 20
  	},
	container_sisename_pre: {
		paddingTop: 10
  	},
	container_diff: {
		padding : 10,
		flex : 1
	},
	container_icon: {
		flex : 13,
		alignItems : "center",
    	justifyContent: "center",
	},
	container_listbutton: {
		height: 50,
		flexDirection : "row",
    	alignItems: "stretch",
    	justifyContent: "flex-end"
	},
	container_refreshbutton: {
		height: 25,
		flexDirection : "row",
    	alignItems: "stretch",
    	justifyContent: "flex-end"
	},
	image_menu:{
        width: 50,
        height: 50
    },
	image_refresh:{
        width: 20,
        height: 20
    },
	text_name : {
		padding : 10,
		fontSize : 25,
		color : 'white'
	}
});