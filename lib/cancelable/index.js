module.exports = executor => {
	let pResolve, pReject;
	const p = Promise.race([
		new Promise(executor),
		new Promise((resolve, reject) => {
			pResolve = resolve;
			pReject = reject;
		}),
	]);
	p.cancel = onCancel => {
		pReject(new Error("canceled"));
		if (onCancel && typeof onCancel === "function") onCancel();
	};
	p.cancelWithNull = onCancel => {
		pResolve(null);
		if (onCancel && typeof onCancel === "function") onCancel();
	};

	return p;
};
