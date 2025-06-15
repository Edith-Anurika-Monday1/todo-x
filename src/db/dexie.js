import Dexie from 'dexie';

const db = new Dexie('TodoAppDB');
db.version(1).stores({
  todos: '++id,title,completed',
});

export default db;
