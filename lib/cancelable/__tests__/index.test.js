const cancelable = require("../index");

describe("testing cancelable promise", () => {
	it("should fullfill normally", async () => {
		try {
			const result = await cancelable((resolve, reject) => {
				setTimeout(() => resolve("resolved"), 200);
			});
			result.should.equal("resolved");
		} catch (error) {
			throw error;
		}
	});

	it("should reject normally", async () => {
		try {
			await cancelable((resolve, reject) => {
				setTimeout(() => reject(new Error("rejected")), 200);
			});
		} catch (error) {
			error.should.include({ message: "rejected" });
		}
	});

	it("should cancel with error", async () => {
		let t;
		let e;
		try {
			const p = cancelable((resolve, reject) => {
				t = setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(() => p.cancel(() => clearTimeout(t)), 200);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			await p;
		} catch (error) {
			clearTimeout(e);
			error.should.include({ message: "canceled" });
		}
	});

	it("should cancel with result of null", async () => {
		let t;
		let e;
		try {
			const p = cancelable((resolve, reject) => {
				t = setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(() => p.cancelWithNull(() => clearTimeout(t)), 200);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			const result = await p;
			clearTimeout(e);
			(result === null).should.equal(true);
		} catch (error) {
			throw error;
		}
	});

	it("should cancel with error and trigger cancel callback", async () => {
		let t;
		let e;
		let callBackCalled = false;
		try {
			const p = cancelable((resolve, reject) => {
				t = setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(
				() =>
					p.cancel(() => {
						clearTimeout(t);
						callBackCalled = true;
					}),
				200
			);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			await p;
		} catch (error) {
			clearTimeout(e);
			const msg = error.message;
			const result = msg === "canceled" && callBackCalled;
			result.should.equal(true);
		}
	});

	it("should cancel with error and not trigger cancel callback", async () => {
		let t;
		let e;
		let callBackCalled = false;
		try {
			const p = cancelable((resolve, reject) => {
				t = setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(() => p.cancel(true), 200);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			await p;
		} catch (error) {
			clearTimeout(e);
			clearTimeout(t);
			const msg = error.message;
			const result = msg === "canceled" && !callBackCalled;
			result.should.equal(true);
		}
	});

	it("should cancel with result of null and trigger cancel callback", async () => {
		let t;
		let e;
		let callBackCalled = false;
		try {
			const p = cancelable((resolve, reject) => {
				setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(
				() =>
					p.cancelWithNull(() => {
						clearTimeout(t);
						callBackCalled = true;
					}),
				200
			);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			let result = await p;
			clearTimeout(e);
			result = result === null && callBackCalled;
			result.should.equal(true);
		} catch (error) {
			throw error;
		}
	});

	it("should cancel with result of null and not trigger cancel callback", async () => {
		let t;
		let e;
		let callBackCalled = false;
		try {
			const p = cancelable((resolve, reject) => {
				t = setTimeout(() => resolve("resolved"), 1000);
			});
			setTimeout(() => p.cancelWithNull(true), 200);
			e = setTimeout(() => {
				throw new Error("took too long");
			}, 250);
			let result = await p;
			clearTimeout(t);
			clearTimeout(e);
			result = result === null && !callBackCalled;
			result.should.equal(true);
		} catch (error) {
			throw error;
		}
	});
});
