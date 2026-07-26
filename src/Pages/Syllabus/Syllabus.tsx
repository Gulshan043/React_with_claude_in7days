import "./Syllabus.scss";

const modules: { title: string; topics: string[] }[] = [
  {
    title: "Module 1: Introduction to React",
    topics: [
      "What is React JS?",
      "History of React",
      "Features of React",
      "Advantages & Disadvantages",
      "SPA (Single Page Application)",
      "React vs Angular vs Vue",
      "Virtual DOM",
      "Real DOM vs Virtual DOM",
      "React Architecture",
    ],
  },
  {
    title: "Module 2: Environment Setup",
    topics: [
      "Installing Node.js",
      "npm & npx",
      "VS Code Setup",
      "Create React App",
      "Vite Setup",
      "Folder Structure",
      "First React App",
      "Project Execution",
    ],
  },
  {
    title: "Module 3: JSX",
    topics: [
      "Introduction to JSX",
      "JSX Syntax",
      "Expressions in JSX",
      "Comments",
      "Attributes",
      "Styling in JSX",
      "Fragments",
      "Rendering Elements",
    ],
  },
  {
    title: "Module 4: Components",
    topics: [
      "Functional Components",
      "Class Components",
      "Creating Components",
      "Component Naming Rules",
      "Nested Components",
      "Export & Import Components",
      "Reusable Components",
    ],
  },
  {
    title: "Module 5: Props",
    topics: [
      "Introduction to Props",
      "Passing Props",
      "Default Props",
      "Children Props",
      "Props Drilling",
      "Prop Types",
      "Practical Examples",
    ],
  },
  {
    title: "Module 6: State",
    topics: [
      "What is State?",
      "useState Hook",
      "Updating State",
      "Multiple States",
      "Object State",
      "Array State",
      "State vs Props",
    ],
  },
  {
    title: "Module 7: Events",
    topics: [
      "Event Handling",
      "Click Event",
      "Change Event",
      "Form Events",
      "Keyboard Events",
      "Mouse Events",
      "Event Object",
    ],
  },
  {
    title: "Module 8: Conditional Rendering",
    topics: [
      "if Statement",
      "Ternary Operator",
      "Logical &&",
      "Switch Case",
      "Dynamic UI",
    ],
  },
  {
    title: "Module 9: Lists",
    topics: ["map()", "Keys", "Rendering Arrays", "Dynamic List", "Filtering Data"],
  },
  {
    title: "Module 10: Forms",
    topics: [
      "Controlled Components",
      "Uncontrolled Components",
      "Input Fields",
      "Validation",
      "Form Submission",
    ],
  },
  {
    title: "Module 11: Hooks",
    topics: [
      "Introduction to Hooks",
      "useState",
      "useEffect",
      "useRef",
      "useMemo",
      "useCallback",
      "Custom Hooks",
    ],
  },
  {
    title: "Module 12: Lifecycle",
    topics: [
      "Component Lifecycle",
      "Mounting",
      "Updating",
      "Unmounting",
      "useEffect Lifecycle",
    ],
  },
  {
    title: "Module 13: Routing",
    topics: [
      "React Router DOM",
      "BrowserRouter",
      "Routes",
      "Route",
      "Link",
      "NavLink",
      "useNavigate",
      "Route Parameters",
    ],
  },
  {
    title: "Module 14: API Integration",
    topics: [
      "Fetch API",
      "Axios",
      "GET Request",
      "POST Request",
      "PUT Request",
      "DELETE Request",
      "Loading State",
      "Error Handling",
    ],
  },
  {
    title: "Module 15: Styling",
    topics: [
      "CSS",
      "CSS Modules",
      "Inline CSS",
      "Bootstrap",
      "Tailwind CSS",
      "Styled Components",
    ],
  },
  {
    title: "Module 16: Context API",
    topics: ["Context API", "Provider", "Consumer", "useContext", "Global State"],
  },
  {
    title: "Module 17: State Management",
    topics: ["Redux Basics", "Redux Toolkit", "Store", "Slice", "Dispatch", "Selector"],
  },
  {
    title: "Module 18: Performance",
    topics: [
      "Lazy Loading",
      "Code Splitting",
      "React.memo",
      "Optimization Techniques",
    ],
  },
  {
    title: "Module 19: Authentication",
    topics: ["Login System", "JWT Basics", "Protected Routes"],
  },
  {
    title: "Module 20: Deployment & Project",
    topics: ["Environment Variables", "Build Project", "Deploy on Vercel"],
  },
];

const practicalProjects = ["Calculator App", "Movie Search App"];

const Syllabus = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Complete Notes
        </p>
        <h1 className="text-2xl font-bold text-white">React JS — Syllabus</h1>
        <p className="text-slate-400">
          React is a JavaScript library for building user interfaces, developed
          by Facebook. It is fast, scalable and component based — this syllabus
          maps out everything from fundamentals to deployment.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Founded by
          </p>
          <p className="mt-1 text-slate-200">Jordan Walke, at Facebook (Meta)</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Current version
          </p>
          <p className="mt-1 text-slate-200">React 18+ (regular updates)</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Learning path
          </p>
          <p className="mt-1 text-slate-200">Practice → Build → Learn → Grow</p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-sky-400">
          20 Modules — Full Topic List
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className="space-y-2.5 rounded-lg border border-slate-800 bg-slate-900 p-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-700 text-xs text-sky-300">
                  {i + 1}
                </span>
                {mod.title.replace(/^Module \d+:\s*/, "")}
              </h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-300">
                {mod.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-400">Practical Projects</h2>
        <div className="flex flex-wrap gap-2">
          {practicalProjects.map((project) => (
            <span
              key={project}
              className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200"
            >
              {project}
            </span>
          ))}
        </div>
      </section>

      <div className="rounded-lg border border-sky-900 bg-sky-950/40 p-4 text-sm text-slate-300">
        <strong className="text-sky-300">Learn React Today, Build the Future
        Tomorrow.</strong> Follow the modules in order — each one builds on the
        concepts before it.
      </div>
    </div>
  );
};

export default Syllabus;
