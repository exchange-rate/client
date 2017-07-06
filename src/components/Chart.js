import { last, fromRange } from '../utils/array';
import { pad } from '../utils/number';
import { convertToSvgPoints as toSvgPoints } from '../utils/svg';
import React from 'react';
import './Chart.sass';

const chartWidth = 360;
const chartHeight = 120;
const currencyTextSize = 10;

const lineWidth = 2;
const svgWidth = chartWidth + lineWidth;
const svgHeight = chartHeight + currencyTextSize;

function formatDate(date) {
	const day = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
	const hours = date.getHours();
	const minutes = pad(date.getMinutes(), 2);

	return `${day} ${hours}:${minutes}`;
}

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.bubbleEl = null;

		this._onOver = this._onOver.bind(this);
		this._onMove = this._onMove.bind(this);
		this._onOut = this._onOut.bind(this);

		this.state = {
			hover: false,
			cursor: 0
		};
	}

	_onOver() {
		this.setState({
			hover: true
		})
	}

	_onMove(e) {
		const xStep = chartWidth / (this.props.values.length - 1);
		const cursor = Math.round((e.pageX - this.svgEl.getBoundingClientRect().left) / xStep);

		if (this.state.cursor !== cursor) {
			this.setState({
				cursor
			});
		}
	}

	_onOut() {
		this.setState({
			hover: false,
			cursor: 0
		})
	}

	renderCurrencyComboBoxes() {
		return (
			<div className="chart__title">
				<select className="chart__combo-box">
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
				</select>
				<span className="chart__currency-splitter">/</span>
				<select className="chart__combo-box">
					<option value='RUR'>RUR</option>
					<option value='UAH'>UAH</option>
				</select>
			</div>
		)
	}

	renderYLegend(minValue, maxValue) {
		const stepsCount = 5;

		return fromRange(0, stepsCount, i => {
			const value = (maxValue - i * (maxValue - minValue) / stepsCount).toFixed(2);
			let y = i * chartHeight / (stepsCount - 1);

			return (
				<g key={ i }>
					<line x1="0" y1={ y } x2={ chartWidth } y2={ y } className="chart__grid"/>
					<text x="0" y={ y } textAnchor="start" fontSize={ currencyTextSize } className="chart__label">
						{ value }
					</text>
					<text x={ chartWidth } y={ y } textAnchor="end" fontSize={ currencyTextSize } className="chart__label">
						{ value }
					</text>
				</g>
			);
		});
	}

	renderCursor(points) {
		if (!this.state.hover) {
			return null;
		}

		const { x, y } = points[this.state.cursor];

		let bubbleWidth = 0;
		let bubbleHeight = 0;

		if (this.bubbleEl) {
			const boundingBox = this.bubbleEl.getBoundingClientRect();
			bubbleWidth = boundingBox.width;
			bubbleHeight = boundingBox.height;
		}

		const xPos = Math.max(10, Math.min(x - bubbleWidth / 2, chartWidth - bubbleWidth - 10));
		let yPos = 0;

		if (y < bubbleHeight) {
			yPos = y + 10;
		} else {
			yPos = y - bubbleHeight - 10;
		}

		return (
			<g>
				<line
					x1="0"
					y1="0"
					x2="0"
					y2={ chartHeight }
					className="chart__cursor-line"
					style={{ transform: `translateX(${x.toFixed(0)}px)` }}
				/>
				<circle
					cx={ x }
					cy={ y }
					className="chart__cursor-point"
					r="4"
				/>
				<foreignObject x={ xPos } y={ yPos } dominantBaseline="central" className="chart__bubble-cover" ref={ el => this.bubbleEl = el }>
					<div className="chart__bubble" xmlns="http://www.w3.org/1999/xhtml">
						<div className="chart__bubble-value">{ this.props.values[this.state.cursor].value }</div>
						<div className="chart__bubble-date">{ formatDate(this.props.values[this.state.cursor].date) }</div>
					</div>
				</foreignObject>
			</g>
		);
	}

	render() {
		const { values } = this.props;

		if (values.length === 0) {
			return null;
		}

		const xStep = chartWidth / (values.length - 1);
		const yValues = this.props.values.map(value => value.value);
		const minYValue = Math.min(...yValues);
		const maxYValue = Math.max(...yValues);
		const points = values.map((value, i) => ({
			x: i * xStep,
			y: minYValue === 0 && maxYValue === 0 ? 0 : chartHeight - (value.value - minYValue) / (maxYValue - minYValue) * chartHeight
		}));

		return (
			<div className="chart">
				<div className="chart__header">
					{ this.renderCurrencyComboBoxes() }
					<div className="chart__currency-value" style={{ opacity: this.state.hover ? 0 : 1 }}>
						{ last(values).value }
					</div>
				</div>
				<div className="chart__body">
					<svg
						ref={ el => this.svgEl = el }
						width={ svgWidth }
						height={ svgHeight }
						onMouseOver={ this._onOver }
						onMouseMove={ this._onMove }
						onMouseOut={ this._onOut }
						className="chart__body-svg"
					>
						<g style={{ transform: `translate(${lineWidth / 2}px, ${currencyTextSize / 2}px)` }}>
							<polyline points={ toSvgPoints(points) } className="chart__line" />
							{ this.renderYLegend(minYValue, maxYValue) }
							{ this.renderCursor(points) }
						</g>
					</svg>
				</div>
			</div>
		);
	}

}
