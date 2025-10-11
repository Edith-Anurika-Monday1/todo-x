import Dexie, { Table } from "dexie";

export interface Todo {
  id?: number; // optional for new items
  title: string;
  completed: boolean;
}

class TodoDB extends Dexie {
  todos!: Table<Todo>;

  constructor() {
    super("TodoAppDB");
    this.version(1).stores({
      todos: "++id, title, completed",
    });
  }
}

export const db = new TodoDB();

export const getTodos = async (): Promise<Todo[]> => {
  return await db.todos.toArray();
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const id = await db.todos.add(todo);
  return { ...todo, id };
};

export const fetchTodo = async (id: number): Promise<Todo | undefined> => {
  return await db.todos.get(id);
};

export const updateTodo = async (
  id: number,
  updatedTodo: Partial<Todo>
): Promise<void> => {
  await db.todos.update(id, updatedTodo);
};

export const deleteTodo = async (id: number): Promise<void> => {
  await db.todos.delete(id);
};
