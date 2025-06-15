import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoCreate from './pages/TodoCreate';
import TodoDetail from './pages/TodoDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TodoCreate />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-center" /> {<Toaster />}

    </>
  );
}
