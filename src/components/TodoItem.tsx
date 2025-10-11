import React, { useState } from "react";
import { Todo } from "../api/todos";
import { toast } from "sonner";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (todo.id !== undefined) {
      onEdit(todo.id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    if (todo.id !== undefined) {
      onToggle(todo.id);
    }
  };

  const handleDelete = () => {
    if (
      todo.id !== undefined &&
      confirm("Are you sure you want to delete this todo?")
    ) {
      onDelete(todo.id);
      toast.success("Todo deleted successfully");
    }
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div
      className="flex items-center justify-between bg-background border border-border 
                 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 accent-primary cursor-pointer"
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-background text-text border border-border rounded-md 
                       px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        ) : (
          <span
            className={`flex-1 font-medium text-base ${
              todo.completed ? "line-through text-gray-400" : "text-text"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-secondary hover:text-primary font-semibold transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white 
                         font-medium hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
