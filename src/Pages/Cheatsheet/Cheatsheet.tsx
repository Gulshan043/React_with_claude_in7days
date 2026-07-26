import type { ReactNode } from "react";
import "./Cheatsheet.scss";

const CodeBlock = ({ code, label }: { code: string; label?: string }) => (
  <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
    {label && (
      <div className="border-b border-slate-800 bg-slate-800/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </div>
    )}
    <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-200">
      <code>{code}</code>
    </pre>
  </div>
);

const Section = ({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) => (
  <section id={id} className="scroll-mt-20 space-y-4">
    <h2 className="flex items-center gap-2 text-lg font-semibold text-sky-400">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-700 text-xs text-sky-300">
        {index}
      </span>
      {title}
    </h2>
    {children}
  </section>
);

const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100">
    {children}
  </h3>
);

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => (
  <div className="overflow-x-auto rounded-lg border border-slate-800">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-slate-800/50 text-slate-400">
          {headers.map((h) => (
            <th key={h} className="px-4 py-2 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-slate-800">
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-4 py-2 align-top text-slate-300 first:font-medium first:text-slate-100"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const navItems = [
  { id: "overview", label: "What is React?" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "hooks", label: "Hooks" },
  { id: "communication", label: "Communication" },
  { id: "routing", label: "Routing" },
  { id: "state", label: "State Mgmt" },
  { id: "api", label: "API Integration" },
  { id: "performance", label: "Performance" },
  { id: "structure", label: "Project Structure" },
  { id: "deployment", label: "Deployment" },
];

const featuresCode = `Declarative      – describe WHAT UI you want, React handles HOW
Component Based  – build independent, reusable UI pieces
Virtual DOM      – lightweight copy of the real DOM, diffed & patched
Unidirectional   – data flows one way -> predictable state
JSX              – write HTML-like syntax inside JavaScript
Strong Ecosystem – huge collection of tools & libraries`;

const functionalVsClassCode = `// Functional component
function Greet() {
  return <h1>Hello React!</h1>;
}

// Class component (old way)
class Greet extends React.Component {
  render() {
    return <h1>Hello React!</h1>;
  }
}`;

const propsStateCode = `function App() {
  return <User name="Zaid" age={25} />;
}

function User(props) {
  return <p>{props.name} is {props.age} years old.</p>;
}

// state — only inside functional components via useState
const [count, setCount] = useState(0);`;

const eventHandlingCode = `function ButtonClick() {
  const handleClick = () => alert('Button Clicked!');
  return <button onClick={handleClick}>Click Me</button>;
}`;

const useStateHookCode = `const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Count: {count}</button>`;

const useEffectHookCode = `useEffect(() => {
  console.log('Component Rendered');
}, [count]);
// [] -> runs once (mount)
// [count] -> runs when count changes
// no array -> runs after every render`;

const useRefHookCode = `const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();
<input ref={inputRef} type="text" />`;

const useMemoHookCode = `const result = useMemo(() => {
  return num * 2; // expensive calculation
}, [num]); // only recomputed when num changes`;

const useCallbackHookCode = `const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []); // memoized function reference

<Child onClick={handleClick} />`;

const customHookCode = `// useWindowSize.js
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// usage
const { width, height } = useWindowSize();`;

const parentToChildCode = `function Parent() {
  return <Child name="Zaid" age={25} />;
}
function Child(props) {
  return <h2>{props.name} - {props.age}</h2>;
}`;

const childToParentCode = `function Parent() {
  const handleData = (data) => console.log(data);
  return <Child sendData={handleData} />;
}
function Child({ sendData }) {
  return <button onClick={() => sendData('Hi Parent!')}>Send</button>;
}`;

const contextApiCode = `const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

// in any descendant
const theme = useContext(ThemeContext);`;

const controlledUncontrolledCode = `// Controlled — React state owns the value
const [name, setName] = useState('');
<input value={name} onChange={(e) => setName(e.target.value)} />

// Uncontrolled — DOM owns the value, read via ref
const nameRef = useRef();
<input ref={nameRef} />
<button onClick={() => console.log(nameRef.current.value)}>Get</button>`;

const routerSetupCode = `npm install react-router-dom

import { BrowserRouter } from 'react-router-dom';
<BrowserRouter>
  <App />
</BrowserRouter>`;

const routesCode = `import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} /> {/* keep last */}
</Routes>`;

const linkNavLinkCode = `<Link to="/about">About</Link>

<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
  Home
</NavLink>`;

const useNavigateCode = `const navigate = useNavigate();
const handleLogout = () => navigate('/login');`;

const routeParamsCode = `<Route path="/user/:id" element={<User />} />

function User() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}`;

const nestedRoutesCode = `<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
// Dashboard renders <Outlet /> where children show up`;

const protectedRouteCode = `function RequireAuth({ children }) {
  const isAuth = localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/login" />;
}

<Route path="/dashboard" element={
  <RequireAuth><Dashboard /></RequireAuth>
} />`;

const localGlobalStateCode = `// Local — useState, private to the component
const [count, setCount] = useState(0);

// Global — Context API / Redux / Zustand, shared across app`;

const zustandCode = `import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const { count, increment } = useStore();`;

const reactQueryCode = `import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
  });
}`;

const fetchAxiosCode = `// Fetch API — built-in
fetch(url).then((res) => res.json()).then(setData).catch(setError);

// Axios — cleaner syntax, auto JSON, throws on non-2xx
axios.get(url).then((res) => setData(res.data)).catch(setError);`;

const asyncAwaitCode = `async function getPosts() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Something went wrong');
    const data = await res.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}`;

const crudCode = `// CREATE
axios.post(API_URL, newData);
// READ
axios.get(API_URL);
// UPDATE
axios.put(\`\${API_URL}/\${id}\`, updatedData);
// DELETE
axios.delete(\`\${API_URL}/\${id}\`);`;

const customApiHookCode = `// useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}`;

const reactMemoCode = `const User = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>;
}); // skips re-render if props are unchanged (shallow compare)`;

const lazySuspenseCode = `const Dashboard = React.lazy(() => import('./Dashboard'));

<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>`;

const debounceCode = `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const handleSearch = debounce((value) => console.log(value), 500);`;

const avoidRerenderCode = `// Bad — new object every render, breaks memo/reference equality
<Child data={{ name: 'Zaid' }} />

// Good — stable reference
const user = useMemo(() => ({ name: 'Zaid' }), []);
<Child data={user} />`;

const folderStructureCode = `my-react-app/
├─ public/
├─ src/
│  ├─ assets/       # images, fonts, svgs
│  ├─ components/   # reusable UI components
│  ├─ pages/        # page-level components
│  ├─ features/     # feature-based modules
│  ├─ hooks/        # custom hooks
│  ├─ services/     # API calls
│  ├─ store/        # Redux/Zustand global state
│  ├─ utils/        # helper functions
│  ├─ constants/    # constant values
│  ├─ styles/       # global styles/themes
│  ├─ App.tsx
│  └─ main.tsx
├─ .env
└─ package.json`;

const envCode = `# .env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=ReactApp
VITE_ENV=development`;

const buildDeployCode = `npm run build     # optimized production build
# or
yarn build

# Vercel/Netlify: connect GitHub repo -> auto-detect -> every push = new deploy`;

const Cheatsheet = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Reference
        </p>
        <h1 className="text-2xl font-bold text-white">React.js Cheatsheet</h1>
        <p className="text-slate-400">
          Quick-reference summary of everything across the 7 days — fundamentals,
          hooks, communication, routing, state, APIs, performance, structure and
          deployment.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2 rounded-lg border border-slate-800 bg-slate-900 p-3">
        {navItems.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-sky-600 hover:text-white"
          >
            {i + 1}. {item.label}
          </a>
        ))}
      </nav>

      <Section id="overview" index={1} title="What is React?">
        <p className="text-slate-300">
          React is a JavaScript library for building user interfaces, especially
          fast, dynamic single-page applications (SPAs).
        </p>
        <SubHeading>Features</SubHeading>
        <CodeBlock code={featuresCode} />
        <SubHeading>Virtual DOM</SubHeading>
        <p className="text-slate-300">
          React keeps a lightweight copy of the real DOM. On a data change it
          diffs the old vs new virtual tree and patches only what actually
          changed in the real DOM — instead of re-rendering everything.
        </p>
        <SubHeading>SPA flow</SubHeading>
        <p className="text-slate-300">
          Page load → React app loads → components render → navigation happens
          without a full reload → only the necessary parts update.
        </p>
      </Section>

      <Section id="fundamentals" index={2} title="React Fundamentals">
        <SubHeading>Functional vs Class components</SubHeading>
        <CodeBlock code={functionalVsClassCode} />
        <SubHeading>Props &amp; State</SubHeading>
        <CodeBlock code={propsStateCode} />
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>Props are read-only, passed parent → child.</li>
          <li>
            State is private/local to a component; changing it re-renders that
            component.
          </li>
        </ul>
        <SubHeading>Event handling</SubHeading>
        <CodeBlock code={eventHandlingCode} />
        <p className="text-slate-300">
          Events are camelCase (<code className="text-sky-300">onClick</code>,{" "}
          <code className="text-sky-300">onChange</code>) and take a function{" "}
          <strong className="text-slate-100">reference</strong>, not a string.
        </p>
      </Section>

      <Section id="hooks" index={3} title="React Hooks">
        <SubHeading>useState</SubHeading>
        <CodeBlock code={useStateHookCode} />
        <SubHeading>useEffect</SubHeading>
        <CodeBlock code={useEffectHookCode} />
        <SubHeading>useRef</SubHeading>
        <CodeBlock code={useRefHookCode} />
        <p className="text-slate-300">
          Mutable value that persists across renders and does{" "}
          <strong className="text-slate-100">not</strong> trigger a re-render
          when changed — commonly used to reach DOM nodes.
        </p>
        <SubHeading>useMemo</SubHeading>
        <CodeBlock code={useMemoHookCode} />
        <SubHeading>useCallback</SubHeading>
        <CodeBlock code={useCallbackHookCode} />
        <SubHeading>Custom hooks</SubHeading>
        <CodeBlock code={customHookCode} />
        <div className="rounded-lg border border-sky-900 bg-sky-950/40 p-4 text-sm text-slate-300">
          <strong className="text-sky-300">Rules of Hooks:</strong> only call
          hooks at the top level (never in loops/conditions/nested functions),
          and only from React function components or other custom hooks.
        </div>
      </Section>

      <Section id="communication" index={4} title="Component Communication">
        <SubHeading>Parent → Child (props)</SubHeading>
        <CodeBlock code={parentToChildCode} />
        <SubHeading>Child → Parent (callback prop)</SubHeading>
        <CodeBlock code={childToParentCode} />
        <SubHeading>Sibling ↔ Sibling</SubHeading>
        <p className="text-slate-300">
          Siblings can't talk directly — lift the shared state to their common
          parent, then pass it down as props to both.
        </p>
        <SubHeading>Context API (skip props drilling)</SubHeading>
        <CodeBlock code={contextApiCode} />
        <SubHeading>Controlled vs Uncontrolled inputs</SubHeading>
        <CodeBlock code={controlledUncontrolledCode} />
        <Table
          headers={["Use case", "Best choice"]}
          rows={[
            ["Parent → child data", "Props"],
            ["Child → parent event", "Callback prop"],
            ["Global data (theme, user, lang)", "Context API"],
            ["Multiple siblings need same state", "Lift state up"],
          ]}
        />
      </Section>

      <Section id="routing" index={5} title="Routing & Navigation">
        <SubHeading>Setup</SubHeading>
        <CodeBlock code={routerSetupCode} />
        <SubHeading>Routes &amp; Route</SubHeading>
        <CodeBlock code={routesCode} />
        <SubHeading>Link vs NavLink</SubHeading>
        <CodeBlock code={linkNavLinkCode} />
        <SubHeading>useNavigate (programmatic)</SubHeading>
        <CodeBlock code={useNavigateCode} />
        <SubHeading>Route params</SubHeading>
        <CodeBlock code={routeParamsCode} />
        <SubHeading>Nested routes</SubHeading>
        <CodeBlock code={nestedRoutesCode} />
        <SubHeading>Protected routes</SubHeading>
        <CodeBlock code={protectedRouteCode} />
        <p className="text-slate-300">
          Always keep the wildcard{" "}
          <code className="text-sky-300">path="*"</code> 404 route{" "}
          <strong className="text-slate-100">last</strong>, otherwise it
          matches everything before it.
        </p>
      </Section>

      <Section id="state" index={6} title="State Management">
        <SubHeading>Local vs Global vs Server state</SubHeading>
        <CodeBlock code={localGlobalStateCode} />
        <SubHeading>Zustand (lightweight global store)</SubHeading>
        <CodeBlock code={zustandCode} />
        <SubHeading>Server state (React Query)</SubHeading>
        <CodeBlock code={reactQueryCode} />
        <Table
          headers={["Use case", "Best choice"]}
          rows={[
            ["Simple component state", "useState"],
            ["Share state across a few components", "Context API"],
            ["Large app, complex state", "Redux Toolkit"],
            ["Lightweight & easy global state", "Zustand"],
            ["Complex state with derived data", "Recoil"],
            ["Data fetched from server", "React Query"],
          ]}
        />
        <p className="text-slate-300">
          Golden rule: don't overcomplicate — start with{" "}
          <code className="text-sky-300">useState</code>/Context, reach for
          Redux/Zustand only when the app actually needs it.
        </p>
      </Section>

      <Section id="api" index={7} title="API Integration">
        <SubHeading>Fetch vs Axios</SubHeading>
        <CodeBlock code={fetchAxiosCode} />
        <SubHeading>Async/await + error handling</SubHeading>
        <CodeBlock code={asyncAwaitCode} />
        <SubHeading>CRUD with Axios</SubHeading>
        <CodeBlock code={crudCode} />
        <SubHeading>Custom API hook</SubHeading>
        <CodeBlock code={customApiHookCode} />
        <Table
          headers={["Feature", "Fetch API", "Axios", "React Query"]}
          rows={[
            ["Built-in", "Yes", "No", "No"],
            ["Ease of use", "Medium", "Easy", "Very easy"],
            ["Error handling", "Manual", "Automatic (non-2xx)", "Automatic"],
            ["Caching", "No", "No", "Yes"],
            ["Best for", "Small apps", "Most apps", "Large apps"],
          ]}
        />
      </Section>

      <Section id="performance" index={8} title="Performance Optimization">
        <SubHeading>React.memo / useMemo / useCallback</SubHeading>
        <CodeBlock code={reactMemoCode} />
        <p className="text-slate-300">
          <code className="text-sky-300">React.memo</code> skips re-rendering a
          component when its props haven't changed;{" "}
          <code className="text-sky-300">useMemo</code> memoizes a{" "}
          <em>value</em>; <code className="text-sky-300">useCallback</code>{" "}
          memoizes a <em>function reference</em>.
        </p>
        <SubHeading>Lazy loading + Suspense</SubHeading>
        <CodeBlock code={lazySuspenseCode} />
        <SubHeading>Debouncing</SubHeading>
        <CodeBlock code={debounceCode} />
        <SubHeading>Avoid unnecessary re-renders</SubHeading>
        <CodeBlock code={avoidRerenderCode} />
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>Virtualize long lists (react-window / react-virtualized).</li>
          <li>
            Measure first with React DevTools Profiler / Lighthouse before
            optimizing.
          </li>
          <li>Golden rule: optimize what matters, not everything.</li>
        </ul>
      </Section>

      <Section id="structure" index={9} title="Project Structure">
        <SubHeading>Recommended folder layout</SubHeading>
        <CodeBlock code={folderStructureCode} />
        <SubHeading>Environment variables</SubHeading>
        <CodeBlock code={envCode} />
        <Table
          headers={["Convention", "Example"]}
          rows={[
            ["Components", "PascalCase — UserCard.tsx"],
            ["Hooks", "camelCase with 'use' prefix — useAuth.ts"],
            ["Files/variables", "camelCase — userService.ts"],
            ["Constants", "UPPER_SNAKE_CASE — API_URL"],
            ["Folders", "kebab-case — user-profile/"],
          ]}
        />
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>Keep components small, focused, and reusable.</li>
          <li>Keep UI and business logic separate.</li>
          <li>Use absolute imports with a path alias (e.g. @/components).</li>
        </ul>
      </Section>

      <Section id="deployment" index={10} title="Deployment & Next Steps">
        <SubHeading>Build &amp; deploy</SubHeading>
        <CodeBlock code={buildDeployCode} />
        <SubHeading>Post-deployment checklist</SubHeading>
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>Test all core flows and routes.</li>
          <li>Verify API integrations and env vars (never commit secrets).</li>
          <li>Enable HTTPS, add favicon &amp; meta tags.</li>
          <li>Monitor performance/errors (Sentry, LogRocket, Vercel Analytics).</li>
        </ul>
        <SubHeading>What's next</SubHeading>
        <Table
          headers={["Area", "Topics"]}
          rows={[
            ["State management", "Deep dive into Redux Toolkit / Zustand"],
            ["Testing", "Unit testing (Jest), component testing (RTL)"],
            ["TypeScript", "Type-safe components, better DX"],
            ["Performance", "Code splitting, memoization, React Profiler"],
            ["Advanced", "Custom hooks, Context API, error boundaries"],
          ]}
        />
        <div className="rounded-lg border border-sky-900 bg-sky-950/40 p-4 text-sm text-slate-300">
          <strong className="text-sky-300">Remember:</strong> consistency
          beats talent — code a little every day.
        </div>
      </Section>
    </div>
  );
};

export default Cheatsheet;
