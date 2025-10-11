import React from "react";
import TodoForm from "../components/TodoForm";

interface Props {
  onCreate: (title: string) => void;
}

const TodoCreate: React.FC<Props> = ({ onCreate }) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-950 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Create New Todo</h2>
      <TodoForm onSubmit={onCreate} />
    </div>
  );
};

export default TodoCreate;
