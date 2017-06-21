import { last, fromRange } from '../utils/array';
import { convertToSvgPoints as toSvgPoints } from '../utils/svg';
import React from 'react';
import './Chart.sass';

const chartWidth = 360;
const chartHeight = 120;

const initialState = {
	showCurrencyTitleValue: true,
	cursor: 0
};

export default class extends React.Component {
	constructor(props) {
		super(props);

		this._onMove = this._onMove.bind(this);
		this._onOut = this._onOut.bind(this);

		this.state = initialState;
	}

	_onMove(e) {
		this.setState({
			showCurrencyTitleValue: false,
			cursor: e.pageX - this.svgEl.getBoundingClientRect().left
		});
	}

	_onOut() {
		this.setState(initialState)
	}

	render() {
		const { title, values } = this.props;

		if (values.length === 0) {
			return null;
		}

		const lastValue = last(values);
		const xStep = chartWidth / (values.length - 1);
		const valueNumbers = this.props.values.map(value => value.value);
		const minValue = Math.min(...valueNumbers);
		const maxValue = Math.max(...valueNumbers);
		const yGridStep = .1;
		const yGridValues = fromRange(Math.ceil(minValue / yGridStep) * yGridStep, maxValue, i => i + yGridStep);

		const points = values.map((value, i) => ({
			x: i * xStep,
			y: minValue === 0 && maxValue === 0 ? 0 : chartHeight - (value.value - minValue) / (maxValue - minValue) * chartHeight
		}));

		return (
			<div className="chart">
				<div className="chart__header">
					<div className="chart__title">{ title }</div>
					<div className="chart__currency-value" style={{ opacity: this.state.showCurrencyTitleValue ? 1 : 0 }}>{ lastValue.value }</div>
				</div>

				<svg
					width={ chartWidth }
					height={ chartHeight }
					onMouseMove={ this._onMove }
					onMouseOut={ this._onOut }
					className="chart__body"
					ref={ el => this.svgEl = el }
				>
					<line
						x1="0"
						y1="0"
						x2="0"
						y2={ chartHeight }
						className="chart__cursor-line"
						style={{ transform: `translateX(${this.state.cursor}px)` }}
					/>

					<polyline points={ toSvgPoints(points) } className="chart__line" />

					{ points.map(point => (
						<g key={ point.x + ':' + point.y }>
							<text x="0" y={ point.y } textAnchor="start" className="chart__labels">
								{ point.y.toFixed(2) }
							</text>
							<text x={ chartWidth } y={ point.y } textAnchor="end" className="chart__labels">
								{ point.y.toFixed(2) }
							</text>
						</g>
					)) }
				</svg>

			</div>
		)
	}

}
