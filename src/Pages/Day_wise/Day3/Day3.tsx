import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "./Day3.scss";

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
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-sky-400">{title}</h2>
    {children}
  </section>
);

const DemoCard = ({ children }: { children: ReactNode }) => (
  <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-5">
    {children}
  </div>
);

/* ---------- useRef ---------- */

const focusInputCode = `function FocusInput() {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}`;

const stopwatchCode = `function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`;

const FocusInputDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <DemoCard>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Button click karke mujhe focus karo"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none"
        />
        <button
          onClick={() => inputRef.current?.focus()}
          className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
        >
          Focus Input
        </button>
      </div>
    </DemoCard>
  );
};

const StopwatchDemo = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    setRunning(true);
    intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  useEffect(() => stop, []);

  return (
    <DemoCard>
      <p className="text-2xl font-bold text-white">{seconds}s</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={start}
          className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Stop
        </button>
        <button
          onClick={() => {
            stop();
            setSeconds(0);
          }}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-slate-500">
        {running ? "Running — " : "Stopped — "}
        <code className="text-sky-300">intervalRef.current</code> change ho
        raha hai but koi re-render nahi ho raha uski wajah se (sirf{" "}
        <code className="text-sky-300">seconds</code> state hi UI update
        karti hai).
      </p>
    </DemoCard>
  );
};

/* ---------- useContext ---------- */

type ThemeName = "dark" | "light";

const ThemeContext = createContext<ThemeName>("dark");

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button
      className={
        theme === "dark"
          ? "rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm font-medium text-slate-100"
          : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900"
      }
    >
      Click me ({theme} theme)
    </button>
  );
};

const Toolbar = () => (
  <div className="rounded-md border border-dashed border-slate-700 p-3">
    <p className="mb-2 text-xs text-slate-500">
      Toolbar — theme yahan se pass hi nahi hui
    </p>
    <ThemedButton />
  </div>
);

const themeContextCode = `const ThemeContext = createContext('light');

function App() {
  const [theme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />; // theme yaha se pass hi nahi karna pada
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}`;

const ThemeDemo = () => {
  const [theme, setTheme] = useState<ThemeName>("dark");
  return (
    <DemoCard>
      <button
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
      >
        Toggle theme (currently: {theme})
      </button>
      <ThemeContext.Provider value={theme}>
        <Toolbar />
      </ThemeContext.Provider>
    </DemoCard>
  );
};

/* ---------- useMemo ---------- */

type Product = { id: number; name: string };

const sampleProducts: Product[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Wireless Mouse" },
  { id: 3, name: "Mechanical Keyboard" },
  { id: 4, name: "4K Monitor" },
  { id: 5, name: "USB-C Hub" },
  { id: 6, name: "Webcam" },
];

const productListCode = `function ProductList({ products, searchTerm }) {
  const filtered = useMemo(() => {
    console.log('Filtering...'); // sirf products/searchTerm change par chalega
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}`;

const MemoDemo = () => {
  const [search, setSearch] = useState("");
  const [unrelatedClicks, setUnrelatedClicks] = useState(0);
  const recomputeCount = useRef(0);

  const filtered = useMemo(() => {
    recomputeCount.current += 1;
    return sampleProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <DemoCard>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none"
        />
        <button
          onClick={() => setUnrelatedClicks((c) => c + 1)}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Unrelated re-render ({unrelatedClicks})
        </button>
      </div>
      <p className="text-xs text-slate-500">
        Filter recalculated:{" "}
        <span className="text-sky-300">{recomputeCount.current}</span> times
      </p>
      <ul className="space-y-1 text-sm text-slate-200">
        {filtered.map((p) => (
          <li
            key={p.id}
            className="rounded-md border border-slate-800 bg-slate-800/40 px-3 py-1.5"
          >
            {p.name}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-slate-600">Koi match nahi mila</li>
        )}
      </ul>
      <p className="text-xs text-slate-500">
        "Unrelated re-render" dabao — component re-render hoga lekin{" "}
        <code className="text-sky-300">search</code> same rehne ki wajah se
        recompute count nahi badhega.
      </p>
    </DemoCard>
  );
};

/* ---------- useCallback ---------- */

const callbackCode = `const Button = React.memo(({ onClick, label }) => {
  console.log(\`Rendering \${label}\`);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = useCallback(() => setCount(c => c + 1), []);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Button onClick={handleClick} label="Increment" />
      <p>Count: {count}</p>
    </>
  );
}`;

const MemoButton = memo(function MemoButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2">
      <button
        onClick={onClick}
        className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
      >
        {label}
      </button>
      <span className="font-mono text-xs text-slate-400">
        renders: {renderCount.current}
      </span>
    </div>
  );
});

const CallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClickMemoized = useCallback(() => setCount((c) => c + 1), []);
  const handleClickPlain = () => setCount((c) => c + 1);

  return (
    <DemoCard>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here — Parent re-render trigger karta hai"
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none"
      />
      <p className="text-sm text-slate-400">
        Count: <span className="text-sky-300">{count}</span>
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            useCallback wrapped
          </p>
          <MemoButton onClick={handleClickMemoized} label="Increment" />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Plain function (naya reference har render)
          </p>
          <MemoButton onClick={handleClickPlain} label="Increment" />
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Text box mein type karo — left button ka render count same rahega,
        right wala har keystroke pe badhega.
      </p>
    </DemoCard>
  );
};

/* ---------- useReducer ---------- */

type CounterState = { count: number; step: number };
type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

const counterInitialState: CounterState = { count: 0, step: 1 };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return counterInitialState;
    default:
      return state;
  }
}

const reducerCode = `const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep': return { ...state, step: action.payload };
    case 'reset': return initialState;
    default: throw new Error('Unknown action');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`;

const ReducerCounterDemo = () => {
  const [state, dispatch] = useReducer(counterReducer, counterInitialState);

  return (
    <DemoCard>
      <p className="text-2xl font-bold text-white">{state.count}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          -{state.step}
        </button>
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
        >
          +{state.step}
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Reset
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-400">
          Step:
          <input
            type="number"
            min={1}
            value={state.step}
            onChange={(e) =>
              dispatch({
                type: "setStep",
                payload: Math.max(1, Number(e.target.value) || 1),
              })
            }
            className="w-16 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
      </div>
      <p className="text-xs text-slate-500">
        <code className="text-sky-300">dispatch({"{ type: 'increment' }"})</code>{" "}
        bilkul Redux ke action dispatch jaisa lagta hai — useReducer
        basically Redux ka "local" version hai.
      </p>
    </DemoCard>
  );
};

/* ---------- recap table ---------- */

const recapRows = [
  {
    hook: "useRef",
    kaam: "Re-render ke bina mutable value / DOM access",
    kab: "Focus, timer, previous value",
  },
  {
    hook: "useContext",
    kaam: "Prop drilling avoid",
    kab: "Theme, auth, global config",
  },
  {
    hook: "useMemo",
    kaam: "Expensive value cache",
    kab: "Heavy computation",
  },
  {
    hook: "useCallback",
    kaam: "Function reference cache",
    kab: "Memoized child ko function pass karna",
  },
  {
    hook: "useReducer",
    kaam: "Complex state logic",
    kab: "Multiple related actions",
  },
];

const Day3 = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Day 3
        </p>
        <h1 className="text-2xl font-bold text-white">
          5 Advanced Hooks — useRef, useContext, useMemo, useCallback,
          useReducer
        </h1>
        <p className="text-slate-400">
          Aaj ke 5 hooks thode advanced hain, but har ek ka ek specific
          problem solve karta hai.
        </p>
      </header>

      <Section title="1. useRef">
        <p className="text-slate-300">
          useRef ek "box" hai jisme value store hoti hai jo{" "}
          <strong className="text-slate-100">re-render trigger nahi
          karti</strong>. Do main use hain: DOM element access karna, ya koi
          mutable value renders ke beech persist karna.
        </p>
        <p className="text-slate-300">
          Angular mein tumne <code className="text-sky-300">@ViewChild</code>{" "}
          use kiya hoga DOM element access karne ke liye — useRef bilkul
          wahi kaam karta hai:
        </p>
        <CodeBlock code={focusInputCode} />
        <FocusInputDemo />
        <p className="text-slate-300">Doosra common use — timer/interval id store karna:</p>
        <CodeBlock code={stopwatchCode} />
        <StopwatchDemo />
        <p className="text-slate-300">
          <code className="text-sky-300">intervalRef.current</code> change
          hota rehta hai but koi re-render nahi hota — yahi core idea hai.
        </p>
        <div className="space-y-1 text-slate-300">
          <p>
            <strong className="text-slate-100">Kab use karo:</strong> DOM
            manipulation (focus/scroll/measure), timer id store karna,
            previous value yaad rakhna.
          </p>
          <p>
            <strong className="text-slate-100">Kab mat karo:</strong> Agar
            value UI mein dikhni hai (jaise koi counter), useState use karo —
            useRef change hone par UI update hi nahi karta, so screen stale
            reh jayegi.
          </p>
        </div>
      </Section>

      <Section title="2. useContext">
        <p className="text-slate-300">
          Angular mein service ko root mein provide karke kahin bhi inject
          kar lete ho, without manually har component se pass kiye. useContext
          React ka wahi solution hai — "prop drilling" (5 levels deep prop
          pass karna) avoid karne ke liye.
        </p>
        <CodeBlock code={themeContextCode} />
        <ThemeDemo />
        <div className="space-y-1 text-slate-300">
          <p>
            <strong className="text-slate-100">Kab use karo:</strong>{" "}
            Global-ish data jo bahut components ko chahiye — theme,
            logged-in user, language.
          </p>
          <p>
            <strong className="text-slate-100">Kab mat karo:</strong> Data
            sirf 1-2 level deep jana ho to plain props hi simpler hain. Aur
            agar context value frequently change hoti hai, sab consumers
            re-render honge — bade apps mein complex state ke liye
            Redux/RTK (jo tum next seekhne wale ho) better fit hai.
          </p>
        </div>
      </Section>

      <Section title="3. useMemo">
        <p className="text-slate-300">
          Expensive calculation ka result "cache" kar leta hai — sirf tab
          recalculate karta hai jab dependencies change hon.
        </p>
        <CodeBlock code={productListCode} />
        <MemoDemo />
        <p className="text-slate-300">
          Agar ye component kisi unrelated state (jaise dropdown open/close)
          ki wajah se re-render ho, useMemo ke bina filter har baar chalega
          even jab products/searchTerm same hain.
        </p>
        <div className="space-y-1 text-slate-300">
          <p>
            <strong className="text-slate-100">Kab use karo:</strong>{" "}
            Genuinely heavy calculations (large array filter/sort), ya
            referential equality maintain karni ho (jaise useEffect
            dependency mein object pass karna).
          </p>
          <p>
            <strong className="text-slate-100">Kab mat karo:</strong> Simple
            calculations ke liye mat lagao — useMemo khud bhi overhead leta
            hai. Har jagah lagana premature optimization hai.
          </p>
        </div>
      </Section>

      <Section title="4. useCallback">
        <p className="text-slate-300">
          Value nahi, <strong className="text-slate-100">function</strong> ko
          memoize karta hai — same reference return karta hai jab tak
          dependencies change nahi hoti.
        </p>
        <CodeBlock code={callbackCode} />
        <CallbackDemo />
        <div className="space-y-1 text-slate-300">
          <p>
            <strong className="text-slate-100">Kab use karo:</strong>{" "}
            Function ko <code className="text-sky-300">React.memo</code> wale
            child ko pass kar rahe ho, ya function kisi hook ke dependency
            array mein hai.
          </p>
          <p>
            <strong className="text-slate-100">Kab mat karo:</strong> Agar
            child memoized nahi hai, koi fayda nahi — bas extra complexity.
            Har function ko wrap karna anti-pattern hai.
          </p>
        </div>
      </Section>

      <Section title="5. useReducer">
        <p className="text-slate-300">
          State complex ho jaye — multiple related fields, ya next state
          action par depend kare — tab useReducer better hai. Ye bilkul Redux
          jaisa pattern hai (action → reducer → new state), so ye tumhare
          liye perfect stepping stone hai Redux ke liye.
        </p>
        <CodeBlock code={reducerCode} />
        <ReducerCounterDemo />
        <div className="space-y-1 text-slate-300">
          <p>
            <strong className="text-slate-100">Kab use karo:</strong> State
            object complex ho, next-state logic mein switch/if-else ho,
            multiple actions state update karte hon.
          </p>
          <p>
            <strong className="text-slate-100">Kab mat karo:</strong> Simple
            state (ek boolean/string/number) ke liye useState hi kaafi hai —
            useReducer sirf boilerplate badhayega.
          </p>
        </div>
      </Section>

      <Section title="Quick recap">
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400">
                <th className="px-4 py-2 font-semibold">Hook</th>
                <th className="px-4 py-2 font-semibold">Kaam</th>
                <th className="px-4 py-2 font-semibold">Kab</th>
              </tr>
            </thead>
            <tbody>
              {recapRows.map((row) => (
                <tr key={row.hook} className="border-t border-slate-800">
                  <td className="px-4 py-2 font-mono text-xs text-sky-300">
                    {row.hook}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-200">
                    {row.kaam}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-200">
                    {row.kab}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Din 3 ka core wrap">
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>
            <code className="text-sky-300">useRef</code> aur{" "}
            <code className="text-sky-300">useContext</code> re-render ke
            control aur data-sharing ke liye hain
          </li>
          <li>
            <code className="text-sky-300">useMemo</code> aur{" "}
            <code className="text-sky-300">useCallback</code> dono
            performance-optimization hooks hain — value vs function memoize
            karte hain
          </li>
          <li>
            <code className="text-sky-300">useReducer</code>{" "}
            <code className="text-sky-300">useState</code> ka complex-state
            version hai — action/reducer pattern Redux se seedha milta hai
          </li>
        </ul>
        <div className="rounded-lg border border-sky-900 bg-sky-950/40 p-4 text-sm text-slate-300">
          <strong className="text-sky-300">Aage kya:</strong> Din 4 mein
          Redux/Redux Toolkit shuru hoga — useReducer ke baad wo transition
          kaafi smooth lagega.
        </div>
      </Section>
    </div>
  );
};

export default Day3;
