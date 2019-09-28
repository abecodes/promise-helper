const Queue = require("./_queue");

module.exports = function(taskArray, limit) {
	const q = new Queue(limit);
	taskArray.map(task => q.pushTask(task));
};
