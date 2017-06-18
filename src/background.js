import providers from './providers/index';
import icon from './icon';

// const startTimeout = .1 * 60 * 1000; //15000;
const okIntervalTime = 15 * 60 * 1000;
const errorIntervalTime = 30 * 60 * 1000;

function updateIcon(values) {
	// console.log('values', values);
	icon.update({
		usd: values.usd[values.usd.length - 1].value,
		eur: values.eur[values.eur.length - 1].value
	});
}

chrome.storage.local.get(data => {
	// console.log('get', data);
	if (data.currencyList) {
		updateIcon(data.currencyList);
	}
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	// console.log('changed', changes);
	if (changes.currencyList && changes.currencyList.newValue && namespace === 'local') {
		updateIcon(changes.currencyList.newValue);
	}
});

setTimeout(function interval() {
	providers.aws.update()
		.then(data => {
			data.usd.forEach(item => {
				item.date = Number(item.date);
			});
			data.eur.forEach(item => {
				item.date = Number(item.date);
			});
			chrome.storage.local.set({ currencyList: data }, () => {
				console.log('saved');
			});
			setTimeout(interval, okIntervalTime);
		})
		.catch(() => {
			setTimeout(interval, errorIntervalTime);
		});
}, 2000);
