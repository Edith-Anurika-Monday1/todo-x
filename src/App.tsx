
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import { Todo } from "./api/todos";

const dummyTodo: Required<Todo> = {
  id: 0,
  title: "Sample Todo",
  completed: false,
};

function App() {
  const handleUpdate = (id: number, changes: Partial<Todo>) => {
    console.log("Updated todo:", id, changes);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/todo/:id"
        element={<TodoDetail todo={dummyTodo} onUpdate={handleUpdate} />}
      />
    </Routes>
  );
}

export default App;
