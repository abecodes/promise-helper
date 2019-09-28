const should = require("chai").should();
const sequence = require("../_default");

const testTasks = require("./testdata.threetasks");
const testTasksFail = require("./testdata.fourtasksfail");

describe("testing default sequence callback api", () => {
	it("should fullfill three tasks in sequence and return hello world", done => {
		sequence(testTasks, (err, result) => {
			result.join(" ").should.equal("Hello World");
			done();
		});
	});

	it("should fullfill three tasks in sequence in correct time", done => {
		const start = Date.now();
		sequence(testTasks, (err, result) => {
			const end = Date.now() - start;

			(399 < end < 450).should.be.equal(true);
			done();
		});
	});
	it("should fail when one task rejects", done => {
		sequence(testTasksFail, (err, result) => {
			(err.message === "oO" && result.join(" ") === "Hello World").should.equal(
				true
			);
			done();
		});
	});
	it("should return the previous results when one task rejects", done => {
		sequence(testTasksFail, (err, result) => {
			result.join(" ").should.equal("Hello World");
			done();
		});
	});
});
