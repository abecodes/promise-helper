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
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error("oO"));
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("should not end here");
			}, 200);
		}),
];
