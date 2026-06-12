# Testing Strategy — CarbonTrace

This document outlines the testing methodologies, coverage thresholds, and frameworks utilized to verify correctness in **CarbonTrace**.

---

## 1. Test Architecture

We implement a multi-layered testing setup that combines unit tests for calculation logic with component integration tests for user interface elements.

| Layer                 | Focus                                                             | Framework & Libraries            | Coverage Target | Current                                                     |
| --------------------- | ----------------------------------------------------------------- | -------------------------------- | --------------- | ----------------------------------------------------------- |
| **Core Library**      | Calculation logic, schemas, formatting, storage, and tips engines | Vitest                           | 90%             | **100%** (Functions), **100%** (Lines), **100%** (Branches) |
| **Component Steps**   | Multi-step form rendering, inputs, step focus, validation errors  | Vitest + JSDOM + Testing Library | 90%             | **100%** (Functions)                                        |
| **Dashboard Islands** | Goal tracker progress computations, interactive simulator updates | Vitest + JSDOM + Testing Library | 90%             | **100%** (Functions)                                        |

---

## 2. Test Execution & Coverage Reports

We run all unit and component tests locally or in integration pipelines using Vitest:

### Running unit/component tests

```bash
npm run test
```

### Running tests with coverage report

```bash
npm run test:coverage
```

The test coverage config is defined in `vitest.config.ts` using the V8 engine:

- Minimum coverage thresholds are enforced:
  - Statements: 100%
  - Lines: 100%
  - Functions: 100%
  - Branches: 100%

---

## 3. Test Cases Inventory

Our test suite comprises **109 unit & component tests** covering 100% of core files:

- **Calculation Core (`src/lib/*.test.ts`)**:
  - `calculator.test.ts`: Verifies transport, home, diet, and consumption calculations separately and in combination.
  - `breakdown.test.ts`: Confirms percentage contributions and sorting rankings of emissions.
  - `goal.test.ts`: Validates goal-setting progress, remaining tonnes math, and achievement conditions.
  - `schemas.test.ts`: Enforces validation bounds (no negative values, correct string options, bounds clamping).
  - `storage.test.ts`: Verifies client local storage reading, writing, prefix sanitizing, and safety catch-blocks.
  - `tips-engine.test.ts`: Tests deterministic tip selection and recycling multipliers.

- **Component Steps & UI (`src/components/**/\*.test.tsx`)\*\*:
  - `RegionStep.test.tsx`: Verifies region radio selections update the application state.
  - `TransportStep.test.tsx`: Tests vehicle selects and distance inputs.
  - `HomeStep.test.tsx`: Tests that switching fuels resets the input amount only when units differ.
  - `FoodStep.test.tsx`: Verifies selection behavior for diet groups and waste tiers.
  - `ConsumptionStep.test.tsx`: Tests checkbox toggle controls for recycling.
  - `ReviewStep.test.tsx`: Verifies all selections match visual review listings and the live estimate updates.
  - `CalculatorForm.test.tsx` / `validation.test.ts`: Tests multi-step questionnaire progress, wizard button controls, and page validation errors.
  - `GoalTracker.test.tsx`: Mocks storage to verify setting, viewing, and clearing goals.
  - `ActionSimulator.test.tsx`: Verifies that sliders and selects render correctly for interactive simulation.
  - `ComparisonCard.test.tsx` / `StatCard.test.tsx` / `TipCard.test.tsx`: Verifies representation, metric formatting, layout variants, and tag listings.
  - `DashboardLoader.test.tsx` / `DashboardView.test.tsx`: Checks layout components, loading skeletons, state hydration, empty states, and dashboard sections.
  - `Badge.test.tsx` / `Button.test.tsx` / `Card.test.tsx` / `Checkbox.test.tsx` / `Field.test.tsx` / `Icon.test.tsx` / `NumberField.test.tsx` / `ProgressBar.test.tsx` / `RadioGroup.test.tsx` / `SelectField.test.tsx` / `Stepper.test.tsx`: Verifies reusable visual layouts, accessibility attributes (aria-live, role, aria-current), HTML tag properties, and user event hooks.
