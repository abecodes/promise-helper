const should = require("chai").should();
const sequence = require("../_sleep");

const testTasks = require("./testdata.threetasks");

describe("testing sequence with sleep", () => {
	it("should fullfill three tasks in sequence and sleep inbetween", async () => {
		try {
			const start = Date.now();
			await sequence(testTasks, 200);
			const end = Date.now() - start;

			end.should.be.greaterThan(999);
		} catch (error) {
			throw error;
		}
	});
});
