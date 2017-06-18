import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './chart';
import providers from './providers/index';
import styles from './styles/main.sass'

class Popup extends React.Component {
	constructor(props) {
		super(props);

		this._onCursorPositionChanged = this._onCursorPositionChanged.bind(this);

		this.state = {
			usd: [],
			eur: [],
			cursorPosition: 0
		};
		this._onToolbarClick = this._onToolbarClick.bind(this);
	}

	_onCursorPositionChanged(value) {
		/*this.setState({
		 cursorPosition: value
		 });*/
	}

	_onToolbarClick(type){
		providers.aws.update(type).then(data => {
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


		providers.aws.update("day")
			.then(data => {
				this.setState({
					usd: data.usd,
					eur: data.eur
				});
			});
	}

	render() {
		return (
			<div>
				<div className="toolbar">
					<div onClick={ this._onToolbarClick.bind('day') }>Day</div>
					<div onClick={ this._onToolbarClick.bind('week') }>Week</div>
					<div onClick={ this._onToolbarClick.bind('month') }>Month</div>
					<div onClick={ this._onToolbarClick.bind('year') }>Year</div>
				</div>
				<Chart
					title="USD"
					values={ this.state.usd }
					cursorPosition={ this.state.cursorPosition }
					onCursorPositionChanged={ this._onCursorPositionChanged }
				/>
				<Chart
					title="EUR"
					values={ this.state.eur }
					cursorPosition={ this.state.cursorPosition }
					onCursorPositionChanged={ this._onCursorPositionChanged }
				/>
			</div>
		);
	}
}


ReactDOM.render(
	<Popup/>,
	document.getElementById('app')
);
