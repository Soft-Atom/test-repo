// в доке по API не указано описание неуспешных ответов
enum GenderEnum {male = 'male', female = 'femal'}
enum BloodGroupEnum {
	APlus = 'A+',
	AMinus = 'A-',
	BPlus = 'B+',
	BMinus = 'B-',
	ABPlus = 'AB+',
	ABMinus = 'AB-',
	ZeroPlus = '0+',
	ZeroMinus = '0-',
}
// решил сделать типом
type TEyeColor = 'Green' | 'Brown' | 'Gray' | 'Amber' | 'Blue';
type THairColor = 'Black' | 'Blond' | 'Brown' | 'Chestnut' | 'Auburn';
type THairType = 'Curly' | 'Very curly' | 'Straight' | 'Wavy' | 'Strands';

interface IHair {
	color: THairColor; 
	type: THairType;
}

interface ICoordinates {
	lat: number;
	lng: number;
}

interface IAddress {
	address: string;
	city: string;
	coordinates: ICoordinates;
	postalCode: number;
	state: string; //можно было сделать enum ? долго имеет ли смысл
}

interface IBank {
	cardExpire: Date;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string
}

interface ICompany {
	address: IAddress;
	department: string;
	name: string;
	title:string;
}

interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: GenderEnum;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: Date;
	image: string;
	bloodGroup: BloodGroupEnum;
	height:number;
	weight: number;
	eyeColor: TEyeColor;
	hair: IHair;
	domain: string;
	ip: string;
	address: IAddress;
	macAddress:string;
	university: string;
	bank: IBank;
	company: ICompany;
	ein: string;
	ssn: string;
	userAgent:string
}

interface IUserResponse {
	users: IUser[];
	total: number;
	skip: number;
	limit: number;
}

async function myFetch (url: string): Promise<unknown> {
	const res = await fetch(url);
	if (!res.ok){
		throw new Error('Не удалоось загрузить данные с сервера');
	}
	return res.json();	
}

function assertUserResponse(obj:unknown): asserts obj is IUserResponse {
	if (typeof obj === 'object' && !!obj 
		&& 'total' in obj && typeof obj.total === 'number' && obj.total > 0){
		return
	} 
	throw new Error('Неверный ответ от сервера');
} 

async function getUsers() {
	const url = 'https://dummyjson.com/users';
	const data = await myFetch(url);
	assertUserResponse (data);
	console.log(data.users);
}

function wrappedQuery(f:Function): Function {
	return (...args: unknown[]): unknown=>{
		try {
			return f(...args);
		} catch(e:unknown) {
			if (e instanceof Error){
				console.error(e);
			}
		}

	}
}

const query = wrappedQuery(getUsers);
query();