{
	const user = {
		name:'Vasya',
		age: 8,
		skills: ['typescript', 'javascript']
	}

	type TKey = string | number | symbol;
	type TObj = Record<TKey, any>;

	function pickObjectKeys<T extends TObj>(obj: T, keys: (keyof T)[]): T {
		//после вот этого вот в памяти остается объект obj ?
		//или он будет удален сборщиком мусора ? 
		return keys.reduce(
			(acc:T, el) => {
				acc[el] = obj[el];
				return acc;
			},
			<T>{}
		);
	}
	const res = pickObjectKeys(user,['age','name']);
	console.log(res);
}