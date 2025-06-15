import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-background border-b shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          TodoApp
        </Link>
        <Link to="/create" className="text-sm font-medium hover:underline">
          + New Todo
        </Link>
      </nav>
    </header>
  );
}
