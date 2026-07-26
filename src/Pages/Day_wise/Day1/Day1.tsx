import { useRef, useState, type ReactNode } from "react";
import "./Day1.scss";
import { Minus, Plus } from "lucide-react";

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

const counterAngularCode = `@Component({
  selector: 'app-counter',
  template: \`
    <p>Count: {{ count }}</p>
    <button (click)="decrement()">-1</button>
    <button (click)="reset()">Reset</button>
    <button (click)="increment()">+1</button>
  \`
})
export class CounterComponent {
  count = 0;
  increment() { this.count++; }
  decrement() { this.count--; }
  reset() { this.count = 0; }
}`;

const counterReactCode = `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+1</button>
    </div>
  );
}`;

const useStateSyntaxCode = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 0 = initial value
  // count = current value, setCount = update karne ka function
}`;

const functionalUpdateProblemCode = `// Problem
function incrementTwice() {
  setCount(count + 1);
  setCount(count + 1);
  // dono calls "count" ki SAME purani value use karte hain (closure ki wajah se)
  // result: +1 hoga, +2 nahi!
}`;

const functionalUpdateFixCode = `// Sahi tareeka
function incrementTwice() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // har call ko latest value milti hai — result: +2
}`;

const toggleAngularCode = `@Component({
  selector: 'app-toggle',
  template: \`<button (click)="toggle()">{{ isOn ? 'ON' : 'OFF' }}</button>\`
})
export class ToggleComponent {
  isOn = false;
  toggle() { this.isOn = !this.isOn; }
}`;

const toggleReactCode = `function Toggle() {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(prev => !prev);

  return <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>;
}`;

const multipleStateCode = `function CounterWithToggle() {
  const [count, setCount] = useState(0);   // pehla independent state
  const [isOn, setIsOn] = useState(false); // doosra independent state
}`;

const eventHandlingRows = [
  { label: "Click", angular: `(click)="handleClick()"`, react: `onClick={handleClick}` },
  {
    label: "Argument ke saath",
    angular: `(click)="handleClick($event)"`,
    react: `onClick={(e) => handleClick(e)}`,
  },
  {
    label: "Input change",
    angular: `(input)="onChange($event)"`,
    react: `onChange={(e) => onChange(e)}`,
  },
];

const CounterToggleDemo = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-base text-slate-100">Count: {count}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : prev))}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            <Minus />
          </button>
          <button
            onClick={() => setCount(0)}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            Reset
          </button>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-base text-slate-100">Toggle:</span>
        <button
          onClick={() => setIsOn((prev) => !prev)}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
            isOn ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"
          }`}
        >
          {isOn ? "ON" : "OFF"}
        </button>
      </div>

      <p className="border-t border-slate-800 pt-3 text-xs text-slate-500">
        Re-renders so far: <span className="text-slate-300">{renderCount.current}</span> —
        count ya toggle, dono state change poore component ko re-render karte hain.
      </p>
    </div>
  );
};

const Day1 = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Day 1
        </p>
        <h1 className="text-2xl font-bold text-white">
          Foundation Pakki + useState + Events
        </h1>
        <p className="text-slate-400">
          Hooks se hi karte hain, kyunki Redux mein jaane se pehle
          useState/useEffect ka pakka base chahiye. Chalo Angular se compare
          karke samajhte hain.
        </p>
      </header>

      <Section title="Core mental model: Angular vs React">
        <ul className="space-y-3 text-slate-300">
          <li>
            <span className="font-semibold text-slate-100">Angular:</span>{" "}
            Component class mein <code className="text-sky-300">count = 0</code>{" "}
            jaisi plain property hoti hai. <code className="text-sky-300">this.count++</code>{" "}
            likhte hi Angular ka change detection (zone.js) khud pata laga
            leta hai ki kuch badla hai, aur template update ho jata hai. Tumhe
            kuch "trigger" nahi karna padta.
          </li>
          <li>
            <span className="font-semibold text-slate-100">React:</span>{" "}
            State ek special value hai jo <code className="text-sky-300">useState</code>{" "}
            se milti hai, aur ise directly mutate <strong>nahi</strong> kar
            sakte (<code className="text-sky-300">count++</code> kaam nahi
            karega). Har change ke liye ek setter function call karna padta
            hai — usi call se React ko pata chalta hai "is component ko naye
            value ke saath re-render karo."
          </li>
        </ul>
      </Section>

      <Section title="useState — syntax">
        <CodeBlock code={useStateSyntaxCode} />
        <p className="text-slate-300">
          <code className="text-sky-300">useState(initialValue)</code> ek
          array return karta hai — current value aur uska setter.{" "}
          <code className="text-sky-300">[thing, setThing]</code> naming
          convention hai, tum kuch bhi naam de sakte ho.
        </p>
      </Section>

      <Section title="Example 1: Counter">
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Angular" code={counterAngularCode} />
          <CodeBlock label="React" code={counterReactCode} />
        </div>
        <p className="text-slate-300">
          <code className="text-sky-300">this.count++</code> (Angular) vs{" "}
          <code className="text-sky-300">setCount(prev =&gt; prev + 1)</code>{" "}
          (React) — yahi core shift hai.
        </p>
      </Section>

      <Section title="Functional updates — prev => prev + 1 kyun, count + 1 kyun nahi?">
        <p className="text-slate-300">
          Dono normal case mein kaam karte dikhenge, lekin ek trap hai:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock code={functionalUpdateProblemCode} />
          <CodeBlock code={functionalUpdateFixCode} />
        </div>
        <p className="text-slate-300">
          Rule of thumb:{" "}
          <strong className="text-slate-100">
            jab naya state purane state pe depend kare, functional form use
            karo.
          </strong>{" "}
          Angular mein yeh dikkat aati nahi kyunki{" "}
          <code className="text-sky-300">this.count++</code> hamesha current
          property ko directly mutate karta hai — koi stale closure nahi.
        </p>
      </Section>

      <Section title="Example 2: Toggle button (+ multiple state variables)">
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="Angular" code={toggleAngularCode} />
          <CodeBlock label="React" code={toggleReactCode} />
        </div>
        <p className="text-slate-300">
          Agar counter aur toggle ek hi component mein chahiye:
        </p>
        <CodeBlock code={multipleStateCode} />
        <p className="text-slate-300">
          Yehi hai <strong className="text-slate-100">multiple state variables</strong>{" "}
          — Angular mein bas do class properties (
          <code className="text-sky-300">count = 0; isOn = false;</code>),
          React mein har independent piece ke liye alag{" "}
          <code className="text-sky-300">useState</code> call. Dono states ek
          doosre se bilkul independent hain.
        </p>
      </Section>

      <Section title="Event handling — syntax farak">
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400">
                <th className="px-4 py-2 font-semibold"></th>
                <th className="px-4 py-2 font-semibold">Angular</th>
                <th className="px-4 py-2 font-semibold">React</th>
              </tr>
            </thead>
            <tbody>
              {eventHandlingRows.map((row) => (
                <tr key={row.label} className="border-t border-slate-800">
                  <td className="px-4 py-2 text-slate-300">{row.label}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-200">
                    {row.angular}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-200">
                    {row.react}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-2 text-slate-300">
          <p>Do cheezein yaad rakho:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Angular mein event naam parentheses mein hai aur value ek{" "}
              <strong className="text-slate-100">string expression</strong>{" "}
              hai. React mein <code className="text-sky-300">onEventName</code>{" "}
              (camelCase, "on" prefix) aur curly braces mein{" "}
              <strong className="text-slate-100">actual JS function</strong>{" "}
              jaata hai.
            </li>
            <li>
              Sabse common mistake:{" "}
              <code className="text-sky-300">onClick={"{handleClick()}"}</code>{" "}
              — parentheses ke saath. Isse function turant call ho jayega
              render ke time, click pe nahi! Sahi:{" "}
              <code className="text-sky-300">onClick={"{handleClick}"}</code>{" "}
              (reference, bina call kiye) ya{" "}
              <code className="text-sky-300">
                onClick={"{() => handleClick(arg)}"}
              </code>{" "}
              (argument chahiye to).
            </li>
          </ol>
        </div>
      </Section>

      <Section title="Interactive demo">
        <p className="text-slate-300">
          Neeche ek chhota interactive demo hai — dono try karo aur
          "re-renders" count dekho har state change pe badhte hue:
        </p>
        <CounterToggleDemo />
        <p className="text-slate-300">
          Dekha — chahe count badle ya toggle flip ho, dono baar poora
          component "re-render" hota hai (isliye render count badhta rehta
          hai). Angular mein yeh cycle tumhe dikhta nahi kyunki change
          detection background mein chalta hai — React mein yeh explicit aur
          predictable hai.
        </p>
      </Section>

      <div className="rounded-lg border border-sky-900 bg-sky-950/40 p-4 text-sm text-slate-300">
        <strong className="text-sky-300">Bonus:</strong> agar tum naye
        Angular Signals use kar rahe ho (
        <code className="text-sky-300">count = signal(0)</code>), to woh
        actually React ke useState se kaafi milte-julte hain —{" "}
        <code className="text-sky-300">count.set(count() + 1)</code> lagbhag{" "}
        <code className="text-sky-300">setCount(prev =&gt; prev + 1)</code>{" "}
        jaisa hi feel deta hai. Classic property-based state (jo upar use
        kiya) abhi bhi zyada codebases mein common hai, isliye usi se shuru
        kiya.
      </div>

      <Section title="Din 1 ka core wrap">
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>
            <code className="text-sky-300">useState</code> = ek independent
            reactive value + uska setter
          </li>
          <li>
            Functional update tab use karo jab naya state purane pe depend
            kare
          </li>
          <li>
            React event handlers function <em>reference</em> hote hain,
            Angular jaisa string expression nahi
          </li>
        </ul>
      </Section>
    </div>
  );
};

export default Day1;
