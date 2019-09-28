const should = require("chai").should();
const sequence = require("../_default");

const testTasks = require("./testdata.threetasks");
const testTwoTasks = require("./testdata.twotasks");
const testTasksFail = require("./testdata.fourtasksfail");

describe("testing default sequence", () => {
	it("should fullfill two tasks in sequence and return hello world", async () => {
		try {
			const result = await sequence(testTwoTasks);
			result.join(" ").should.equal("Hello World");
		} catch (error) {
			throw error;
		}
	});

	it("should fullfill three tasks in sequence and return hello world", async () => {
		try {
			const result = await sequence(testTasks);
			result.join(" ").should.equal("Hello World");
		} catch (error) {
			throw error;
		}
	});

	it("should fullfill three tasks in sequence in correct time", async () => {
		try {
			const start = Date.now();
			await sequence(testTasks);
			const end = Date.now() - start;

			end.should.be.greaterThan(399);
		} catch (error) {
			throw error;
		}
	});
	it("should fail when one task rejects", async () => {
		try {
			await sequence(testTasksFail);
		} catch (error) {
			error.should.include({ message: "oO" });
		}
	});
	it("should return the previous results when one task rejects", async () => {
		try {
			await sequence(testTasksFail);
		} catch (error) {
			const result = error.result.join(" ");
			result.should.equal("Hello World");
		}
	});
});
