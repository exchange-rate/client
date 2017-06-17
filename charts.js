let data = [
	67.869,
	67.924,
	67.899,
	67.88,
	67.892,
	67.848,
	67.82,
	67.797,
	67.622,
	67.503,
	67.66,
	67.555,
	67.568,
	67.595,
	67.365,
	67.311,
	67.27,
	67.295,
	67.337,
	67.295,
	67.385,
	67.395,
	67.349,
	67.478,
	67.52,
	67.426,
	67.412,
	67.484,
	67.45,
	67.48,
	67.552,
	67.545,
	67.515,
	67.516,
	67.495,
	67.524,
	67.527,
	67.408,
	67.373,
	67.379,
	67.364,
	67.377
];

//const MIN_HEIGHT = 20;

let minData = Math.min(...data);
let maxData = Math.max(...data);

let chart = d3.select('.chart');

let bar = chart
	.selectAll('div')
	.data(data)
	.enter()
	.append('div')
	.style('height', dataIndex => {
		return `${(dataIndex - minData) / (maxData - minData) * 80 + 20}%`;
	});

bar
	.append('span')
	.text(dataItem => dataItem);

	/*.selectAll('div')
	.data([4, 8, 15, 16, 23, 42])
	.enter()
	.append('div')
	.text(dataItem => dataItem)
	.exit();*/
