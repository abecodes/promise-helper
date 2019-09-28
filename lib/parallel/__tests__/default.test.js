const should = require("chai").should();
const parallel = require("../_default");

const testTasks = require("./testdata.fivetasks");
const testTasksFail = require("./testdata.fivetasksfail");

describe("testing default parallel", () => {
	it("should fullfill five tasks in parallel and return 12345", async () => {
		try {
			const result = await parallel(testTasks);
			result.join("").should.equal("12345");
		} catch (error) {
			throw error;
		}
	});
	it("should fullfill five tasks in parallel in correct time", async () => {
		try {
			const start = Date.now();
			await parallel(testTasks);
			const end = Date.now() - start;

			end.should.be.greaterThan(199);
		} catch (error) {
			throw error;
		}
	});
	it("should fail when one task rejects", async () => {
		try {
			await parallel(testTasksFail);
		} catch (error) {
			error.should.be.instanceOf(Error);
		}
	});
});
