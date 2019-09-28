const should = require("chai").should();
const timeoutPromise = require("../index");

describe("testing timeout promise", () => {
	it("should fullfill in time", async () => {
		try {
			const result = await timeoutPromise(resolve => {
				setTimeout(() => resolve("resolved"), 200);
			}, 200);
			result.should.equal("resolved");
		} catch (error) {
			throw error;
		}
	});

	it("should fail to fullfill time", async () => {
		try {
			await timeoutPromise(resolve => {
				setTimeout(() => resolve("resolved"), 200);
			}, 100);
		} catch (error) {
			error.should.include({ message: "timeout" });
		}
	});

	it("should reject in time", async () => {
		try {
			await timeoutPromise((resolve, reject) => {
				setTimeout(() => reject(new Error("rejected")), 200);
			}, 200);
		} catch (error) {
			error.should.include({ message: "rejected" });
		}
	});

	it("should pass reject down the chain", done => {
		timeoutPromise((resolve, reject) => {
			setTimeout(() => reject(new Error("rejected")), 200);
		}, 200).catch(error => {
			error.should.include({ message: "rejected" });
			done();
		});
	});

	it("should fail to reject in time", async () => {
		try {
			await timeoutPromise((resolve, reject) => {
				setTimeout(() => reject(new Error("rejected")), 200);
			}, 100);
		} catch (error) {
			error.should.include({ message: "timeout" });
		}
	});

	it("should call callback after timeout", async () => {
		let callbackCalled = false;
		try {
			await timeoutPromise(
				resolve => {
					setTimeout(() => resolve("resolved"), 200);
				},
				100,
				() => {
					callbackCalled = true;
				}
			);
		} catch (error) {
			callbackCalled.should.equal(true);
		}
	});

	it("should fullfill in with null", async () => {
		try {
			const result = await timeoutPromise.withNull(resolve => {
				setTimeout(() => resolve("resolved"), 200);
			}, 100);
			(result === null).should.equal(true);
		} catch (error) {
			throw error;
		}
	});

	it("with null should reject in time", async () => {
		try {
			await timeoutPromise.withNull((resolve, reject) => {
				setTimeout(() => reject(new Error("rejected")), 200);
			}, 200);
		} catch (error) {
			error.should.include({ message: "rejected" });
		}
	});

	it("with null should call callback", async () => {
		let callbackCalled = false;
		try {
			const result = await timeoutPromise.withNull(
				resolve => {
					setTimeout(() => resolve("resolved"), 200);
				},
				100,
				() => {
					callbackCalled = true;
				}
			);
			callbackCalled.should.equal(true);
		} catch (error) {
			throw error;
		}
	});
});
