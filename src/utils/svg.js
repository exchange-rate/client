export function convertToSvgPoints(points) {
	return points.length > 0
		? points.map(point => point.x + ',' + point.y).join(' ')
		: '0,0';
}
