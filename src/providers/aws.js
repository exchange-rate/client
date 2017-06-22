import converters from 'dynamo-converters';

const awsKey = 'n2ZKFrQL5Z5YNKb3tio4j4vtwPUVTrOi7hTveQnJ';

function formatDate(date) {
	return date.toISOString();
}

export default {
	update() {
		const startDate = new Date();
		const endDate = new Date();
		let table = "";
		switch (range){
			case 'year':
				startDate.setDate(startDate.getDate() - 365);
				table = "today_exchange";
				break;
			case 'month':
				startDate.setDate(startDate.getDate() - 30);
				table = "today_exchange";
				break;
			case 'week':
				startDate.setDate(startDate.getDate() - 6);
				table = "today_exchange";
				break;
			case 'day':
			default:
				table = "currency";
				startDate.setHours(0, 0, 0, 0);
		}

		const url = `https://mc010i3rae.execute-api.eu-central-1.amazonaws.com/prod/exchange?before_date=${formatDate(endDate)}&after_date=${formatDate(startDate)}
		&table_name=${table}&currency{currency}`;

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
