const axios = require("axios");
const Iconv = require("iconv-lite");

const options = {
  url: 'https://finance.naver.com/item/main.nhn?code=005930',
  method: 'GET',
  headers: {'User-Agent':'Chrome/81.0.4044.92'},
  responseType : "arraybuffer"
};

axios(options)
  .then(response => {
	const response_convert = Iconv.decode(response.data, "EUC-KR").toString();
	const cur_value_index = response_convert.indexOf('현재가'); 
	const cur_value = response_convert.substr(cur_value_index + 4, 6);
	const pre_value_index = response_convert.indexOf('전일가'); 
	const pre_value = response_convert.substr(pre_value_index + 4, 6);
    console.log(cur_value);
	console.log(pre_value);
  }).catch((error) => {
  console.error(error);
});