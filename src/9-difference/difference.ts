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
// let v2: IDifference = difference2(a, b);
console.log(v0);
// console.log(v2);

type TKey = string | number | symbol;
type TObj = Record<TKey, any>;


// можноо ли это записать короче? <TA extends TObj, TB extends TObj>
// если можно, я хотел бы настоять на этой реализации
// так как у меня в типе указано, что ключи могут быть типа symbol
function difference<TA extends TObj, TB extends TObj>(a: TA,b: TB): Omit<TA, keyof TB> {
	return Reflect.ownKeys(a).reduce<Omit<TA, keyof TB>>(
		(acc, el) => {
			if (!(el in b)) acc[el] = a[el];
			return acc;
		},
		{} as Omit<TA, keyof TB>
	)
}
//  // это по идее быстрее но не корректное
// type TObj2 = Record<string, any>
// function difference2<TA extends TObj2, TB extends TObj2>(a: TA,b: TB): Omit<TA, keyof TB> {
// 	const res = <Omit<TA, keyof TB>>{};
// 	// ключи типа symbol не перебираются в for in 
// 	for (const key in a) 
// 		//я не понимаю почему так "res[key]" не работало?
// 		if (!(key in b)) res[key as string] = a[key];
// 	return res;
// }