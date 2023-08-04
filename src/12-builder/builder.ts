enum HttpMethod {
	Post = 'POST',
	Get = 'GET',
	Put = 'PUT',
	Delete = 'DELETE'
}
// type THttpMode = 'cors' | 'no-cors' | 'same-origin';
// type THttpCache = 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
// type THttpCredentials = 'include' | 'same-origin' | 'omit';
// type THttpRedirect = 'manual' | 'follow' | 'error';

// interface IFetchOptions {
// 	method?: HttpMethod;
// 	mode?: THttpMode;
//     cache?: THttpCache;
//     credentials?: THttpCredentials;
//     headers?: Headers;
//     redirect?: THttpRedirect; 
//     referrerPolicy?: ReferrerPolicy;
//     body?: string | FormData
// }

interface IFetchOptions extends RequestInit{
	method?: HttpMethod
}

export class FetchBuilder {
	private url: string | URL;
	private options: IFetchOptions = {}

	setUrl(url: string | URL) {
		this.url = url;
		return this;
	}

	private setHttpRequest(method: HttpMethod, url?: string | URL,) {
		if (url) this.url = url;
		this.options.method = method;
		return this;
	}

	get(url?: string | URL) {
		return this.setHttpRequest(HttpMethod.Get, url);
	}

	post(url?: string | URL) {
		return this.setHttpRequest(HttpMethod.Post, url);
	}
	
	put(url?: string | URL) {
		return this.setHttpRequest(HttpMethod.Put, url);
	}

	delete(url?: string | URL){
		return this.setHttpRequest(HttpMethod.Delete, url);
	}
	
	setBody(obj: Object){
		this.options.body = JSON.stringify(obj);
		return this;
	}

	setHeaders(headers: HeadersInit){
		this.options.headers = headers;
		return this;
	}

	async exec<T>(): Promise<T> {
		if (!this.url) throw new Error('Не указан адрес запроса');
		const res = await fetch(this.url, this.options);
		if (!res.ok) throw new Error('Не удалоось загрузить данные с сервера');
		return res.json();
	}
}

