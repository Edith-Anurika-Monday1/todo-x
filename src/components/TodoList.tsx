import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from "../api/todos";
import { db } from "../db/dexie";
import { toast } from "sonner";
import TodoItem from "./TodoItem";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos?: Todo[]; 
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<Props> = ({ todos = [], onToggle, onDelete, onEdit }) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Todo> }) => {
      await apiUpdateTodo(id, updates);
      await db.todos.update(id, updates);
      return { id, updates };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated!");
    },
    onError: () => {
      toast.error("Failed to update todo");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiDeleteTodo(id);
      await db.todos.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted!");
    },
    onError: () => {
      toast.error("Failed to delete todo");
    },
  });

  const handleToggle = (id: number) => {
    if (onToggle) return onToggle(id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return toast.error("Todo not found");

    updateMutation.mutate({ id, updates: { completed: !todo.completed } });
  };

  const handleDelete = (id: number) => {
    if (onDelete) return onDelete(id);

    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  const handleEdit = (id: number, newTitle: string) => {
    if (onEdit) return onEdit(id, newTitle);
    updateMutation.mutate({ id, updates: { title: newTitle } });
  };

  if (!todos.length)
    return <p className="text-center text-gray-400 mt-4">No todos available.</p>;

  return (
    <ul className="space-y-3">
      {todos.map((t) => (
        <li key={t.id}>
          <TodoItem
            todo={t}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
