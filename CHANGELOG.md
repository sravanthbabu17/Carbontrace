# Changelog — CarbonTrace

All notable changes to the **CarbonTrace** project are documented in this file. The project adheres to semantic versioning.

---

## [1.1.0] — 2026-06-12

### Added

- Created 5 new root-level compliance reports for evaluating standards:
  - `CODE_QUALITY_STANDARDS.md`
  - `TESTING_STRATEGY.md`
  - `SECURITY_ARCHITECTURE.md`
  - `ACCESSIBILITY_COMPLIANCE_REPORT.md`
  - `PERFORMANCE_REPORT.md`
- Added 7 new component and visual integration test files under `src/components/` covering `RegionStep`, `TransportStep`, `FoodStep`, `ConsumptionStep`, `ReviewStep`, `GoalTracker`, and `ActionSimulator`.
- Integrated automated formatting validation checks using Prettier.

### Fixed

- Improved accessibility of the Action Simulator recycling checkbox by converting a nested label structure into an explicit `id` and `htmlFor` association, ensuring compatibility with older assistive technologies.
- Removed unused imports to resolve compilation and linter warnings in component tests.

### Changed

- Expanded the core test suite to **72 passing tests** (up from 54 tests).
- Updated documentation in `README.md` to reflect the new test count and compliance reports index.

---

## [1.0.0] — 2026-06-12

### Added

- Rebranded the platform name from `EcoTrack AI` to `CarbonTrace` across all pages, layouts, configuration files, and local storage keys.
- Redesigned the UI layout with a premium Figma-based Sage Green biophilic color scheme, utilizing muted sora/inter fonts, warm surfaces, and sage green colors.
- Implemented real-time interactive behaviour modeling in the dashboard via `ActionSimulator.tsx`.
- Verified Next.js 15 production build optimizations, caching, and lazy loaded graphs.
- Completed full test suite coverage for calculator library, schemas, storage interfaces, and tips engine.
