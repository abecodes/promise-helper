# promise-helper

promise-helper is a simple toolbelt that aims to help with the more complex tasks of using promises.
It supports operations like handling promises in sequence, sequences with sleeps,
parallel execution or limited parallel execution, promises with timeout and cancelable promises.

It is released under the [UNLICENSE](https://unlicense.org/) & supports modern environments.

## Installation

Using npm:

```bash
# global
$ npm i -g @abecodes/promise-helper

# dependency
$ npm i -S @abecodes/promise-helper

# dev dependecy
$ npm i -D @abecodes/promise-helper
```

In Node.js:

```js
// Require the package.
const ph = require("@abecodes/promise-helper");
```

## API

### sequence

```javascript
// Default
ph.sequence(taskArray: [() => Promise<any>], cb?: (err, result) => any) => Promise<any>

// Adding timeout between each task
ph.sequence.withSleep(taskArray: [() => Promise<any>], timeout: number,cb?: (err, result) => any) => Promise<any>

// Adding a random timeout inbetween a given range between each task
ph.sequence.withSleepRange(taskArray: [() => Promise<any>], minTime: number, maxTime: number, cb?: (err, result) => any) => Promise<any>
```

The _sequence_ method takes an array of HOFs that return a promise an runs them in sequence. If _sequence.withSleep_ or _sequence.withSleepRange_ is called, the sequence will sleep after each task.

_Sequence_ can be used as Promise or with a callback.
If one task fails, the whole sequence will fail.
In case of an error, all previous results will be accessable (if not falsy).

If used as promise, they will be passed in the error object as result property.

If used with a callback, they are passed as the result parameter.

```javascript
// Example
const p = ph.sequence.withSleep(
	[
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve("Hello");
				}, 200);
			}),
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve("World");
				}, 200);
			}),
	],
	2000
);
p.then(res => console.log(res)).catch(err => console.log(err, err.result));
```

### parallel

```javascript
// Default
ph.parallel(taskArray: [() => Promise<any>], cb?: (err, result) => any) => Promise<any>

// Triggering limited execution
ph.parallel.limited(taskArray: [() => Promise<any>], limit: number) => void
```

The _parallel_ method takes an array of HOFs that return a promise an runs them in parallel.

If _parallel.limited_ is called,
only the given number of tasks will run in parallel.

_Parallel_ can be used as Promise or with a callback.
If one task fails, the whole sequence will fail.

_Parallel.limited_ returns void, so each task must be handled by itself during initialization.

```javascript
// Example
ph.parallel.limited(
	[
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve("Hello");
				}, 200);
			}).then(res => console.log(res)),
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve("World");
				}, 200);
			}).then(res => console.log(res)),
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(new Error("oO"));
				}, 200);
			}).catch(res => console.log(res)),
		() =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve("working limited");
				}, 200);
			}).then(res => console.log(res)),
	],
	2
);
```

### timeout

```javascript
// Default (throws timeout)
ph.timeout((executor: (resolve: (value?: any) => void, reject: (reason?: any)) => void) => void, timeout: number, onTimeout?: () => any) => Promise<any>

// Instead of throwing an error, withNull will resolve with null on timeout
ph.timeout.withNull((executor: (resolve: (value?: any) => void, reject: (reason?: any)) => void) => void, timeout: number, onTimeout?: () => any) => Promise<any>
```

The _timeout_ method creates a promise that is bound to a timeout.

If the promise fails to respond in time, it will throw an error. If _timeout.withNull_ is used, it will resolve with null instead of throwing.

Due to how promises work, the original promise will still execute, but if the operation offers a abort function, it can be triggered with the _onTimeout_ callback.

```javascript
// Example
const p = ph.timeout(
	(resolve, reject) => {
		req = https.get("https://www.google.de", res => resolve(res));
		req.on("error", err => reject(err));
		req.on("abort", () => reject());
	},
	20,
	() => req.abort()
);
p.then(res => console.log(res)).catch(err => console.log(err));
```

### cancelable

```javascript
// Invocation
const p = ph.cancelable((executor: (resolve: (value?: any) => void, reject: (reason?: any)) => void) => void) => Promise<any>

// cancel (throws canceled)
p.cancel(onCancel?: () => void)

// cancelWithNull resolves with null
p.cancelWithNull(onCancel?: () => void)
```

The _cancelable_ method creates a promise that could be canceled at will.

If canceled, it will throw an error. If _cancelable.cancelWithNull_ is used, it will resolve with null instead of throwing.

Due to how promises work, the original promise will still execute, but if the operation offers a abort function, it can be triggered with the _onCancel_ callback.

```javascript
// Example
let req;

const p = ph.cancelable((resolve, reject) => {
	req = https.get("https://www.google.de", res => resolve(res));
	req.on("error", err => reject(err));
	req.on("abort", () => reject());
});
p.then(res => console.log(res)).catch(err => console.log(err));

setTimeout(() => p.cancel(() => req.abort()), 20);
```

## Greetings

May you enjoy using this piece of software as much as I enjoyed writing it. Stay bug free and have an awesome day <3
