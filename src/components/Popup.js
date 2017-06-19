import React from 'react';
import Chart from './Chart';
import providers from '../providers/index';
import './Popup.sass';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this._onCursorPositionChanged = this._onCursorPositionChanged.bind(this);

		this.state = {
			usd: [],
			eur: [],
			cursorPosition: 0
		};
		this._onRangeChange = this._onRangeChange.bind(this);
	}

	_onCursorPositionChanged(value) {
		/*this.setState({
		 cursorPosition: value
		 });*/
	}

	_openSettings() {
		chrome.runtime.openOptionsPage();
	}

	_onRangeChange(type){
		console.log(1, type);

		providers.rbc.getDetailed(type).then(data => {
			this.setState({
				usd: data.usd,
				eur: data.eur
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

		providers.rbc.getDetailed("day").then(data => {
			this.setState({
				usd: data.usd,
				eur: data.eur
			});
		});
	}

	render() {
		return (
			<div className="popup">
				<div className="popup__toolbar">
					<div className="popup__range-group">
						<button className="_selected" onClick={ e => this._onRangeChange('day') }>За день</button>
						<button onClick={ e => this._onRangeChange('week') }>неделю</button>
						<button onClick={ e => this._onRangeChange('month') }>месяц</button>
						<button onClick={ e => this._onRangeChange('year') }>год</button>
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
