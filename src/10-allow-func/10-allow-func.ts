{
	
	class User {
		@allowFunc((a: number) => a > 0)
		age: number = 30;
	}
	
	const person = new User();
	console.log(person.age);
	
	person.age = 0;
	console.log(person.age);
	
	person.age = 20;
	console.log(person.age);
	
	type TAllowFunc = (a: number) => boolean;
	
	function allowFunc(f: TAllowFunc) {
		return function(
			target: Object,
			propertyKey: string | symbol
		) {
			let value: number;
	
			const getter = () => value;
			const setter = (newVal: number) => {
				if(f(newVal)) value = newVal;
				return value;
			}
	
			Object.defineProperty(
				target,
				propertyKey,
				{
					set: setter,
					get: getter
				}
			)
	
		}
	}

}