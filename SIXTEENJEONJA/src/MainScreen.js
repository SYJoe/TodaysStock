import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.contatiner}>
		<View style={styles.container_sise}>
			<Text>
				{data[0]}
			</Text>
			<Text>
				{data[1]}
			</Text>
		</View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight
  },
	container_sise: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  text_temp: {
    fontSize: 90,
    color: "black",
  }
});