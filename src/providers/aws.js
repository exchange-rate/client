import converters from 'dynamo-converters';

const awsKey = 'n2ZKFrQL5Z5YNKb3tio4j4vtwPUVTrOi7hTveQnJ';
const startDate = new Date(2017, 4, 12);
const endDate = new Date(2017, 4, 9);

function formatDate(date) {
	return date.toISOString().slice(0, 10);
}

const url = `https://mc010i3rae.execute-api.eu-central-1.amazonaws.com/prod/exchange?before_date=${formatDate(startDate)}&after_date=${formatDate(endDate)}`;
const request = new Request(url, {
	headers: new Headers({
		'x-api-key': awsKey
	})
});

export default {
	update() {
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
