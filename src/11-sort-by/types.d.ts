type TSign = '-' | '';
type TStringKey<T>  = T extends string 
	? T 
	: T extends number
		? String<T>
		: '';
type TKeysChain<T> = {
	[K in keyof T]-?: T[K] extends undefined? never: 
		T[K] extends object
			? `${TStringKey<K>}.${TKeysChain<T[K]>}` 
			: TStringKey<K>

}[keyof T];
	
function sort<T>(property: `${TSign}${TKeysChain<T>}`): (a:T, b:T) => number;
function fn<T>(obj1:T, obj2:T): number;
// function sortBy<T>(...args: `${TSign}${keyof T}`[]): typeof fn<T>; 
function sortBy<T>(
	...args: `${TSign}${TKeysChain<T>}`[]
): typeof fn<T>; 

declare module 'sort-by' {
	export default sortBy;
}


