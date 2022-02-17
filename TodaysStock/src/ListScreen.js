import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';

import image_bookmark from '../assets/bookmark.png';
import image_menu from '../assets/menu.png';
import { list } from './ParsingStockList.js';

export default ListScreen = ({ route, navigation }) => {
	const [data, setData] = useState(list);
	const [search, setSearch] = useState();
	const [masterData, setMasterData] = useState(list);
	const [isBookmark, setIsBookmark] = useState(false);
	const [bookmark, setBookmark] = useState([]);
	StatusBar.setBackgroundColor('#d7ccc8');
	
	const storeBookmark = async () => {
		try {
			await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
		} catch (error) {
			console.log(error);
		}
		setBookmark(bookmark);
	}
	
	const retrieveBookmark = async () => {
		try {
				const bookmark_asyncstorage = JSON.parse(await AsyncStorage.getItem('bookmark'));
				if (bookmark_asyncstorage !== null) {
					setBookmark(bookmark_asyncstorage);
				}
			} catch (error) {
				console.log(error);
			}
	}
	
	useEffect(() => {
		retrieveBookmark();
	}, []);
	
	const onPressItem = (item) => {
		StatusBar.setBackgroundColor('white');
    	console.log('onPressItem =', item.code);
		navigation.dispatch( navigation.navigate({
			name : 'Main',
            params : { code : item.code, name : item.name, sig : true },
		}));
	}
	
	const onBack = () => {
		StatusBar.setBackgroundColor('white');
		navigation.goBack();
	}
	
	const renderItem = (item) => {
		return (
			<SafeAreaView style = {styles.container_item}>
				<TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
					<Text style={styles.text_item}>{item.name}</Text>
				</TouchableOpacity>
				<TouchableOpacity style = {{flex: 1}} onPress={() => onBookmark(item.id)}>
					<Image style = {bookmarkComponent(item.id)} source = { image_bookmark }/>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
	
	const onIsBookmark = async () => {
		if(isBookmark)
		{
			setIsBookmark(false);
		}
		else
		{
			setIsBookmark(true);
		}
		console.log(JSON.stringify(bookmark));
	}
	
	const onBookmark = async (id) => {
		const index = bookmark.indexOf(id); 
		if(index > -1)
		{
  			bookmark.splice(index, 1);
			console.log("pop ", id);
		}
		else
		{
			bookmark.push(id);
			console.log("push ", id);
		}
		console.log(JSON.stringify(bookmark));
		storeBookmark();
	}
	
	const isBookmarkComponent = () => {
		if(isBookmark)
		{
			return {
				alignItems: "center",
				justifyContent: "center",
       	 		width: 33,
       			height: 33,
				tintColor : '#fdd835'
			}
		}
		else
		{
			return {
				alignItems: "center",
				justifyContent: "center",
        		width: 33,
        		height: 33,
				tintColor : 'black'
			}
		}
	}
	
	const bookmarkComponent = (id) => {
		if(bookmark.indexOf(id) > -1)
		{	
			return {
				height : 20, 
				width : 20,
				tintColor : '#fdd835'
			}
		}
		else
		{	
			return {
				height : 20, 
				width : 20,
				tintColor : 'black'
			}
		}
	}
	
	const searchFilterFunction = (text) => {
		if (text) {
			const newData = masterData.filter(function (item) {
				const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        		const textData = text.toUpperCase();
        		return itemData.indexOf(textData) > -1;
			});
			setData(newData);
      		setSearch(text);
    	} else {
			setData(masterData);
      		setSearch(text);
		}
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<SafeAreaView style={styles.container_list}>
				<SearchBar
        			round
					inputStyle={{backgroundColor: '#f3e8e4'}}
					inputContainerStyle={{backgroundColor: '#f3e8e4'}}
					containerStyle={{	backgroundColor: '#d7ccc8', 
										borderBottomLeftRadius : 10,
										borderBottomRightRadius : 10,
										borderBottomColor: 'transparent',
 										borderTopColor: '#d7ccc8'}}
          			searchIcon={{ size: 24 }}
          			onChangeText={(text) => searchFilterFunction(text)}
          			onClear={(text) => searchFilterFunction('')}
          			value={search}
          			placeholder="종목명 검색"
    				placeholderTextColor={'#000000'}
      			/>
				<FlatList
                	renderItem={({ item }) => renderItem(item)}
                	keyExtractor={item => String(item.id)}
                	data={data}
					numColumns={2}
      			/>	
    		</SafeAreaView>
			<SafeAreaView style = {styles.container_underbar}>
				<TouchableOpacity onPress={() => onIsBookmark()}>
					<Image style = { isBookmarkComponent() } source = { image_bookmark }/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => onBack()}>
					<Image style = { styles.container_menu } source = { image_menu }/>
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
		paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight-1,
	},
	container_list: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
	},
	item: {
		flex: 4,
		justifyContent: 'center',
	},
	container_bookmarkOnItem: {
		flex: 1,
	},
	container_item : {
		flexDirection : "column",
		height : 100,
		width : (Dimensions.get('window').width / 2) - 6,
        borderWidth: 1,
		margin: 3,
		borderRadius : 7,
		borderColor : '#d7ccc8'
	},
	text_item: {
		fontSize: 15,
		textAlign: 'center',
	},
	container_underbar: {
		height: 60,
		flexDirection : "row",
    	alignItems: "center",
    	justifyContent: "space-between",
		paddingLeft : 10,
		paddingRight : 10,
		borderTopLeftRadius : 10,
		borderTopRightRadius : 10,
		backgroundColor : "#d7ccc8"
	},
	container_menu:{
    	alignItems: "center",
		justifyContent: "center",
        width: 35,
        height: 26
    },
	container_bookmark:{
    	alignItems: "center",
		justifyContent: "center",
        width: 33,
        height: 33,
    },
});