import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';

import image_menu from '../assets/menu.png';
import { list } from './ParsingStockList.js';

export default ListScreen = ({ route, navigation }) => {
	const [data, setData] = useState(list);
	const [search, setSearch] = useState([]);
	const [masterData, setMasterData] = useState(list);
	StatusBar.setBackgroundColor('#d7ccc8');
	
	const onPressItem = (item) => {
		StatusBar.setBackgroundColor('white');
    	console.log('onPressItem =', item.code);
		navigation.dispatch( navigation.navigate({
			name : 'Main',
            params : { code : item.code, name : item.name, sig : true },
		}));
	}
	
	const renderItem = (item) => {
		return (
			<TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
				<Text style={styles.text_item}>{item.name}</Text>
			</TouchableOpacity>
		);
	}
	
	const onBack = () => {
		StatusBar.setBackgroundColor('white');
		navigation.goBack();
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
			<SafeAreaView style = {styles.container_listbutton}>
				<TouchableOpacity onPress={() => onBack()}>
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
		paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight - 1,
	},
	container_list: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
	},
	item: {
		flex: 1,
        height: 100,
		justifyContent: 'center',
        borderWidth: 1,
		margin: 3,
		borderRadius : 7,
		borderColor : '#d7ccc8'
	},
	text_item: {
		fontSize: 15,
		textAlign: 'center',
	},
	container_listbutton: {
		height : 50,
		flexDirection : "row",
    	alignItems: "stretch",
    	justifyContent: "flex-end",
		borderTopLeftRadius : 10,
		borderTopRightRadius : 10,
		backgroundColor : "#d7ccc8"
	},
	image_menu:{
        width: 50,
        height: 50
    }
});