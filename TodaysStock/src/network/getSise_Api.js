const yahooStockAPI =  require('yahoo-stock-api');

const getSise_Api = async () => {
	yahooFinance.quote({
  symbol: SYMBOL,
  modules: MODULES  // ex: ['price', 'summaryDetail']
}, httpRequestOptions, function (err, snapshot) {
  // Result
});
}