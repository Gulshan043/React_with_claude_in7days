import {
  BookOpen,
  Database,
  FlaskConical,
  Gauge,
  ListTodo,
  Layers,
  MousePointerClick,
  RefreshCw,
  Route,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Home.scss";

const days = [
  {
    day: 1,
    path: "/day1",
    icon: MousePointerClick,
    title: "Foundation + useState + Events",
    blurb: "Core mental model, useState, functional updates, event handling.",
  },
  {
    day: 2,
    path: "/day2",
    icon: RefreshCw,
    title: "useEffect — Dependency Array & Cleanup",
    blurb: "Side effects, the three dependency-array cases, cleanup timing.",
  },
  {
    day: 3,
    path: "/day3",
    icon: Layers,
    title: "Component Patterns & Composition",
    blurb: "Reusable components, children props, composition over inheritance.",
  },
  {
    day: 4,
    path: "/day4",
    icon: Database,
    title: "Data Fetching & API Integration",
    blurb: "Fetch/Axios, loading & error states, custom data hooks.",
  },
  {
    day: 5,
    path: "/day5",
    icon: Route,
    title: "Routing with React Router",
    blurb: "Routes, params, nested & protected routes, navigation.",
  },
  {
    day: 6,
    path: "/day6",
    icon: Gauge,
    title: "Performance Optimization",
    blurb: "memo, useMemo/useCallback, lazy loading, avoiding re-renders.",
  },
  {
    day: 7,
    path: "/day7",
    icon: FlaskConical,
    title: "Testing & Final Project",
    blurb: "Pulling it together into a small real-world project.",
  },
];

const quickLinks = [
  {
    path: "/syllabus",
    icon: ListTodo,
    title: "Syllabus",
    blurb: "Full 20-module topic breakdown, start to finish.",
  },
  {
    path: "/cheatsheet",
    icon: BookOpen,
    title: "Cheatsheet",
    blurb: "Quick-reference summary across hooks, routing, state & more.",
  },
];

const Home = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          React in 7 Days
        </p>
        <h1 className="text-3xl font-bold text-white">
          Learn React by comparing it to what you already know
        </h1>
        <p className="max-w-2xl text-slate-400">
          A day-by-day walkthrough of React fundamentals, framed against
          Angular where it helps. Pick a day below, or jump straight to the
          syllabus or cheatsheet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-sky-400">Day by day</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {days.map(({ day, path, icon: Icon, title, blurb }) => (
            <Link
              key={path}
              to={path}
              className="group space-y-2 rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-sky-700 hover:bg-slate-800/60"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sky-400 group-hover:bg-sky-600 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Day {day}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
              <p className="text-sm text-slate-400">{blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-sky-400">Reference</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map(({ path, icon: Icon, title, blurb }) => (
            <Link
              key={path}
              to={path}
              className="group flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-sky-700 hover:bg-slate-800/60"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sky-400 group-hover:bg-sky-600 group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
                <p className="text-sm text-slate-400">{blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
