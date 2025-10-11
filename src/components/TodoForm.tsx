import React, { useState } from "react";

interface Props {
  onSubmit: (title: string) => void;
}

const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle("");
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Add a todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-[#1A1F3C] text-white
                   placeholder-gray-400 border border-gray-700
                   focus:outline-none focus:border-blue-500
                   focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />

      <button
        onClick={handleSubmit}
        className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold
                   hover:bg-blue-700 active:bg-blue-800
                   transition-colors duration-200 shadow-md"
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
