import converters from 'dynamo-converters';

const awsKey = 'n2ZKFrQL5Z5YNKb3tio4j4vtwPUVTrOi7hTveQnJ';


function formatDate(date) {
	return date.toISOString();
}

function getMonday(d) {
	d = new Date(d);
	let day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	return new Date(d.setDate(diff));
}



export default {
	update(range) {
		let startDate, endDate;
		switch (range){
			case "day":
				startDate = new Date();
				startDate.setHours(0,0,0,0);
				endDate = new Date();
				break;
			case "week":
				startDate = getMonday(new Date());
				endDate = new Date();
				endDate.setDate(startDate.getDate()+6);
				break;
			case "month":
				startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
				endDate = new Date();
				break;
			case "year":
				startDate = new Date(new Date().getFullYear(), 0, 1);
				endDate = new Date();
				break;
			default:
				startDate = new Date();
				startDate.setHours(0,0,0,0);
				endDate = new Date();

		}
		const url = `https://mc010i3rae.execute-api.eu-central-1.amazonaws.com/prod/exchange?before_date=${formatDate(endDate)}&after_date=${formatDate(startDate)}
		&range=${range}`;
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
