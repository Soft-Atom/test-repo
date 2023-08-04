import sortBy from 'sort-by';

const users = [{
    id: 7,
    name: 'Foo',
    age: '34',
    email: {  }
}, {
    id: 3,
    name: 'Baz',
    age: '67',
   
}, {
    id: 4,
    name: 'Bar',
    age: '67',
    email: { }
}];

console.log(users.sort(sortBy('-age','-id','name')));
