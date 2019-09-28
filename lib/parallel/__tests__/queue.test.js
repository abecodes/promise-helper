const should = require("chai").should();
const Queue = require("../_queue");

describe("testing parallel queue", () => {
	it("should fullfill five tasks in limited parallel and return an array containing 1 2 3 4 5", done => {
		let running = 0;
		const result = [];
		const q = new Queue(2);

		for (let i = 1; i < 6; i++) {
			q.pushTask(() =>
				new Promise((resolve, reject) => {
					running++;
					setTimeout(() => {
						resolve(i);
					}, 200);
				}).then(res => {
					result.push(res);
					if (--running === 0) {
						result.should.have.members([1, 2, 3, 4, 5]);
						done();
					}
				})
			);
		}
	});
	it("should fullfill five tasks in limited parallel in correct time", done => {
		let running = 0;
		const q = new Queue(2);
		const result = [];

		for (let i = 1; i < 6; i++) {
			q.pushTask(() =>
				new Promise((resolve, reject) => {
					running++;
					setTimeout(() => {
						resolve(i);
					}, 200);
				}).then(res => {
					result.push(res);
					if (--running === 0) {
						const end = Date.now() - start;
						end.should.be.greaterThan(199);
						end.should.be.lessThan(650);
						done();
					}
				})
			);
		}
		const start = Date.now();
	});
});
