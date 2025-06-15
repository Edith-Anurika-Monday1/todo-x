import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { toast } from 'sonner';

export default function SearchFilter({ search, setSearch, filter, setFilter }) {
  const handleClear = () => {
    if (!search && filter === 'all') {
      toast.info('Nothing to clear');
      return;
    }
    setSearch('');
    setFilter('all');
    toast.success('Filters cleared');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
        className="flex-1 text-sm"
      />
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="incomplete">Incomplete</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
}
