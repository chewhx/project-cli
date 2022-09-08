import { fib } from '../src/index';

const testConditions = [
	[4, 3],
	[10, 55],
	[28, 317811],
	[35, 9227465],
];

testConditions.forEach(([num, ans]) => {
	test(`Fibonnaci number at position ${num}`, () => {
		expect(fib(num)).toBe(ans);
	});
});
