export function fib(num: number, memo = [1, 1]): number {
	if (memo[num]) return memo[num];
	const ans = fib(num - 1, memo) + fib(num - 2, memo);
	memo[num] = ans;
	return ans;
}
