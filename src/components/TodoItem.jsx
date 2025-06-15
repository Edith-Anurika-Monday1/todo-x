import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from '../api/todos';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function TodoItem({ todo }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async (checked) => {
      const updated = { ...todo, completed: checked };
      await updateTodo(todo.id, updated); // ✅ fix: separate id and data
    },
    onSuccess: () => {
      toast.success('Todo status updated');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (confirm('Are you sure you want to delete this todo?')) {
        await deleteTodo(todo.id);
      }
    },
    onSuccess: () => {
      toast.success('Todo deleted');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <li className="flex items-center justify-between gap-4 bg-muted/40 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={toggleMutation.mutate} // ✅ correctly triggers mutation
          className="border-muted"
        />
        <span className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
          {todo.title}
        </span>
      </div>
      <Button
        size="sm"
        variant="destructive"
        className="text-xs px-3 py-1"
        onClick={deleteMutation.mutate}
      >
        Delete
      </Button>
    </li>
  );
}
