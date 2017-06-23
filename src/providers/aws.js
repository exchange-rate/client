import converters from 'dynamo-converters';

const awsKey = 'n2ZKFrQL5Z5YNKb3tio4j4vtwPUVTrOi7hTveQnJ';

function toUrlParams(params) {
	return '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

function formatDate(date) {
	return date.toISOString();
}

export default {
	update() {
		const startDate = new Date();
		const endDate = new Date();
		let table = 'today_exchange';

		switch (range){
			case 'year':
				startDate.setDate(startDate.getDate() - 365);
				break;
			case 'month':
				startDate.setDate(startDate.getDate() - 30);
				break;
			case 'week':
				startDate.setDate(startDate.getDate() - 6);
				break;
			case 'day':
			default:
				table = 'currency';
				startDate.setHours(0, 0, 0, 0);
		}

		const params = toUrlParams({
			before_date: formatDate(endDate),
			after_date: formatDate(startDate),
			table_name: table,
			currency: 'EURUAH'
		});

		const url = 'https://mc010i3rae.execute-api.eu-central-1.amazonaws.com/prod/exchange' + params;
		const request = new Request(url, {
			headers: new Headers({
				'x-api-key': awsKey
			})
		});

		return fetch(request)
			.then(response => response.json())
			.then(data => {
				const result = {
					usd: [],
					eur: []
				};

				data.Items.forEach(awsItem => {
					const item = converters.itemToData(awsItem);
					const date = new Date(item.date);

					result.usd.push({
						date,
						value: item.currencies.USDRUB.rate
					});

					result.eur.push({
						date,
						value: item.currencies.EURRUB.rate
					});
				});

				return result;
			});
	}
};
