import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Arrow_up from '../assets/arrow_up.png'

const axios = require("axios");

export default ListScreen = ({ route, navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	
	const getList = async () => {
		let sise = [
			{
				id : 1,
				name : "CJ CGV",
				code : "079160"
			},
			{
				id : 2,
				name : "삼성출판사",
				code : "068290"
			},
			{
				id : 3,
				name : "삼성전자",
				code : "005930"
			}
		]; //Test data
		setData(sise);	
	}
	
	useEffect(() => {
		getList();
	}, []);
	
	const onPressItem = (item) => {
    	console.log('onPressItem =', item.code);
		navigation.dispatch( navigation.navigate({
            name : 'Main',
            params : { code : item.code },
            merge : true,
          }) );
  }
	
	const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
        <Text style={styles.text_item}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
	
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => String(item.id)}
                data={data}
      />
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
	},
	 item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    margin: 3,
  },
  text_item: {
    fontSize: 15,
    textAlign: 'center',
  }
});