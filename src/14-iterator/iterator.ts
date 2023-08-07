{
	type TSortMethod = 'asc' | 'desc';
	type TSortKeys = 'id' | 'date'

	interface IPost {
		id: number;
		date: Date;
		title: string;
	}

	class Posts {
		private list: IPost[] = [];
		
		//--- самый главный вопрос--- 
		//как поступить при сортировке?
		// если я меняю текущий список то при создании нового итератора происходит новая сортировка 
		// к примеру я создал итератор по айди потом проитерировался
		// создал итератор по дате, список перестроился по дате и при вызове итератора по айди происходит хрень
		// если же я буду создавать новый экземляр списка или класса в принципе
		//  я получаю копию и теряю доступ к новым добавленны элементам в список.
		sort(method: TSortMethod, key: TSortKeys) {
			this.list = this.list.sort(
				(method === 'asc'
					? (a,b) => Number(a[key]) - Number(b[key])
					: (a,b) => Number(b[key]) - Number(a[key])
				)
			)
		}

		getPosts(): IPost[] {
			return this.list;
		}

		addPost(p:IPost): void {
			this.list.push(p);
		}

		deletePost(p:IPost): void {
			this.list = this.list.filter( el => el !== p);
		}

		getDateIterator(method: TSortMethod = 'asc'): MyIterator {
			this.sort(method, 'date');
			return new MyIterator(this);
		}

		getIdIterator(method: TSortMethod = 'asc'): MyIterator {
			this.sort(method, 'id');
			return new MyIterator(this);
		}
	}

	interface IIterator<T> {
		current(): T | undefined;
		next(): T | undefined;
		prev(): T | undefined;
		index(): number
	}

	class MyIterator implements IIterator<IPost> {
		private position: number = 0;

		constructor(private posts: Posts) { }

		current() {
			return this.posts.getPosts()[this.position];
		}

		next() {
			this.position += 1;
			return this.current();
		}

		prev() {
			this.position -= 1;
			return this.current();
		}

		index(): number {
			return this.position;
		}

	}

	const posts = new Posts();
	posts.addPost({id: 9, date: new Date('01-01-2023'), title: 'Hey1'})
	posts.addPost({id: 6, date: new Date('05-01-2023'), title: 'Hey2'})
	posts.addPost({id: 1, date: new Date('03-01-2023'), title: 'Hey3'})
	posts.addPost({id: 100, date: new Date('10-01-2023'), title: 'Hey4'})
	posts.addPost({id: 2, date: new Date('11-01-2023'), title: 'Hey5'})

	let iterator = posts.getDateIterator('desc');
	console.log(iterator.next());
	console.log(iterator.next());
	console.log(iterator.prev());
	iterator = posts.getIdIterator();
	console.log(iterator.next());
	console.log(iterator.next());
	console.log(iterator.prev());

}