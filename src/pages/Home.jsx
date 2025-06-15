import { useState, useMemo, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { fetchTodos } from '../api/todos';
import db from '../db/dexie';
import TodoItem from '../components/TodoItem';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: Infinity,
  });

  const allTodos = useLiveQuery(() => db.todos.toArray(), []) || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const filteredTodos = useMemo(() => {
    let filtered = [...allTodos];

    if (filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (filter === 'incomplete') {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    if (search.trim()) {
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [allTodos, search, filter]);

  const indexOfLast = currentPage * todosPerPage;
  const indexOfFirst = indexOfLast - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirst, indexOfLast);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {currentTodos.length > 0 ? (
        <ul className="space-y-4">
          {currentTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No todos found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalTodos={filteredTodos.length}
        todosPerPage={todosPerPage}
      />
    </main>
  );
}
