import providers from './providers/index';
import createIcon from './createIcon';

// const startTimeout = .1 * 60 * 1000; //15000;
const successIntervalTime = 15 * 60 * 1000;
const errorIntervalTime = 30 * 60 * 1000;

function updateIcon(values) {
	const usdValue = values.usd[values.usd.length - 1].value;
	const usdPrevValue = values.usd[values.usd.length - 2].value;
	const eurValue = values.eur[values.eur.length - 1].value;
	const eurPrevValue = values.eur[values.eur.length - 2].value;

	const icon = createIcon([
		{ value: usdValue, type: usdValue > usdPrevValue ? 'COURSE_UP' : 'COURSE_DOWN' },
		{ value: eurValue, type: eurValue > eurPrevValue ? 'COURSE_UP' : 'COURSE_DOWN' }
	]);

	chrome.browserAction.setIcon({
		imageData: icon
	});

	chrome.browserAction.setTitle({
		title: [
			`USD — ${usdValue}`,
			`EUR — ${eurValue}`,
			'Кликните для показа динамики'
		].join('\n')
	});
}

chrome.storage.local.get(data => {
	if (data.currencyList) {
		updateIcon(data.currencyList);
	}
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (changes.currencyList && changes.currencyList.newValue && namespace === 'local') {
		updateIcon(changes.currencyList.newValue);
	}
});

setTimeout(function interval() {
	providers.rbc.getDetailed()
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
			setTimeout(interval, successIntervalTime);
		})
		.catch(() => {
			setTimeout(interval, errorIntervalTime);
		});
}, 2000);

