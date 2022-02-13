import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const getSise = (code) => {
	return new Promise(resolve => {
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
				console.log("pre_value : " + pre_value[0]);
				console.log("cur_value : " + cur_value[0]);

				resolve([cur_value[0], pre_value[0]]);
			}).catch((error) => {
				console.error(error);
			});
		} catch (error) {
			console.error(error);
		} finally {}
	});
}