import React from 'react';
import { Button, ButtonGroup } from './ButtonGroup';
import Chart from './Chart';
import providers from '../providers/index';
import './Popup.sass';

const exchangePairs = {
	'USD': ['RUR', 'UAH'],
	'EUR': ['RUR', 'UAH']
};

export default class extends React.Component {
	constructor(props) {
		super(props);

		this._onRangeChange = this._onRangeChange.bind(this);

		this.state = {
			usd: [],
			eur: [],
			rangeType: null
		};
	}

	_openSettings() {
		chrome.runtime.openOptionsPage();
	}

	_onRangeChange(type){
		providers.rbc.getDetailed(type).then(data => {
			this.setState({
				usd: data.usd,
				eur: data.eur,
				rangeType: type
			});
		});
	}

	componentDidMount() {
		/*chrome.storage.local.get(data => {
		 if (data.currencyList) {
		 updateChart(data.currencyList);
		 }
		 });
		 chrome.storage.onChanged.addListener((changes, namespace) => {
		 if (changes.currencyList && changes.currencyList.newValue && namespace === 'local') {
		 updateChart(changes.currencyList.newValue);
		 }
		 });*/

		providers.rbc.getDetailed('day').then(data => {
			this.setState({
				usd: data.usd,
				eur: data.eur,
				rangeType: 'day'
			});
		});
	}

	render() {
		return (
			<div className="popup">
				<div className="popup__toolbar">
					<div className="popup__range-group">
						<ButtonGroup selected={ this.state.rangeType } onSelect={ this._onRangeChange }>
							<Button value="day">За день</Button>
							<Button value="week">неделю</Button>
							<Button value="month">месяц</Button>
							<Button value="year">год</Button>
						</ButtonGroup>
					</div>
					<button onClick={ e => this._openSettings() } className="settings">Настройки</button>
				</div>
				<div className="popup__body">
					<Chart title="USD" values={ this.state.usd } />
					<Chart title="EUR" values={ this.state.eur } />
				</div>
			</div>
		);
	}
}
