const sequence = require("./_default");

function _getRandomRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min + 1)) + min;
}

module.exports = function(taskArray, minTime, maxTime, cb) {
	const newTaskArray = [];
	taskArray.map((val, i) => {
		newTaskArray.push(val);
		if (i !== taskArray.length - 1) {
			newTaskArray.push(
				() =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
						}, _getRandomRange(minTime, maxTime));
					})
			);
		}
	});

	return sequence(newTaskArray, cb);
};
