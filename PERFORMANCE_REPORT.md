# Performance Report — CarbonTrace

This document outlines the optimization strategies implemented to ensure **CarbonTrace** achieves high scores in speed, efficiency, and bundle optimization.

---

## 1. Metrics & Core Optimizations

CarbonTrace delivers instant feedback and lightweight page loads by adhering to the following optimization principles:

### Zero-Latency Computation Engine

- Carbon calculation math runs entirely client-side.
- Computing footprints, modeling changes in the simulator, and checking goals require **zero network requests** and complete in **<1ms**.

### Heavy Package Code-Splitting (Lazy Charts)

- Recharts is a heavy library. To prevent charts from inflating our landing page or dashboard initial load payloads, we lazy-load them in `src/components/charts/lazy.tsx`:
  - `dynamic(() => import('./CategoryBarChart'), { ssr: false, loading: () => <ChartSkeleton /> })`
- Charts only download once the dashboard page mounts, and a layout-matched animated skeleton placeholder prevents layout shifts.

### Static Header/Footer Rendering

- The navigation header (`SiteHeader.tsx`) and page footer (`SiteFooter.tsx`) are pure **React Server Components (RSC)**. They compile completely to HTML on the server and require zero client-side hydration JS.

### Asset Optimizations

- Custom SVGs and clean Tailwind styles are bundled natively.
- No heavy web fonts are loaded synchronously; Google Fonts (Inter, Sora) are preloaded and configured with `display: swap` to prevent visual blocking.
- Zero analytics scripts, tracking beacons, or telemetry libraries are injected.
