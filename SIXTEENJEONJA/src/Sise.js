import Constants from 'expo-constants';
import React from 'react';

class Sise {
    fetchSise = () => {
        const url = 'https://finance.naver.com/item/main.nhn?code=005930';
		let responseData = fetch(url).then( response => response.text() ) + "";
		const cur_value_index = responseData.indexOf('현재가'); 
		const cur_value = responseData.substr(cur_value_index + 4, 6);
		/*
		const pre_value_index = responseData.indexOf('전일가'); 
		const pre_value = responseData.substr(pre_value_index + 4, 6);
		const value_sise = [cur_value, pre_value];
		*/
		console.log(cur_value);
        return cur_value;
    }
}

export default new Sise();