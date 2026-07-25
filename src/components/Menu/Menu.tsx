import {
  MousePointerClick,
  RefreshCw,
  Layers,
  Database,
  Route,
  Gauge,
  FlaskConical,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";

const dayLinks = [
  { label: "Day 1", path: "/day1", icon: MousePointerClick },
  { label: "Day 2", path: "/day2", icon: RefreshCw },
  { label: "Day 3", path: "/day3", icon: Layers },
  { label: "Day 4", path: "/day4", icon: Database },
  { label: "Day 5", path: "/day5", icon: Route },
  { label: "Day 6", path: "/day6", icon: Gauge },
  { label: "Day 7", path: "/day7", icon: FlaskConical },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
  }`;

const Menu = () => {
  return (
    <nav className="flex h-full w-56 shrink-0 flex-col gap-1 overflow-y-auto border-r border-slate-800 bg-slate-900 p-3 text-slate-100">
      <span className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Days
      </span>
      {dayLinks.map((day) => (
        <NavLink key={day.path} to={day.path} className={linkClasses}>
          <day.icon className="h-4 w-4 shrink-0" />
          {day.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
