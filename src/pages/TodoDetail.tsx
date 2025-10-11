import React, { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onUpdate: (id: number, updated: Partial<Todo>) => void;
}

const TodoDetail: React.FC<Props> = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Todo = {
      ...todo,
      title,
      completed,
    };

    onUpdate(updated.id, updated);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Todo Detail</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-5 h-5 accent-primary"
          />
          <label htmlFor="completed" className="text-sm text-gray-700">
            Completed
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default TodoDetail;
