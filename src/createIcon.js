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

/**
 * @param { {value: Number, type: 'COURSE_UP'|'COURSE_DOWN'}[] } values
 * @returns {ImageData}
 */
export default values => {
	const canvas = document.createElement('canvas');

	canvas.width = canvasWidth * ratio;
	canvas.height = canvasHeight * ratio;

	const ctx = canvas.getContext('2d');

	ctx.scale(ratio, ratio);
	ctx.font = `${fontWeight} ${defaultTextSize}px ${fontFamily}`;

	const textWidths = values.map(value => ctx.measureText(shortenPrice(value.value)).width);
	const longestTextWidth = Math.max(...textWidths);
	const textSize = defaultTextSize * canvasWidth / longestTextWidth;

	ctx.font = `${fontWeight} ${textSize}px ${fontFamily}`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = values[0].type === 'COURSE_UP' ? colors.COURSE_UP : colors.COURSE_DOWN;
	ctx.fillText(shortenPrice(values[0].value), canvasWidth / 2, textSize / 2);
	ctx.fillStyle = values[1].type === 'COURSE_UP' ? colors.COURSE_UP : colors.COURSE_DOWN;
	ctx.fillText(shortenPrice(values[1].value), canvasWidth / 2, canvasHeight - textSize / 2);

	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
