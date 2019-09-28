module.exports = (executor, timeout, onTimeout) => {
	let t;
	return Promise.race([
		new Promise(executor),
		new Promise((resolve, reject) => {
			t = setTimeout(() => {
				reject(new Error("timeout"));
				if (onTimeout && typeof onTimeout === "function") onTimeout();
			}, timeout);
		}),
	]).then(
		result => {
			clearTimeout(t);
			return Promise.resolve(result);
		},
		err => {
			clearTimeout(t);
			return Promise.reject(err);
		}
	);
};

module.exports.withNull = (executor, timeout, onTimeout) => {
	let t;
	return Promise.race([
		new Promise(executor),
		new Promise(resolve => {
			t = setTimeout(() => {
				resolve(null);
				if (onTimeout && typeof onTimeout === "function") onTimeout();
			}, timeout);
		}),
	]).then(
		result => {
			clearTimeout(t);
			return Promise.resolve(result);
		},
		err => {
			clearTimeout(t);
			return Promise.reject(err);
		}
	);
};
