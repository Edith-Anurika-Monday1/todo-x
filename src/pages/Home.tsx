import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, getTodos, addTodo, deleteTodo, updateTodo, Todo } from "../api/todos";
import SearchFilter from "../components/SearchFilter";
import TodoItem from "../components/TodoItem";
import Pagination from "../components/Pagination";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (todo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [...old, todo]);
      toast.success("Todo added!");
      setNewTodo("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, changes }: { id: number; changes: Partial<Todo> }) =>
      updateTodo(id, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => old.filter((t) => t.id !== id));
      toast.success("Todo deleted!");
    },
  });

  const handleAdd = () => {
    const title = newTodo.trim();
    if (!title) return toast.error("Please enter a todo");
    addMutation.mutate({ title, completed: false });
  };

  const handleToggle = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) updateMutation.mutate({ id, changes: { completed: !todo.completed } });
  };

  const handleDelete = (id: number) => deleteMutation.mutate(id);

  const handleEdit = (id: number, newTitle: string) =>
    updateMutation.mutate({ id, changes: { title: newTitle } });

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : filter === "completed" ? todo.completed : !todo.completed;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTodos = filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);
  
  if (isLoading) return <p className="text-center mt-10 text-muted">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10 text-red-500 font-semibold">Error loading todos</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-surface text-text rounded-2xl shadow-card">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">My Todos</h1>

      
      <SearchFilter
        search={searchTerm}
        filter={filter}
        onSearch={setSearchTerm}
        onFilter={setFilter}
        onClear={() => {
          setSearchTerm("");
          setFilter("all");
        }}
      />

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 bg-background text-text border border-border px-3 py-2 rounded-lg 
                     placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary 
                     dark:bg-[#111] dark:text-white dark:border-gray-700"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          Add
        </button>
      </div>

      {currentTodos.length > 0 ? (
        <ul className="space-y-3">
          {currentTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted mt-4">No todos found.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Home;
 