import { FetchBuilder } from '../12-builder/builder';

interface IProduct {
	id: number;
	title: number;
	description?: string;
	price: number;
	discountPercentage?: number;
	rating?: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[]
}

class DummyAPI {
	private API_BASE: Readonly<string> = 'https://dummyjson.com/';

	private static instance: DummyAPI;

	private constructor() { }

	static get(): DummyAPI {
		if(! DummyAPI.instance ) DummyAPI.instance = new DummyAPI();
		return DummyAPI.instance;
	}

	private getUrl(route: string): string {
		return this.API_BASE + route;
	}

	assertProduct(obj:unknown): asserts obj is IProduct {
		if (typeof obj === 'object' && !!obj 
			&& 'id' in obj
			&& 'title' in obj
			&& 'price' in obj
			&& 'stock' in obj
			&& 'brand' in obj
			&& 'category' in obj
			&& 'thumbnail' in obj
			&& 'images' in obj){
			return
		} 
		console.log(obj);
		throw new Error('Ошибка ти----а данных');
	} 

	async getProduct(id: number): Promise<IProduct> {
		const url = 'product/';
		const data = await (new FetchBuilder())
			.get(this.getUrl(url)+id)
			.exec<IProduct>();
		this.assertProduct(data);
		return data;
	}
}

class ProxyAPI {
	// API: DummyAPI = new DummyAPI();
	constructor(public API: DummyAPI) { }
	async getProduct(id: number): Promise<IProduct | Error>{
		if(id < 10) {
			const data =  await this.API.getProduct(id);
			return  data;
		} 
		return  new Error('Ошибка - id должен быть меньше 10');
	
	}
}

(async () => {
	const dummyApi = DummyAPI.get();
	const proxyApi = new ProxyAPI(dummyApi);
	try {
		let product  = await proxyApi.getProduct(1);
		console.log(product);
		product = await proxyApi.getProduct(2);
		console.log(product);
		product = await proxyApi.getProduct(10);
		console.log(product);
	} catch (e) {
		if( e instanceof Error) console.log(e.message);
	}
})();

