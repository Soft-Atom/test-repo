{

	interface IA {
		a: number;
		b: string;
	}
	
	interface IB {
		a: number;
		c: boolean;
	}
	
	let a: IA = { a: 5, b: '' };
	let b: IB = { a: 10, c: true };
	
	interface IDifference {
		b: string;
	}
	let v0: IDifference = difference(a, b);
	console.log(v0);
	
	type TKey = string | number | symbol;
	type TObj = Record<TKey, any>;
	
	function difference<TA extends TObj, TB extends TObj>(a: TA,b: TB): Omit<TA, keyof TB> {
		
		// const keysB = Object.keys(b);
		// return Object.keys(a).reduce<Omit<TA, keyof TB>>(
		return Reflect.ownKeys(a).reduce<Omit<TA, keyof TB>>(
			(acc, el) => {
				if (!(el in b)) acc[el as keyof Omit<TA, keyof TB>] = a[el];
				// if (!keysB.includes(el)) acc[el as keyof Omit<TA, keyof TB>] = a[el];
				return acc;
			},
			{} as Omit<TA, keyof TB>
		)
	}
}
