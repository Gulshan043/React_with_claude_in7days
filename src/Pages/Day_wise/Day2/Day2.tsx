import { useEffect, useState, type ReactNode } from "react";
import "./Day2.scss";

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

const basicSyntaxCode = `useEffect(() => {
  // side effect code
  return () => {
    // cleanup code (optional)
  };
}, [dependencies]);`;

const case1Code = `useEffect(() => {
  console.log('har render ke baad chalega');
});`;

const case2Code = `useEffect(() => {
  console.log('component mount hua');
}, []);`;

const case3Code = `useEffect(() => {
  console.log('mount ya userId/filter badla');
}, [userId, filter]);`;

const cleanupIntervalCode = `useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id);
}, []);`;

const reactApiCode = `function UserProfile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(\`/api/users/\${userId}\`, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch user');
        setData(await res.json());
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchUser();
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{data.name}</p>;
}`;

const angularApiCode = `export class UserProfileComponent implements OnChanges, OnDestroy {
  @Input() userId!: string;
  data: any = null;
  loading = true;
  error: string | null = null;
  private sub?: Subscription;

  ngOnChanges() {
    this.sub?.unsubscribe();
    this.loading = true;
    this.error = null;
    this.sub = this.http.get(\`/api/users/\${this.userId}\`).subscribe({
      next: (res) => { this.data = res; this.loading = false; },
      error: (err) => { this.error = err.message; this.loading = false; }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}`;

const infiniteLoopCode = `useEffect(() => {
  setCount(count + 1);
}, [count]);
// count dependency hai aur yehi effect use update kar raha hai — infinite loop`;

const lifecycleRows = [
  { angular: "ngOnInit", react: "useEffect(() => {...}, [])" },
  { angular: "ngOnChanges", react: "useEffect(() => {...}, [prop1, prop2])" },
  { angular: "ngOnDestroy", react: "cleanup: return () => {...}" },
  {
    angular: "ngDoCheck (approx.)",
    react: "useEffect(() => {...}) — no array, rarely used",
  },
];

const EffectChild = ({
  dep,
  addLog,
}: {
  dep: number;
  addLog: (msg: string) => void;
}) => {
  useEffect(() => {
    addLog(`effect ran → dep = ${dep}`);
    return () => {
      addLog(`cleanup ran → dep = ${dep}`);
    };
  }, [dep, addLog]);

  return (
    <div className="rounded-md border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-200">
      Child mounted, dep = <span className="text-sky-300">{dep}</span>
    </div>
  );
};

const EffectTimingDemo = () => {
  const [dep, setDep] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  return (
    <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setDep((d) => d + 1)}
          className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
        >
          Change dependency (dep++)
        </button>
        <button
          onClick={() => setMounted((m) => !m)}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          {mounted ? "Unmount child" : "Mount child"}
        </button>
        <button
          onClick={() => setLogs([])}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
        >
          Clear log
        </button>
      </div>

      {mounted ? (
        <EffectChild dep={dep} addLog={addLog} />
      ) : (
        <div className="rounded-md border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-500">
          Child unmounted
        </div>
      )}

      <div className="h-40 overflow-y-auto rounded-md border border-slate-800 bg-black/40 p-3 font-mono text-xs">
        {logs.length === 0 ? (
          <p className="text-slate-600">Log khaali hai — upar button dabao</p>
        ) : (
          logs.map((log, i) => (
            <p
              key={i}
              className={
                log.startsWith("cleanup") ? "text-rose-400" : "text-emerald-400"
              }
            >
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

const Day2 = () => {
  return (
    <div className="mx-auto px-5 space-y-10 pb-16">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Day 2
        </p>
        <h1 className="text-2xl font-bold text-white">
          useEffect — Dependency Array aur Cleanup
        </h1>
        <p className="text-slate-400">
          React ka sabse confusing lekin sabse powerful hook, jab tak dependency
          array aur cleanup ka timing clear na ho jaye.
        </p>
      </header>

      <Section title="useEffect kyun chahiye — 'side effects'">
        <p className="text-slate-300">
          React component ka kaam hai UI return karna. Data fetch karna,
          timers, subscriptions, manually DOM touch karna — yeh sab{" "}
          <strong className="text-slate-100">side effects</strong> hain,
          rendering ka part nahi. <code className="text-sky-300">useEffect</code>{" "}
          inhe render ke <strong className="text-slate-100">baad</strong>,
          safely handle karne ka tareeka hai.
        </p>
        <p className="text-slate-300">
          Angular mein yeh cheez alag-alag{" "}
          <strong className="text-slate-100">named lifecycle hooks</strong>{" "}
          mein bant-ti hai — <code className="text-sky-300">ngOnInit</code>,{" "}
          <code className="text-sky-300">ngOnChanges</code>,{" "}
          <code className="text-sky-300">ngOnDestroy</code>. React mein ek hi
          hook hai — <code className="text-sky-300">useEffect</code> — jiska
          behavior <strong className="text-slate-100">dependency array</strong>{" "}
          se control hota hai.
        </p>
      </Section>

      <Section title="Basic syntax">
        <CodeBlock code={basicSyntaxCode} />
      </Section>

      <Section title="Dependency array — teeno cases">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-slate-300">
              <strong className="text-slate-100">Case 1: Array hi nahi</strong>
            </p>
            <CodeBlock code={case1Code} />
            <p className="mt-2 text-slate-300">
              Har render ke baad chalega, chahe koi state/prop badle ya na
              badle. Rarely use hota hai — performance-heavy ho sakta hai.
            </p>
          </div>

          <div>
            <p className="mb-2 text-slate-300">
              <strong className="text-slate-100">Case 2: Empty array []</strong>
            </p>
            <CodeBlock code={case2Code} />
            <p className="mt-2 text-slate-300">
              Sirf <strong className="text-slate-100">ek baar</strong> chalega —
              initial mount ke baad. Yeh Angular ke{" "}
              <code className="text-sky-300">ngOnInit</code> jaisa hai.
            </p>
          </div>

          <div>
            <p className="mb-2 text-slate-300">
              <strong className="text-slate-100">
                Case 3: Values ke saath [userId, filter]
              </strong>
            </p>
            <CodeBlock code={case3Code} />
            <p className="mt-2 text-slate-300">
              Mount ke baad ek baar, phir jab bhi <code className="text-sky-300">userId</code>{" "}
              YA <code className="text-sky-300">filter</code> mein se koi
              badle, dobara chalega. Angular ke{" "}
              <code className="text-sky-300">ngOnChanges</code> se milta julta
              hai — fark itna hai ki tumhe specific values list karni padti
              hain, poora <code className="text-sky-300">SimpleChanges</code>{" "}
              object nahi milta.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Cleanup function">
        <p className="text-slate-300">
          Agar <code className="text-sky-300">useEffect</code> ke andar se ek
          function <strong className="text-slate-100">return</strong> karo,
          woh uska cleanup hai — aur yeh do situations mein chalta hai:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-slate-300">
          <li>
            Agli baar effect re-run hone se{" "}
            <strong className="text-slate-100">theek pehle</strong>{" "}
            (dependency badalne par)
          </li>
          <li>
            Component <strong className="text-slate-100">unmount</strong> hone
            par
          </li>
        </ol>
        <p className="text-slate-300">
          Yahi important farak hai — Angular ka{" "}
          <code className="text-sky-300">ngOnDestroy</code> sirf ek baar
          (unmount pe) chalta hai, lekin React ka cleanup{" "}
          <strong className="text-slate-100">har re-run se pehle bhi</strong>{" "}
          chalta hai:
        </p>
        <CodeBlock code={cleanupIntervalCode} />
        <p className="text-slate-300">
          Agar <code className="text-sky-300">clearInterval</code> na karo,
          purana interval hamesha chalta rahega chahe component unmount ho
          jaye — classic memory leak.
        </p>
      </Section>

      <Section title="Interactive demo — effect/cleanup timing">
        <p className="text-slate-300">
          Dependency badlo ya component unmount karo, aur dekho effect/cleanup
          exactly kab fire hote hain:
        </p>
        <EffectTimingDemo />
        <p className="text-slate-300">
          Notice kiya? Dependency change pe pehle "cleanup ran" aata hai, phir
          naya "effect ran" — aur unmount pe sirf cleanup, koi naya effect
          nahi. Yehi timing Angular ke <code className="text-sky-300">ngOnChanges</code> +{" "}
          <code className="text-sky-300">ngOnDestroy</code> collectively
          karte hain, but React mein ek hi jagah.
        </p>
      </Section>

      <Section title="Real example — API call with loading/error state">
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock label="React" code={reactApiCode} />
          <CodeBlock label="Angular" code={angularApiCode} />
        </div>
        <div className="space-y-2 text-slate-300">
          <p>Key points:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <code className="text-sky-300">userId</code> dependency mein hai —
              badalte hi purani request cancel (<code className="text-sky-300">abort()</code>{" "}
              cleanup se) aur nayi shuru
            </li>
            <li>
              <code className="text-sky-300">AbortController</code> real
              cleanup use-case hai: agar <code className="text-sky-300">userId</code>{" "}
              fast badle ya component unmount ho jaye BEFORE response aaye,
              purani request cancel ho jati hai — warna race condition
              (purani, slow response late aakar nayi wali ko overwrite kar de)
            </li>
            <li>
              <code className="text-sky-300">finally</code> mein{" "}
              <code className="text-sky-300">setLoading(false)</code> se pehle{" "}
              <code className="text-sky-300">controller.signal.aborted</code>{" "}
              check kiya — agar request cancel ho chuki hai, state update mat
              karo, kyunki component shayad unmount ho chuka ho
            </li>
          </ul>
          <p>
            Dhyan do — Angular mein yeh logic{" "}
            <strong className="text-slate-100">do</strong> lifecycle hooks (
            <code className="text-sky-300">ngOnChanges</code> +{" "}
            <code className="text-sky-300">ngOnDestroy</code>) mein bant-ta
            hai. React mein sab{" "}
            <strong className="text-slate-100">ek hi useEffect</strong> mein:
            dependency array decide karta hai "kab chale", return function
            decide karta hai "kaise saaf ho".
          </p>
        </div>
      </Section>

      <Section title="Lifecycle mapping — quick reference">
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400">
                <th className="px-4 py-2 font-semibold">Angular</th>
                <th className="px-4 py-2 font-semibold">React</th>
              </tr>
            </thead>
            <tbody>
              {lifecycleRows.map((row) => (
                <tr key={row.angular} className="border-t border-slate-800">
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
      </Section>

      <Section title="Common mistakes">
        <ol className="list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-slate-100">Infinite loop</strong> — effect
            ke andar state update karo jo khud dependency hai, bina condition
            ke:
            <div className="mt-2">
              <CodeBlock code={infiniteLoopCode} />
            </div>
          </li>
          <li>
            <strong className="text-slate-100">Missing dependency</strong> —
            effect ke andar koi variable use karo jo array mein list nahi
            kiya — stale (purani) value use hogi. ESLint ka{" "}
            <code className="text-sky-300">react-hooks/exhaustive-deps</code>{" "}
            rule isse pakadta hai, ignore mat karo.
          </li>
          <li>
            <strong className="text-slate-100">Cleanup bhoolna</strong> —
            timer/subscription/listener saaf na karo to memory leak ya "state
            update on unmounted component" warning aayegi.
          </li>
        </ol>
      </Section>

      <Section title="Din 2 ka core wrap">
        <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
          <li>
            Dependency array decide karta hai effect{" "}
            <strong className="text-slate-100">kab</strong> chale (mount-only,
            mount+update, ya har render)
          </li>
          <li>
            Return function decide karta hai{" "}
            <strong className="text-slate-100">kaise</strong> saaf ho (re-run
            se pehle + unmount pe)
          </li>
          <li>
            Angular ke alag-alag lifecycle hooks React mein ek hi{" "}
            <code className="text-sky-300">useEffect</code> + dependency
            array mein consolidate ho jaate hain
          </li>
        </ul>
      </Section>
    </div>
  );
};

export default Day2;
