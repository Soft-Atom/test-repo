
// Cспасибо за Ваш предыдущий обзор :) Не подскажите годные видео по Гиту и форку?
//можно было сделать класс, но думаю это реализация оптимальнее
// c сточки зрения производительности
//0 - key, 1 - value, 2 - outer
//конечно сначала поиск потом удаление этоо очень долго, по хорошему делать за один прохоож
type TBucket = [any, any, TBucket?];

class MyMap {
	private buckets: (TBucket | undefined)[]  = [];
	#_size: number = 0;
	
	constructor(arr?: any[]) {
		if (arr) {
			for (let el of arr) {
				const [key, value] = el;
				this.set(key, value);
			}
		}
	}
	// совсем не разбираюсь в этом, пооэтому придумал такое
	private hash(val: any): number {
		return String(val).length;
	}

	private findBucket(bucketsChain: TBucket, key: any): TBucket | undefined{
		if (bucketsChain[0] === key) {
			return bucketsChain;
		}
		if (bucketsChain[2]) {
			return this.findBucket(bucketsChain[2], key)
		}
		return undefined;
	}

	private removeBucketFromChain(bucketsChain: TBucket,bucket: TBucket) {
		if (bucketsChain[2] === bucket) {
			bucketsChain[2] = bucket[2];
			bucket[2] = undefined; // по идее сборщик мусора должен его удалить после этго?
		} else if (bucketsChain[2] !== undefined) {
			this.removeBucketFromChain(bucketsChain[2], bucket);
		}
	}

	private removeBucket(index:number, bucket: TBucket): void {
		if (this.buckets[index] === bucket) {
			this.buckets[index] = bucket[2];
			bucket[2] = undefined;
		} else {;
			//почему тут нужно делать каст? 
			// либо "!""
			//если ввести доп переменную все рабоотает
			if (this.buckets[index] !== undefined)
				this.removeBucketFromChain(this.buckets[index] as TBucket, bucket);
		}

	}

	get size(): number {
		return this.#_size
	}

	private incSize(): void{
		this.#_size += 1;
	}

	private decSize(): void{
		this.#_size -= 1;
	}

	public set(key: any, value: any): void {
		const index = this.hash(key);
		if (this.buckets[index] === undefined) {
			this.buckets[index] = [key, value];
			this.incSize();
			return;
		}
		const bucket = this.findBucket(this.buckets[index]!, key);
		if (bucket === undefined) {
			this.buckets[index] = [key, value, this.buckets[index]];
			this.incSize();
		} else {
			bucket[1] = value;
		}
	}

	public get(key: any): any {
		const index = this.hash(key);
		if (this.buckets[index] === undefined) {
			return undefined;
		}     
		const bucket = this.findBucket(this.buckets[index]!,key);
		return bucket && bucket[1] || undefined;
	}

	public delete(key: any): void {
		const index = this.hash(key);
		// тут сделал доп переменную и каст не нужен
		const bucketsChain = this.buckets[index];
		if (bucketsChain === undefined) {
			return;
		} 
		const bucket = this.findBucket(bucketsChain, key);
		if (bucket === undefined) {
			return ;
		} 
		this.removeBucket(index, bucket);	
		this.decSize();
	}
	// по идее сборщик мусора должен все оостальноео почистить
	public clear() {
		this.buckets = [];
		this.#_size = 0
	}
}

const myMap = new MyMap([
	[1, 1],
	['2','2'],
	[null, 5],
	['test', ['f',1]]
])

myMap.set(9,9);
myMap.set(1,3);
myMap.set('2',4);

myMap.set('4',4);
myMap.set('3',3);


console.log(myMap);
console.log(myMap.size);
console.log(myMap.get('test'));
myMap.delete(1);
console.log(myMap);
console.log(myMap.size);
myMap.delete('4');
console.log(myMap);
console.log(myMap.size);
console.log(myMap.get(9));
console.log(myMap.get('2'));
console.log(myMap.get('3'));
console.log(myMap.get('4'));