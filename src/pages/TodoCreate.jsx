import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../api/todos';
import TodoForm from '../components/TodoForm';
import { toast } from 'sonner';

export default function TodoCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (title) => {
      await createTodo({ title, completed: false });
    },
    onSuccess: () => {
      toast.success('Todo created');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/');
    },
    onError: () => toast.error('Failed to create todo'),
  });

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Todo</h1>
      <TodoForm onSubmit={mutation.mutate} />
    </section>
  );
}
