import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function TodoForm({ onSubmit, initialTitle = '' }) {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      toast.error('Todo title cannot be empty.');
      return;
    }
    onSubmit(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="w-full text-sm px-3 py-2 border rounded-md shadow-sm"
      />
      <Button type="submit" className="text-xs px-4 py-2">
        Save
      </Button>
    </form>
  );
}
