module.exports = class TaskQueue {
	constructor(limit) {
		this.limit = limit;
		this.running = 0;
		this.queue = [];
	}

	pushTask(task) {
		this.queue.push(task);
		process.nextTick(() => this.next());
	}

	next() {
		if (this.running === this.limit) return;
		if (this.queue.length) {
			const task = this.queue.shift();
			task().finally(() => {
				this.running--;
				this.next();
			});
			this.running++;
		}
	}
};
