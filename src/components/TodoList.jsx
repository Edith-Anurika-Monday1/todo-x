import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, deleteTodo, updateTodo } from '../api/todos';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

export default function TodoList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  if (isLoading) return <p>Loading...</p>;

  // Filter todos
  const filtered = data
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) =>
      filter === 'all'
        ? true
        : filter === 'completed'
        ? t.completed === true
        : t.completed === false
    );

  const start = (page - 1) * 10;
  const paged = filtered.slice(start, start + 10);

  return (
    <section>
      <SearchFilter onSearch={setSearch} onFilter={setFilter} />
      <ul role="list" className="divide-y">
        {paged.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteMutation.mutate(todo.id)}
            onToggle={(done) => updateMutation.mutate({ id: todo.id, data: { completed: done } })}
          />
        ))}
      </ul>
      <Pagination page={page} setPage={setPage} total={filtered.length} />
    </section>
  );
}
