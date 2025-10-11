import { NavLink } from "react-router-dom";

export default function Navbar(): React.ReactElement {
  const baseClasses =
    "px-4 py-2 rounded-lg transition-colors duration-200";
  const activeClasses = "bg-purple-700 text-white";
  const inactiveClasses =
    "text-white hover:bg-blue-700 hover:text-white";

  return (
    <nav className="bg-black border-b border-blue-600 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-purple-400">Todo App</h1>
        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            Create
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
