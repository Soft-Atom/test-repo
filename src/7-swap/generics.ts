{
	// не совсем понял смысл задания.
	// где тут используются generics
	
	const obj: Record<string, unknown> = {
		a: 1,
		b: 2
	}

	function swapKeysAndValues(obj: Record<string, unknown>): Record<string, string> {
		const res = {};
		for (let key in obj) {
			res[String(obj[key])] = key;
		}
		return res;
	}

	const res = swapKeysAndValues(obj);
	console.log(res);
}

{
	// может так
	
	const obj: Record<string, number> = {
		a: 1,
		b: 2
	}

	function swapKeysAndValues(obj: Record<string, number>):Record<number, string> {
		const res = {};
		for (let key in obj) {
			res[obj[key]] = key;
		}
		return res;
	}

	const res = swapKeysAndValues(obj);
	console.log(res);
}