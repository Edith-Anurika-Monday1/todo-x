import { Button } from './ui/button';

export default function Pagination({ currentPage, setCurrentPage, totalTodos, todosPerPage }) {
  const totalPages = Math.ceil(totalTodos / todosPerPage);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
      <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'bg-primary text-white' : ''}
        >
          {page}
        </Button>
      ))}

      <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}
