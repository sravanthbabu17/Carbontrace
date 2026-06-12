# Security Architecture — CarbonTrace

This document describes the design principles, headers, and validations securing the **CarbonTrace** application.

---

## 1. Threat Mitigation Matrix

We implement direct defenses against common web application vulnerabilities:

| Threat                           | Mitigation                                                                                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cross-Site Scripting (XSS)**   | A strict Content-Security-Policy (CSP) headers policy using per-request script nonces and `'strict-dynamic'`. React 19 escapes all dynamic data rendering by default. |
| **Clickjacking**                 | Response headers set `frame-ancestors 'none'` and `X-Frame-Options: DENY` via CSP and middleware.                                                                     |
| **MIME Sniffing**                | Automated browser overrides are blocked by setting `X-Content-Type-Options: nosniff`.                                                                                 |
| **Man-in-the-Middle (MitM)**     | Strict-Transport-Security (HSTS) with `max-age=31536000; includeSubDomains` is enforced by our hosting provider (Vercel).                                             |
| **Data Breach / Leakage**        | **Zero server roundtrips.** All calculation inputs and results are processed client-side. No databases, third-party trackers, or analytics APIs receive user inputs.  |
| **Input Injection / Corruption** | Strict Zod validation boundaries (`src/lib/schemas.ts`) validate inputs prior to storage or calculations.                                                             |

---

## 2. Content Security Policy (CSP)

CarbonTrace enforces a strict CSP policy generated dynamically on each document request in `src/middleware.ts`:

- **Fresh Nonce Per Request**: A cryptographically random UUID nonce is generated for every request:
  `const nonce = Buffer.from(crypto.randomUUID()).toString('base64');`
- **Dynamic Scripts Control**: The `'strict-dynamic'` directive alongside the nonce ensures that only Next.js bootstrapped, trusted scripts containing the matching nonce can execute.
- **Header Structure**:
  ```http
  default-src 'self';
  script-src 'self' 'nonce-[nonce]' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  ```

---

## 3. Data Privacy & Local Storage

- **100% Client-Side Processing**: The application does not send any PII or calculation answers to a remote server.
- **Prefix Isolation**: All local storage items are stored under unique key prefixes (`carbontrace_input`, `carbontrace_goal`, `carbontrace_history`) to prevent name collisions or unauthorized overrides by other client applications sharing the same origin namespace.
- **Zod Validation on Read**: Data retrieved from local storage is verified against Zod schemas on load (`src/lib/storage.ts`) to prevent corrupted states or code injections from manual local storage tampering.
