const ratio = window.devicePixelRatio || 1;
const defaultTextSize = 10;
const fontWeight = 'bold';
const fontFamily = 'Verdana';
const canvasWidth = 19;
const canvasHeight = 19;
const colors = {
	DEFAULT: 'black',
	COURSE_UP: '#008d45',
	COURSE_DOWN: '#d0021b'
};

function shortenPrice(price) {
	return price.toString().substring(0, 4);
}

function setCourseColor(newCourse, oldCourse) {
	if (newCourse > oldCourse) {
		return colors.COURSE_UP;
		/*} else if (newCourse === oldCourse) {
		 return colors.DEFAULT;*/
	} else {
		return colors.COURSE_DOWN;
	}
}

let canvas = document.createElement('canvas');
canvas.width = canvasWidth * ratio;
canvas.height = canvasHeight * ratio;

let ctx = canvas.getContext('2d');
ctx.scale(ratio, ratio);

let lastValues = null;

function update(values) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = `${fontWeight} ${defaultTextSize}px ${fontFamily}`;
	let textWidths = Object.keys(values).map(key => ctx.measureText(shortenPrice(values[key])).width);
	let longestTextWidth = Math.max(...textWidths);
	let textSize = defaultTextSize * canvasWidth / longestTextWidth;
	ctx.font = `${fontWeight} ${textSize}px ${fontFamily}`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = lastValues ? setCourseColor(values.usd, lastValues.usd) : colors.DEFAULT;
	ctx.fillText(shortenPrice(values.usd), canvasWidth / 2, textSize / 2);
	ctx.fillStyle = lastValues ? setCourseColor(values.eur, lastValues.eur) : colors.DEFAULT;
	ctx.fillText(shortenPrice(values.eur), canvasWidth / 2, canvasHeight - textSize / 2);

	chrome.browserAction.setIcon({
		imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
	});

	chrome.browserAction.setTitle({
		title: [
			`USD — ${values.usd}`,
			`EUR — ${values.eur}`,
			'Кликните для показа динамики'
		].join('\n')
	});

	lastValues = values;
}

export default {
	update
};

