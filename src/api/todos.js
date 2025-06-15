import axios from 'axios';
import db from '../db/dexie';

// Fetch todos from local Dexie or fallback to API
export async function fetchTodos() {
  const localTodos = await db.todos.toArray();
  if (localTodos.length > 0) return localTodos;

  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50');
  await db.todos.bulkAdd(data);
  return data;
}

// Get single todo by ID
export async function getTodoById(id) {
  const localTodo = await db.todos.get(Number(id));
  if (localTodo) return localTodo;

  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  await db.todos.add(data);
  return data;
}

// Create new todo with default structure
export async function createTodo(todo) {
  if (!todo || typeof todo !== 'object' || !todo.title) {
    throw new Error('Invalid todo input.');
  }

  const newTodo = {
    ...todo,
    id: Date.now(), // Unique ID for Dexie
    completed: false,
  };

  await db.todos.add(newTodo);
  return newTodo;
}

// Update todo with safety check
export async function updateTodo(id, updates) {
  if (!id || typeof updates !== 'object' || updates === null) {
    throw new Error('Invalid update parameters.');
  }

  await db.todos.update(id, updates);
  const updated = await db.todos.get(id);
  return updated;
}

// Delete todo by ID
export async function deleteTodo(id) {
  await db.todos.delete(id);
  return id;
}
