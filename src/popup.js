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
		this._onToolbarClick = this._onToolbarClick(this);
	}

	_onCursorPositionChanged(value) {
		/*this.setState({
		 cursorPosition: value
		 });*/
	}

	_onToolbarClick(e){
		console.log(e.target);
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


		providers.aws.update()
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
					<div data-range="day" onClick={this._onToolbarClick}>Day</div>
					<div  data-range="month" onClick={this._onToolbarClick}>Month</div>
					<div  data-range="year" onClick={this._onToolbarClick}>Year</div>
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
