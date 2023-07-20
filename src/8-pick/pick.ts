{ // скобки оставил, иначе конфликт на res
	const user = {
		name:'Vasya',
		age: 8,
		skills: ['typescript', 'javascript']
	}

	type TKey = string | number | symbol;
	type TObj = Record<TKey, any>;

	function pickObjectKeys<T extends TObj>(obj: T, keys: (keyof T)[]): T {
		return keys.reduce<T>(
			(acc:T, el): T => {
				acc[el] = obj[el];
				return acc;
			},
			{} as T
		);
	}
	const res = pickObjectKeys(user,['age','name']);
	console.log(res);
}