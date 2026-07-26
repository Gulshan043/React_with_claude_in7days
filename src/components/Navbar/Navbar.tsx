import { BookOpen, Home, ListTodo, Rocket } from "lucide-react";
import { NavLink } from "react-router-dom";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
  }`;

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 text-slate-100 shadow-lg shadow-black/20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
        >
          <Rocket className="h-5 w-5 text-sky-400" />
          <span>
            React <span className="text-sky-400">7-Day</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClasses}>
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              Home
            </span>
          </NavLink>
          <NavLink to="/syllabus" className={linkClasses}>
            <span className="flex items-center gap-1.5">
              <ListTodo className="h-4 w-4" />
              Syllabus
            </span>
          </NavLink>
          <NavLink to="/cheatsheet" className={linkClasses}>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              Cheatsheet
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
