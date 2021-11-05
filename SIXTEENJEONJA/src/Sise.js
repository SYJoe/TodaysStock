import Constants from 'expo-constants';
import React from 'react';

class Sise {
	fetchSise = () => {
		const url = "https://finance.naver.com/item/main.nhn?code=005930";
		fetch(url)
  		.then(function(response) {
			console.log(response.toString());
    		return response.toString();
  		})
  		.then(function(myJson) {
    		console.log(JSON.stringify(myJson));
  		});
	}
}

export default new Sise();