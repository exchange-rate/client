const URL = 'http://www.rbc.ru/ajax/indicators';
const USD_URL = 'http://www.rbc.ru/money_graph/latest/59111';
const EUR_URL = 'http://www.rbc.ru/money_graph/latest/59090';

export default {

	update() {
		function mapChart(data) {
			return data.data.map(item => ({
				date: new Date(item.date),
				value: item.value
			}));
		}

		return new Promise((resolve, reject) => {
			Promise
				.all([fetch(USD_URL), fetch(EUR_URL)])
				.then(results => Promise.all(
					results.map(response => response.json())
				))
				.then(dataArray => {
					resolve({
						usd: mapChart(dataArray[0]),
						eur: mapChart(dataArray[1])
					});
				})
				.catch(() => {
					reject();
				})
		});
	},

	getDetailed() {
		function convertResponse(data) {
			// let date = new Date(item.date);
			return data.data.map(item => {
				// let date = new Date(item.date);
				return {
					// date: date.getHours() + ':' + pad(date.getMinutes(), 2),
					date: new Date(item.date),
					value: item.value.toFixed(2)
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

};
