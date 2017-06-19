export default (methods, thisContext) => {
	methods.forEach(method => {
		method = method.bind(thisContext);
	});
};
