import Dexie, { Table } from "dexie";
import { Todo } from "../types";

export class TodoAppDB extends Dexie {
  todos!: Table<Todo, number>; 
  constructor() {
    super("TodoAppDB");

    this.version(1).stores({
      todos: "++id, title, completed", 
        });
  }
}

export const db = new TodoAppDB();


export const safeGetAllTodos = async (): Promise<Todo[]> => {
  try {
    return await db.todos.toArray();
  } catch (err) {
    console.error("Failed to fetch todos from Dexie:", err);
    return [];
  }
};

export const safeAddTodo = async (todo: Todo): Promise<number | null> => {
  try {
    return await db.todos.add(todo);
  } catch (err) {
    console.error("Failed to add todo:", err);
    return null;
  }
};

export const safeUpdateTodo = async (
  id: number,
  updates: Partial<Todo>
): Promise<boolean> => {
  try {
    await db.todos.update(id, updates);
    return true;
  } catch (err) {
    console.error("Failed to update todo:", err);
    return false;
  }
};

export const safeDeleteTodo = async (id: number): Promise<boolean> => {
  try {
    await db.todos.delete(id);
    return true;
  } catch (err) {
    console.error("Failed to delete todo:", err);
    return false;
  }
};
