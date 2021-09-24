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
    console.log(response_convert);
  }).catch((error) => {
  console.error(error);
});