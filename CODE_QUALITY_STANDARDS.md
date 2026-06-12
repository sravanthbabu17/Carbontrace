# Code Quality Standards — CarbonTrace

This document outlines the software quality standards and architectural patterns enforced in the **CarbonTrace** codebase.

---

## 1. Static Quality Controls

We enforce strict validation rules via compiler and linter tools before code is integrated or deployed:

### TypeScript strict mode (`tsconfig.json`)

The TypeScript compiler is configured with maximum strictness:

- `"strict": true`: Full type enforcement.
- `"noUncheckedIndexedAccess": true`: Enforces lookup checks on potentially undefined keys in index signatures.
- `"noImplicitOverride": true`: Ensures inheritance changes are explicit.
- `"noUnusedLocals": true` & `"noUnusedParameters": true`: Prevents orphan variables and parameters.
- `"noFallthroughCasesInSwitch": true`: Prevents switch statement bugs.

### ESLint Rules (`.eslintrc.json`)

- Extends the core Next.js production configurations: `["next/core-web-vitals", "next/typescript"]`.
- `@typescript-eslint/no-explicit-any: "error"`: Strictly forbids the use of the dynamic `any` type, securing compile-time safety.
- `no-console: ["warn", { "allow": ["warn", "error"] }]`: Restricts accidental console logs.

### Formatting Style (`.prettierrc.json`)

- Automatic code formatting is configured via Prettier:
  - 100 character line length.
  - Double quotes, 2-space indentation, trailing commas (ES5).
- Formatting compliance is enforced via `npm run format:check` during integration checks.

---

## 2. Architecture & Design Patterns

### Pure Functional Calculation Engine

- All emission math sits in `src/lib/calculator.ts` and `src/lib/emission-factors.ts`.
- These modules contain pure functions with **zero side-effects**. Given identical inputs (distance, energy inputs), they yield identical outputs. This guarantees deterministic behavior and facilitates testability.

### Client-Side Decoupled Model

- Computational inputs and state are managed on the client using React state and `localStorage`.
- No servers, databases, or API networks are required for calculating or saving data, making calculations instantaneous and extremely robust.

### Strict Input Modeling

- Input schema parsing is handled via **Zod** (`src/lib/schemas.ts`).
- Individual schemas exist for transport, home energy, food, and consumption.
- Step-level validation maps Zod errors directly onto specific fields to prevent corrupted states from entering local storage or calculating erroneous footprints.
