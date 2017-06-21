export function pad(num, len) {
	return '0'.repeat(len - num.toString().length) + num;
}
