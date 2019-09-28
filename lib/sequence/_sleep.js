const sequence = require("./_default");

module.exports = function(taskArray, timeout, cb) {
	const newTaskArray = [];
	taskArray.map((val, i) => {
		newTaskArray.push(val);
		if (i !== taskArray.length - 1) {
			newTaskArray.push(
				() =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
						}, timeout);
					})
			);
		}
	});

	return sequence(newTaskArray, cb);
};
