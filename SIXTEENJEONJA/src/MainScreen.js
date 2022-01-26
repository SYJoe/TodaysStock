import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import image_menu from '../assets/menu.png';
import { LinearGradient } from "expo-linear-gradient";

const axios = require("axios");

export default MainScreen = ({ route, navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	
	let code = (route.params) ? route.params.code : "000000";
	let name = (route.params) ? route.params.name : "null";
	let sig = (route.params) ? route.params.sig : false;
	
	const getSise = async () => {
		try {
			axios({
		url: 'https://finance.naver.com/item/main.naver?code=' + code,
  		method: 'GET',
  		headers: {'User-Agent':'Chrome/81.0.4044.92'}
	}).then(response => {
				const cur_value_index = response.data.indexOf('현재가'); 
				const cur_value = response.data.substr(cur_value_index + 4, 10).split(" ");
				const pre_value_index = response.data.indexOf('전일가'); 
				const pre_value = response.data.substr(pre_value_index + 4, 10).split("<");
    			
				console.log("code : " + code);
				console.log(response.data);
				console.log("cur_value : " + cur_value[0]);
				console.log("pre_value : " + pre_value[0]);
				
				let sise = [cur_value[0], pre_value[0]];
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
	
	const storeData = async () => {
		try {
			await AsyncStorage.setItem('code', code);
			console.log("data store");
		} catch (error) {
			console.log("store failed!");
		}
	};
	
	const retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('code');
			if (value !== null) {
				code = value;
				console.log("code change :" + code);
			}
		} catch (error) {
			console.log("no stored data!");
		}
		getSise();
	};
	
	useEffect(() => {
		if(sig)
		{
			console.log("if");
			getSise();
			storeData();
		}
		else
		{	
			retrieveData();
		}
		sig = false;
	}, [route.params]);
	
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
		flex: 1,
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
		height: 56,
		flexDirection : "row",
    	alignItems: "stretch",
    	justifyContent: "flex-end"
	},
	image_menu:{
        width: 50,
        height: 50
    },
	text_name : {
		padding : 10,
		fontSize : 25,
		color : 'white'
	}
});