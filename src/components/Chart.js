import { last, fromRange } from '../utils/array';
import { convertToSvgPoints as toSvgPoints } from '../utils/svg';
import React from 'react';
import './Chart.sass';

const chartWidth = 360;
const chartHeight = 120;

const minYLegendStep = 10;

const initialState = {
	hover: false,
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
			hover: true,
			cursor: e.pageX - this.svgEl.getBoundingClientRect().left
		});
	}

	_onOut() {
		this.setState(initialState)
	}

	renderYLegend(minValue, maxValue) {
		const stepsCount = 5;

		return fromRange(0, stepsCount, i => {
			const value = (maxValue - i * (maxValue - minValue) / stepsCount).toFixed(2);
			const y = i * chartHeight / (stepsCount - 1);
			let alignment = 'central';
			if (i === 0) {
				alignment = 'text-before-edge';
			}
			if (i === stepsCount - 1) {
				alignment = 'text-after-edge';
			}

			return (
				<g key={ i }>
					<line x1="0" y1={ y } x2={ chartWidth } y2={ y } className="chart__grid"/>
					<text x="0" y={ y } textAnchor="start" dominantBaseline={ alignment } className="chart__label">
						{ value }
					</text>
					<text x={ chartWidth } y={ y } textAnchor="end" dominantBaseline={ alignment } className="chart__label">
						{ value }
					</text>
				</g>
			);
		});
	}

	render() {
		const { title, values } = this.props;

		if (values.length === 0) {
			return null;
		}

		// const yGridStep = .1;
		const xStep = chartWidth / (values.length - 1);
		const yValues = this.props.values.map(value => value.value);
		const minYValue = Math.min(...yValues);
		const maxYValue = Math.max(...yValues);
		// const yGridValues = fromRange(Math.ceil(minYValue / yGridStep) * yGridStep, maxYValue, i => i + yGridStep);

		const points = values.map((value, i) => ({
			x: i * xStep,
			y: minYValue === 0 && maxYValue === 0 ? 0 : chartHeight - (value.value - minYValue) / (maxYValue - minYValue) * chartHeight
		}));

		return (
			<div className="chart">
				<div className="chart__header">
					<div className="chart__title">{ title }</div>
					<div className="chart__currency-value" style={{ opacity: this.state.hover ? 0 : 1 }}>
						{ last(values).value }
					</div>
				</div>
				<svg
					ref={ el => this.svgEl = el }
					width={ chartWidth }
					height={ chartHeight }
					onMouseMove={ this._onMove }
					onMouseOut={ this._onOut }
					className="chart__body"
				>
					{ this.state.hover && (
						<line
							x1="0"
							y1="0"
							x2="0"
							y2={ chartHeight }
							className="chart__cursor-line"
							style={{ transform: `translateX(${this.state.cursor}px)` }}
						/>
					)}

					<polyline points={ toSvgPoints(points) } className="chart__line" />

					{ this.renderYLegend(minYValue, maxYValue) }
				</svg>
			</div>
		);
	}

}
