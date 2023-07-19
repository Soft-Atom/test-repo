{// скобки оставил, иначе повторное использование переменной res
	const obj: Record<string, number> = {
		a: 1,
		b: 2
	}

	function swapKeysAndValues(obj: Record<string, number>):Record<number, string> {
		const res: Record<number, string> = {};
		Object.entries(obj).forEach(([key, val]) => res[val] = key)
		return res;
	}

	const res = swapKeysAndValues(obj);
	console.log(res);
}