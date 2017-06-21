export function last(arr) {
	return arr[arr.length - 1];
}

export function fromRange(start, end, cb) {
	return Array.from({ length: Math.abs(end - start) }, (_, i) => (
		cb(start + start < end ? i : -i))
	);
}
