module.exports = [
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("1");
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("2");
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error("3"));
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("4");
			}, 200);
		}),
	() =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("5");
			}, 200);
		}),
];
