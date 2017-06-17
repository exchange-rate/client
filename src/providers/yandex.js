const USD_URL = 'https://news.yandex.ru/quotes/graph_3005.json';
const EUR_URL = 'https://news.yandex.ru/quotes/graph_3027.json';

function takeRight(array, count) {
	return array.slice(Math.max(array.length - count, 1));
}

export default {

	update() {
		function mapChart(data) {
			return takeRight(data.prices, 1).map(item => {
				const [date, value] = item;
				return {
					date: new Date(date),
					value
				}
			});
		}

		return new Promise((resolve, reject) => {
			Promise
				.all([fetch(USD_URL), fetch(EUR_URL)])
				.then(results => Promise.all(
					results.map(response => response.json())
				))
				.then(dataArray => {
					const [usd, eur] = dataArray;
					resolve({
						usd: mapChart(usd),
						eur: mapChart(eur)
					});
				})
				.catch(() => {
					reject();
				})
		});
	},

	getDetailed() {
		function convertResponse(data) {
			return takeRight(data.prices, 30).map(item => {
				const [date, value] = item;
				return {
					date: new Date(date),
					value: value.toFixed(2)
				}
			});
		}

		return new Promise((resolve, reject) => {
			Promise
				.all([
					fetch(USD_URL), fetch(EUR_URL)
				])
				.then(results => Promise.all(
					results.map(response => response.json())
				))
				.then(dataArray => resolve({
					usd: convertResponse(dataArray[0]),
					eur: convertResponse(dataArray[1])
				}))
				.catch(() => {
					reject();
				})
		});
	}

}
