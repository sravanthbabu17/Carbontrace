# Accessibility Compliance Report — CarbonTrace

**Compliance Standard**: WCAG 2.1 Level AA  
**Evaluation Tools**: axe-core (via Vitest unit tests), manual keyboard audits  
**Status**: ✅ Fully Compliant

---

## 1. Core Accessibility Features

CarbonTrace is built to offer a seamless experience to users with assistive technologies (such as screen readers) and keyboard-only users.

### Skip Link Navigation
- A visually hidden skip link is positioned as the very first element in `src/app/layout.tsx`:
  ```html
  <a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>
  ```
- It allows keyboard users to bypass site header navigation links and skip directly to the primary page content `<main id="main">`.

### Accessible Forms (Labels & Groups)
- **Label Associations**: All inputs (`NumberField`, `SelectField`) are wrapped in our custom `Field` container, which auto-generates a unique UUID and wires `htmlFor` on the `<label>` to `id` on the `<input>`.
- **Checkbox Elements**: The checkbox component in `Checkbox.tsx` and ActionSimulator's recycling toggle explicitly link inputs and labels.
- **Form Grouping**: Option lists and multi-select questions use `<fieldset>` and `<legend>` to declare logical parent sections.

### Dynamic Chart Text & Table Fallbacks
- Visual charts are notoriously difficult for screen readers to interpret. We resolve this in `ChartFrame.tsx`:
  - The actual charting components (Recharts) are wrapped in `aria-hidden="true"` so they are bypassed by screen readers.
  - A descriptive text `<figcaption className="sr-only">` explains the trend.
  - A native `<details>` toggle contains an accessible `<table>` detailing the exact values, with appropriate table headers `<th scope="col">` and row headers `<th scope="row">`.

### Keyboard Nav & Focus Management
- **Interactive States**: Focus indicators (`focus-visible:ring-2 focus-visible:ring-primary`) style element rings exclusively on keyboard navigation.
- **Focus Redirection**: When users advance through the questionnaire, an effect focuses the new step header `h2` automatically so they don't have to cycle tabs forward from the top header on every page change.

### Live Regions
- Error panels utilize `aria-live="polite"` to dynamically notify screen reader users of validation problems.
- Interactive adjustments in the calculator page and simulator announce changes via polite live regions without disrupting user focus.
