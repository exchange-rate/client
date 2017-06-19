import { last } from '../utils/array';
import { convertToSvgPoints as toSvgPoints } from '../utils/svg';
import React from 'react';
import bindMethods from '../utils/bind-methods';
import './Chart.sass';

const chartWidth = 360;
const chartHeight = 120;

const initialState = {
	cursor: 0
};

export default class extends React.Component {

	constructor(props) {
		super(props);

		this._onMove = this._onMove.bind(this);
		this._onOut = this._onOut.bind(this);

		this.state = initialState;
	}

	_yValueToPoint(value) {
		const values = this.props.values.map(value => value.value);
		const minValue = Math.min(...values);
		const maxValue = Math.max(...values);

		if (minValue === 0 && maxValue === 0) {
			return 0;
		}

		return chartHeight - (value - minValue) / (maxValue - minValue) * chartHeight;
	}

	_onMove(e) {
		this.setState({
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
		const points = values.map((value, i) => ({
			x: i * xStep,
			y: this._yValueToPoint(value.value)
		}));

		return (
			<div className="chart">
				<div className="chart__header">
					<div className="chart__title">{ title }</div>
					<div className="chart__currency-value">{ lastValue.value }</div>
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
				</svg>

			</div>
		)
	}

}
