module.exports = function(taskArray, cb) {
	return new Promise((resolve, reject) => {
		process.nextTick(() => {
			let result = [];
			const promise = taskArray.reduce(
				(prev, curr, i, arr) =>
					prev.then(
						res => {
							if (res) result.push(res);
							return curr();
						},
						err => {
							arr.splice(i);
							return Promise.reject(err);
						}
					),
				Promise.resolve()
			);
			promise
				.then(res => {
					if (res) result.push(res);
					if (typeof cb === "function") {
						cb(null, result);
					}
					return resolve(result);
				})
				.catch(err => {
					if (typeof cb === "function") {
						resolve(null);
						return cb(err, result);
					}
					err.result = result;
					return reject(err);
				});
		});
	});
};
