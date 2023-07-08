"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _MyMap__size;
class MyMap {
    constructor(arr) {
        this.buckets = [];
        _MyMap__size.set(this, 0);
        if (arr) {
            for (let el of arr) {
                const [key, value] = el;
                this.set(key, value);
            }
        }
    }
    // совсем не разбираюсь в этом, пооэтому придумал такое
    hash(val) {
        return String(val).length;
    }
    findBucket(bucketsChain, key) {
        if (bucketsChain[0] === key) {
            return bucketsChain;
        }
        if (bucketsChain[2]) {
            return this.findBucket(bucketsChain[2], key);
        }
        return undefined;
    }
    removeBucketFromChain(bucketsChain, bucket) {
        if (bucketsChain[2] === bucket) {
            if (bucket[2] === undefined) {
                bucketsChain[2] = undefined;
            }
            else {
                bucketsChain[2] = bucket[2];
                bucket[2] = undefined; // по идее сборщик мусора должен его удалить после этго?
            }
        }
        else if (bucketsChain[2] !== undefined) {
            this.removeBucketFromChain(bucketsChain[2], bucket);
        }
    }
    removeBucket(index, bucket) {
        if (this.buckets[index] === bucket) {
            if (bucket[2] === undefined) {
                this.buckets[index] = undefined;
            }
            else {
                this.buckets[index] = bucket[2];
            }
        }
        else {
            ;
            //почему тут нужно делать каст? если ввести доп переменную все рабоотает
            if (this.buckets[index] !== undefined)
                this.removeBucketFromChain(this.buckets[index], bucket);
        }
    }
    get size() {
        return __classPrivateFieldGet(this, _MyMap__size, "f");
    }
    incSize() {
        __classPrivateFieldSet(this, _MyMap__size, __classPrivateFieldGet(this, _MyMap__size, "f") + 1, "f");
    }
    decSize() {
        __classPrivateFieldSet(this, _MyMap__size, __classPrivateFieldGet(this, _MyMap__size, "f") - 1, "f");
    }
    set(key, value) {
        const index = this.hash(key);
        if (this.buckets[index] === undefined) {
            this.buckets[index] = [key, value];
            this.incSize();
            return;
        }
        const bucket = this.findBucket(this.buckets[index], key);
        if (bucket !== undefined) {
            bucket[1] = value;
        }
        else {
            this.buckets[index] = [key, value, this.buckets[index]];
            this.incSize();
        }
    }
    get(key) {
        const index = this.hash(key);
        if (this.buckets[index] === undefined) {
            return undefined;
        }
        const bucket = this.findBucket(this.buckets[index], key);
        return bucket && bucket[1] || undefined;
    }
    delete(key) {
        const index = this.hash(key);
        // тут сделал доп переменную и каст не нужен
        const bucketsChain = this.buckets[index];
        if (bucketsChain === undefined) {
            return;
        }
        const bucket = this.findBucket(bucketsChain, key);
        if (bucket === undefined) {
            return;
        }
        this.removeBucket(index, bucket);
        this.decSize();
    }
    // по идее сборщик мусора должен все оостальноео почистить
    clear() {
        this.buckets = [];
        __classPrivateFieldSet(this, _MyMap__size, 0, "f");
    }
}
_MyMap__size = new WeakMap();
const myMap = new MyMap([
    [1, 1],
    ['2', '2'],
    [null, 5],
    ['test', ['f', 1]]
]);
myMap.set(9, 9);
myMap.set(1, 3);
myMap.set('2', 4);
myMap.set('4', 4);
myMap.set('3', 3);
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
