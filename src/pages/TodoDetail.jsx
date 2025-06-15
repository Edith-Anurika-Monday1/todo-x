import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTodoById } from '../api/todos';
import { Button } from '../components/ui/button';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodoById(id),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !todo) return <p className="text-center text-red-500">Todo not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Todo Detail</h1>
      <p className="mb-2"><strong>Title:</strong> {todo.title}</p>
      <p className="mb-4">
        <strong>Status:</strong>{' '}
        <span className={todo.completed ? 'text-green-600' : 'text-yellow-600'}>
          {todo.completed ? 'Completed' : 'Incomplete'}
        </span>
      </p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}
