import React from 'react';
import ReactDOM from 'react-dom';

const svgWidth = 400;
const svgHeight = 150;
const padding = 50;
const chartWidth = svgWidth - padding * 2;
const chartHeight = 101;

/*function createSVGPolyPoints(points) {
	let minData = Math.min(...points);
	let maxData = Math.max(...points);

	return points.map((point, i) => {
		let balancedPoint = ((point - minData) / (maxData - minData) * .6 + .2) * chartHeight;
		return `${i * chartWidth / (points.length - 1)}, ${balancedPoint}`;
	}).join(' ');
}*/

function pad(num, len) {
	return '0'.repeat(len - num.toString().length) + num;
}

function convertToSvgPoints(points) {
	if (points.length > 0) {
		return points
			.map((point, i) => `${ point.x },${ point.y }`)
			.join(' ');
	} else {
		return '0,0';
	}
}

/*function convertToSvgPoints(points, step) {
	// let step = chartWidth / (points.length - 1);
	return points
		.map((point, i) => (
			i === 0
				? `
					${ point.x },${ point.y } ${ point.x + step },${ point.y }
				`
				: `
					${ point.x },${ point.y } ${ point.x + step },${ point.y }
				`
		))
		.join(' ');
}*/

function getThresholds(data) {
	let values = Array.prototype.concat(
		...data.map(item =>
			item.values.map(value => value.value)
		)
	);

	return {
		min: Math.min(...values),
		max: Math.max(...values)
	}
}

function createPoints(data) {
	let allValues = Array.prototype.concat(...data.map(item => item.values));
	let min = Math.min(...allValues);
	let max = Math.max(...allValues);

	return data.map(item =>
		item.values.map(value =>
			(value - min) / (max - min)
		)
	);
}

function createPixelPoints(points) {
	let minData = Math.min(...points);
	let maxData = Math.max(...points);

	return points
		.map((point, i) => ((point - minData) / (maxData - minData)) * chartHeight);
}

function createSVGPolyPoints(points) {
	let minData = Math.min(...points);
	let maxData = Math.max(...points);

	return points
		.map((point, i) => {
			let balancedPoint = ((point - minData) / (maxData - minData)) * chartHeight;
			return `${i * chartWidth / (points.length - 1)}, ${balancedPoint}`;
		})
		.join(' ');

	/*return points.map((point, i) => {
		let balancedPoint = ((point - minData) / (maxData - minData) * .6 + .2) * chartHeight;
		return `${i * chartWidth / (points.length - 1)}, ${balancedPoint}`;
	}).join(' ');*/
}

const colors = [
	'#00cd8e',
	'#0070cc'
];

export default class Chart extends React.Component {
	constructor(props) {
		super(props);

		this._onMove = this._onMove.bind(this);
		this._onOut = this._onOut.bind(this);

		this.state = {
			minValue: 0,
			maxValue: 0,
			cursorPosition: this.props.cursorPosition || 0,
			cursorDefaultPosition: this.props.cursorPosition || 0,
			pointsLength: 0
		};
	}

	componentDidMount() {
		this.cover.addEventListener('mousemove', this._onMove);
		this.cover.addEventListener('mouseout', this._onOut);
	}

	componentWillUnmount() {
		this.cover.removeEventListener('mousemove', this._onMove);
		this.cover.removeEventListener('mouseout', this._onOut);
	}

	componentWillReceiveProps(props) {
		// console.log(props);

		/*props.data
		createPixelPoints*/

		// let thresholds = getThresholds(props.data);

		if (props.cursorPosition !== this.state.cursorPosition) {
			this.setState({
				cursorPosition: props.cursorPosition,
				cursorDefaultPosition: props.cursorPosition
			});
		}

		this.setState({
			/*minValue: thresholds.min,
			maxValue: thresholds.max,*/
			pointsLength: props.values.length
		});
		// this.props.data[0].points.length
	}

	_onMove(e) {
		let segmentSize = chartWidth / (this.props.values.length - 1);
		let cursorPosition = Math.floor((e.pageX - this.cover.getBoundingClientRect().left) / segmentSize);

		if (this.state.cursorPosition !== cursorPosition) {
			this.setState({
				cursorPosition: cursorPosition
			});
			if (this.props.onCursorPositionChanged) {
				this.props.onCursorPositionChanged(cursorPosition);
			}
		}
	}

	_onOut() {
		this.setState({
			cursorPosition: this.state.cursorDefaultPosition
		});

		if (this.props.onCursorPositionChanged) {
			this.props.onCursorPositionChanged(this.state.cursorDefaultPosition);
		}
	}

	_yValueToPoint(value) {
		const values = this.props.values.length > 0 ? this.props.values.map(value => value.value) : [];
		const minValue = values.length > 0 ? Math.min(...values) : 0;
		const maxValue = values.length > 0 ? Math.max(...values) : 0;

		if (minValue === 0 && maxValue === 0) {
			return 0;
		}

		return chartHeight - (value - minValue) / (maxValue - minValue) * chartHeight;
	}

	render() {
		const xStep = chartWidth / (this.state.pointsLength - 1);
		const cursorPosition = this.state.cursorPosition / (this.state.pointsLength - 1) * chartWidth;
		const yGridStep = .1;

		const values = this.props.values.length > 0 ? this.props.values.map(value => value.value) : [];
		const minValue = values.length > 0 ? Math.min(...values) : 0;
		const maxValue = values.length > 0 ? Math.max(...values) : 0;

		const yGridValues = (() => {
			let result = [];
			let min = Math.ceil(minValue / yGridStep) * yGridStep;

			for (let i = min; i <= maxValue; i += yGridStep) {
				result.push(i);
			}

			return result;
		})();

		const points = this.props.values.map((value, i) => ({
			x: i * xStep,
			y: this._yValueToPoint(value.value)
		}));

		const date = this.props.values.length > 0 && this.props.values[this.state.cursorPosition].date;
		const time = date ? (
			date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
			+ ', '
			+ date.getHours()
			+ ':'
			+ pad(date.getMinutes(), 2)
		) : '';

		/*<pattern id="lines" x="0" y="0" width="1" height="20" patternUnits="userSpaceOnUse">
			<line
				x1="0"
				y1="20"
				x2="100%"
				y2="20"
				stroke="#d4d4d4"
				strokeWidth="1"
				/>
		</pattern>

		 <rect width={ chartWidth } height={ chartHeight } fill="url(#lines)"/>

		*/

		return (
			<div className="chart-block">
				<div className="chart">

					<svg width={ svgWidth } height={ svgHeight }>
						<defs>
							<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="rgba(0, 205, 142, 1)"/>
								<stop offset="100%" stopColor="rgba(0, 205, 142, 0)" stopOpacity="0"/>
							</linearGradient>
						</defs>

						<g transform={ `translate(${ padding })` }>
							<foreignObject y="5" style={{ transform: `translate(${ cursorPosition - 50 }px)` }} width="100" height="50">
								<div className="chart-block__title" xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center' }}>
									<div>
										<span style={{ fontWeight: 'bold' }}>{ this.props.title }</span>
										&nbsp;
										<span>{ this.props.values[this.state.cursorPosition] ? this.props.values[this.state.cursorPosition].value : '' }</span>
									</div>
									<div style={{ fontSize: '10px', color: 'rgb(255, 36, 0)' }}>
										{ time }
									</div>
								</div>
							</foreignObject>
						</g>

						<g transform="translate(0 40)">
							<g>
								{
									yGridValues.map(value => {
										let point = this._yValueToPoint(value);
										return (
											<text key={ point } x="15" y={ point } fontSize="10" dominantBaseline="central" fill="rgba(0, 0, 0, .4)">
												{ value.toFixed(2) }
											</text>
										);
									})
								}
							</g>

							<g transform={ `translate(${ padding })` }>

								<rect
									x="0"
									y="0"
									width={ chartWidth }
									height={ chartHeight }
									fill="rgba(100, 255, 100, .15)"
								/>

								{
									yGridValues.map(value => {
										let point = this._yValueToPoint(value);
										return (
											<line
												key={ point }
												x1="0"
												y1={ point }
												x2={ chartWidth }
												y2={ point }
												stroke="rgba(0, 0, 0, .3)"
												strokeWidth="1"
												strokeDasharray="1, 3"
											/>
										);
									})
								}

								<line
									x1="0"
									y1="0"
									x2="0"
									y2={ chartHeight }
									stroke="#ff2400"
									strokeWidth="1"
									style={{ transform: `translateX(${cursorPosition}px)` }}
								/>

								<polygon
									fill="url(#gradient)"
									stroke="none"
									strokeLinejoin="round"
									strokeLinecap="round"
									points={ `0 ${chartHeight}, ${convertToSvgPoints(points)}, ${chartWidth} ${chartHeight}` }
									opacity="0.2"
								/>

								<polyline
									fill="none"
									stroke="#00cd8e"
									strokeWidth="2"
									strokeLinejoin="round"
									strokeLinecap="round"
									points={ convertToSvgPoints(points) }
								/>

								<circle
									cx={ points[this.state.cursorPosition] ? points[this.state.cursorPosition].x : 0 }
									cy={ points[this.state.cursorPosition] ? points[this.state.cursorPosition].y : 0 }
									r="4"
									fill="#ff2400"
								/>

								<rect
									width={ chartWidth }
									height={ chartHeight }
									fill="transparent"
									ref={ el => this.cover = el }
								/>

							</g>
						</g>



					</svg>
				</div>
			</div>
		);
	}
}
