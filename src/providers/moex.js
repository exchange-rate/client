/*
 usd
 http://moex.com/ru/issue/USD000UTSTOM/CETS
 http://moex.com/iss/engines/currency/markets/selt/boards/CETS/securities/USD000UTSTOM.jsonp?iss.meta=off&iss.only=marketdata&lang=ru&_=

 eur
 http://moex.com/ru/issue/EUR_RUB__TOM/CETS
 http://moex.com/iss/engines/currency/markets/selt/boards/CETS/securities/EUR_RUB__TOM.jsonp?iss.meta=off&iss.only=marketdata&lang=ru&_=

 brent
 https://www.theice.com/products/219/Brent-Crude-Futures/data
 https://www.theice.com/marketdata/DelayedMarkets.shtml?getContractsAsJson=&productId=254&hubId=403&_=
*/

const URL = 'http://moex.com/iss/engines/currency/markets/selt/boards/CETS/securities/';
const USD_URL = URL + 'USD000UTSTOM.jsonp?iss.meta=off&iss.only=marketdata&lang=ru&_=';
const EUR_URL = URL + 'EUR_RUB__TOM.jsonp?iss.meta=off&iss.only=marketdata&lang=ru&_=';

const YQL = `select * from yahoo.finance.xchange where pair="EURUAH,USDUAH,EURRUB,USDRUB" & format=json & env=store://datatables.org/alltableswithkeys & callback=#query/results/rate/0`

`https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22EURUAH,USDUAH,EURRUB,USDRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=#query/results/rate/0`

export default {
	update() {
		return new Promise((resolve, reject) => {
			Promise
				.all([fetch(USD_URL), fetch(EUR_URL)])
				.then(results => Promise.all(
					results.map(response => response.json())
				))
				.then(dataArray => {
					resolve({
						usd: dataArray[0].marketdata.data[0][8],
						eur: dataArray[1].marketdata.data[0][8]
					});
				})
				.catch(reject)
		});
	}
};
