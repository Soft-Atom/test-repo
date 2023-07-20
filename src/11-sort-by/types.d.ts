type TSign = '-' | '';
type TKeysChain<T> = {
	[K in keyof T]: T[K] extends object
        ? `${K extends string? K: ''}.${TKeysChain<T[K]>}` 
        : `${K extends string? K: ''}`
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