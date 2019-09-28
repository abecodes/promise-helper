module.exports = [
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("Hello");
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("World");
			}, 200);
		}),
];
