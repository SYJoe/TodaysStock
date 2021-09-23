const axios = require("axios");

const options = {
  url: 'https://finance.naver.com/item/main.nhn?code=005930',
  method: 'GET',
  headers: {'User-Agent':'Chrome/81.0.4044.92'}
};

axios(options)
  .then(response => {
    console.log(response.data);
  }).catch((error) => {
  console.error(error);
});