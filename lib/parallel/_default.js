module.exports = function(taskArray, cb) {
	return new Promise((resolve, reject) => {
		Promise.all(taskArray.map(task => task()))
			.then(result => {
				if (typeof cb === "function") {
					cb(null, result);
				}
				resolve(result);
			})
			.catch(err => {
				if (typeof cb === "function") {
					resolve();
					return cb(err, null);
				}
				reject(err);
			});
	});
};
