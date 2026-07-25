# React 7-Din Roadmap 🚀 (Angular Dev → React Dev)

**Kaise use karein:** Har din ke niche ek ready "prompt" diya hai — bas wahi copy karke mujhe bhej dena, us din ka topic hum Hinglish mein detail se cover karenge, examples aur Angular comparison ke saath. Ek din achhe se khatam karke hi agle din jaana, jaldi mein basics skip mat karna.

JSX, props, conditional rendering aur basic routing already pata hai, isliye Day 1 thoda fast rahega aur seedha useState/hooks pe focus karenge.

**Pace:** Plan roughly 3-4 focused ghanto/din assume karta hai. Kam time milta hai toh isko 10-12 din tak stretch kar sakte ho — sequence same rakhna, bas speed adjust karna.

---

## 🔄 Angular vs React — Quick Cheat Sheet

| Angular mein | React mein |
|---|---|
| Component (class + decorator) | Function component |
| Template (alag HTML file) | JSX (JS ke andar hi HTML jaisa syntax) |
| `@Input()` | Props |
| `*ngIf` | `{condition && <X/>}` ya ternary |
| `*ngFor` | `.map()` |
| Component ki state (class property) | `useState` |
| `ngOnInit` / `ngOnChanges` / `ngOnDestroy` | `useEffect` |
| Service + Dependency Injection | `useContext` / custom hooks |
| RxJS / NgRx | Redux, Zustand, ya Context API |
| Angular Router | React Router |
| `[(ngModel)]` two-way binding | Controlled component (`value` + `onChange`) |

Jab bhi koi React concept confusing lage, socho "iska Angular mein equivalent kya tha" — samajhna kaafi easy ho jayega.

---

## Din 1 — Foundation Pakki + useState + Events

**Kya cover karna hai:**
- Quick revision: JSX, components, props (already pata hai, bas refresh)
- Project setup: Vite + React + TypeScript (`npm create vite@latest`) — create-react-app (CRA) ab deprecated hai, use mat karna
- `useState` hook — multiple state variables, state update karna, functional updates (`setCount(prev => prev + 1)`)
- Event handling — `onClick`, `onChange`, `onSubmit`
- Controlled input ka basic idea (form value ko state se link karna)

**Angular se link:** `useState` ko socho jaise component ki apni local property — bas Angular mein directly `this.value = x` kar dete the, React mein `setValue(x)` karna padta hai kyunki React ko pata chalna chahiye ki re-render karna hai.

**Copy-paste prompt (mujhe bhejna):**
> Din 1 start — mujhe useState hook (multiple state, functional updates) aur event handling Hinglish mein samjhao, Angular ke component state se compare karke, chhote real-life examples ke saath (jaise counter, toggle button).

---

## Din 2 — useEffect aur Side Effects (Deep Dive)

**Kya cover karna hai:**
- `useEffect` basics — kab-kab chalta hai (mount, update, unmount)
- Dependency array ke 3 cases: `[]`, `[dep1, dep2]`, koi array nahi
- Cleanup function — kab zaroori hoti hai (event listeners, timers, subscriptions)
- `useEffect` ke andar API call — loading/error state handle karna
- Common mistakes — infinite loop (galat dependency array), stale closures

**Angular se link:** `useEffect(fn, [])` ≈ `ngOnInit`, `useEffect(fn, [dep])` ≈ us specific input ke liye `ngOnChanges`, cleanup function ≈ `ngOnDestroy`.

**Reality check (2026):** useEffect samajhna zaroori hai — interviews aur bahut saare existing codebases dono mein milega. Lekin naye/modern React code mein data-fetching ke liye seedha useEffect ke bajaye libraries (jaise TanStack Query) prefer ki jaati hain. Pehle fundamentals pakka karenge, phir alternatives ka bhi zikar karenge.

**Copy-paste prompt:**
> Din 2 start — useEffect deeply samjhao Hinglish mein: dependency array ke sab cases, cleanup function, aur ek API call ka real example (loading/error state ke saath). Angular lifecycle hooks se bhi compare karna.

---

## Din 3 — Baaki Hooks: useRef, useContext, useMemo, useCallback, useReducer

**Kya cover karna hai:**
- `useRef` — DOM element access karna, re-render trigger kiye bina value store karna
- `useContext` — prop drilling avoid karna
- `useMemo` aur `useCallback` — kab zaroori hain (aur kab overkill)
- `useReducer` — jab state logic complex ho jaaye
- Custom hooks — apna khud ka reusable hook banana

**Angular se link:** `useContext` ≈ Angular ka service + dependency injection (data ko poore component tree mein pass karne ka tareeka, bina manually props se pass kiye). `useReducer` React ka apna chhota Redux-jaisa pattern hai.

**Reality check (2026):** React Compiler ab kaafi memoization automatically handle kar deta hai, toh `useMemo`/`useCallback` ki manual zaroorat pehle se kam ho gayi hai — phir bhi concept clearly samajhna important hai.

**Copy-paste prompt:**
> Din 3 start — useRef, useContext, useMemo, useCallback aur useReducer ek-ek karke Hinglish mein samjhao, har ek ka real use-case example ke saath, aur bata ki kab use karna chahiye kab nahi.

---

## Din 4 — Redux aur Redux Toolkit

**Kya cover karna hai:**
- State management ki zaroorat kyun padti hai (jab Context bhi kaafi na ho)
- Redux core concepts: store, action, reducer
- Redux Toolkit (RTK) — modern recommended way: `configureStore`, `createSlice`
- `useSelector` aur `useDispatch` se component ko store se connect karna
- Ek chhota app (jaise cart ya todo list) Redux ke saath banana

**Angular se link:** Agar NgRx use kiya hai, Redux bilkul same mental model hai — store, actions, reducers sab similar naam se hain, bas syntax React-flavored hai.

**Copy-paste prompt:**
> Din 4 start — Redux Toolkit Hinglish mein sikhao: store, slice, useSelector, useDispatch — sab step by step, ek chhota practical example (cart ya todo) ke saath.

---

## Din 5 — Routing Deep Dive + Forms

**Kya cover karna hai:**
- React Router advanced — nested routes, dynamic params (`/user/:id`), programmatic navigation (`useNavigate`)
- Protected/private routes (login check ke baad hi access milna)
- Controlled vs uncontrolled forms
- Form validation — React Hook Form + Zod ka intro (2026 ka common combo)

**Copy-paste prompt:**
> Din 5 start — React Router ke advanced concepts (nested routes, dynamic params, protected routes) aur form validation (React Hook Form + Zod) Hinglish mein samjhao, example ke saath.

---

## Din 6 — Performance + Advanced Patterns

**Kya cover karna hai:**
- `React.memo` — component ka unnecessary re-render rokna
- Code splitting — `lazy()` + `Suspense`
- Error boundaries
- Component composition patterns (children prop, compound components)
- React Compiler ka current role (auto-optimization, manual memoization kam zaroori)

**Copy-paste prompt:**
> Din 6 start — React.memo, lazy loading + Suspense, error boundaries aur component composition patterns Hinglish mein samjhao, real example ke saath.

---

## Din 7 — Testing + Mini Project + Wrap-up

**Kya cover karna hai:**
- React Testing Library basics — component ka test likhna
- Ek complete mini-project banana jisme sab kuch use ho: routing + Redux + API call + form + hooks
- Deployment ka quick guide (Vercel/Netlify)
- Common interview questions (hooks ke rules, virtual DOM, keys, etc.)

**Copy-paste prompt:**
> Din 7 start — chalo ek mini-project banate hain jisme is hafte ke sab topics (routing, Redux, useEffect API call, forms) use ho. Step by step guide karo, aur end mein kuch common React interview questions bhi de do.

---

## Bas ek baat 🎯

7 din mein solid working knowledge ho jayegi — real mastery banane mein thoda aur time (aur projects) lagega, wo bilkul normal hai. Har din khatam hone par ek chhota practice example khud se likhna zaroor try karna — sirf padhna kaafi nahi hoga.