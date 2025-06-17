import Dexie from 'dexie';

const db = new Dexie('TodoAppDB');

db.version(1).stores({
  todos: '++id, title, completed',
});

export const safeGetAllTodos = async () => {
  try {
    return await db.todos.toArray();
  } catch (error) {
    console.error("Failed to fetch todos from Dexie:", error);
    return [];
  }
};

export const safeAddTodo = async (todo) => {
  try {
    return await db.todos.add(todo);
  } catch (error) {
    console.error("Failed to add todo to Dexie:", error);
    return null;
  }
};

export const safeUpdateTodo = async (id, changes) => {
  try {
    return await db.todos.update(id, changes);
  } catch (error) {
    console.error(`Failed to update todo (id: ${id}) in Dexie:`, error);
    return 0; // 0 = not updated
  }
};

export const safeDeleteTodo = async (id) => {
  try {
    return await db.todos.delete(id);
  } catch (error) {
    console.error(`Failed to delete todo (id: ${id}) from Dexie:`, error);
  }
};

export const safeBulkPutTodos = async (todos) => {
  try {
    return await db.todos.bulkPut(todos);
  } catch (error) {
    console.error("Failed to bulk insert todos to Dexie:", error);
  }
};

export default db;
