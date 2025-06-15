import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from '../api/todos';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from './ui/alert-dialog';

export default function TodoItem({ todo }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async (checked) => {
      const updated = { ...todo, completed: checked };
      await updateTodo(todo.id, updated);
    },
    onSuccess: () => {
      toast.success('Todo status updated');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteTodo(todo.id); // ✅ No confirm here
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
          onCheckedChange={toggleMutation.mutate}
          className="border-muted"
        />
        <span className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
          {todo.title}
        </span>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive" className="text-xs px-3 py-1">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this todo? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMutation.mutate()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
