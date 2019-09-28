const should = require("chai").should();
const parallel = require("../_default");

const testTasks = require("./testdata.fivetasks");
const testTasksFail = require("./testdata.fivetasksfail");

describe("testing default parallel callback api", () => {
	it("should fullfill five tasks in parallel and return 12345", done => {
		parallel(testTasks, (err, result) => {
			result.join("").should.equal("12345");
			done();
		});
	});
	it("should fullfill five tasks in parallel in correct time", done => {
		const start = Date.now();
		parallel(testTasks, (err, result) => {
			const end = Date.now() - start;

			end.should.be.greaterThan(199);
			end.should.be.lessThan(250);
			done();
		});
	});
	it("should fail when one task rejects", done => {
		parallel(testTasksFail, (err, result) => {
			err.should.be.instanceOf(Error);
			done();
		});
	});
});
