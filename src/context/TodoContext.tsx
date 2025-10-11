
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    setTodos((s) => [newTodo, ...s]);
    toast.success("Todo created");
  };

  const toggleTodo = (id: number) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    toast.success("Todo toggled");
  };

  const deleteTodo = (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this todo?");
    if (!ok) return;
    setTodos((s) => s.filter((t) => t.id !== id));
    toast.success("Todo deleted");
  };

  const editTodo = (id: number, title: string) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, title } : t)));
    toast.success("Todo updated");
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used inside TodoProvider");
  return context;
};
