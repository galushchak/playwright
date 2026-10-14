---
name: playwright-project
description: 'Use when planning, creating, updating, debugging, or reviewing Playwright browser tests in this repository. Covers the project test layout, the Playwright documentation site under test, test conventions, and verification commands.'
---

# Playwright Project Testing

## Project Context

This repository contains Playwright end-to-end tests for the public Playwright documentation site. The current test plan is in `specs/playwright-docs.plan.md`; scenarios cover navigation, the documentation sidebar, search, language selection, and theme switching.

The Playwright configuration does not set a `baseURL`; current tests navigate to `https://playwright.dev/` directly. `utils/constants.ts` contains a localhost `BASE_URL`, but do not assume it is the target for a test. Follow the referenced plan and the behavior requested, and do not invent application routes or outcomes.

## Repository Conventions

- Keep test plans in `specs/` and browser tests in `tests/core/`, using descriptive `.spec.ts` filenames.
- Import `test` and `expect` from `@playwright/test`. Group related scenarios in the existing `Core Site Navigation and Preferences` suite.
- Make each test independently runnable using its own `page` fixture and explicit navigation. Set up required browser state within that test rather than relying on execution order or shared state.
- Follow the plan's numbered steps with a brief matching step comment, then assert observable outcomes.
- Prefer accessible, user-facing locators: `getByRole` with an accessible name, then `getByLabel`, `getByPlaceholder`, or `getByText` when appropriate. Scope locators to a meaningful landmark or component when names repeat. Use CSS or other implementation details only when no suitable user-facing locator exists.
- Let locator actions and web-first assertions provide auto-waiting. Assert the outcome of an interaction with matchers such as `toBeVisible`, `toBeHidden`, `toHaveURL`, `toHaveTitle`, `toHaveAttribute`, and `toHaveCount`; do not replace these with immediate reads or one-time checks.
- Keep each test focused on a user-observable behavior: arrange its starting state, perform actions through the UI, and assert meaningful results. Check URL and page content when navigation is part of the behavior, not just that a click completed.
- Use independent tests and the built-in `page` fixture. Avoid shared mutable state, ordering dependencies, and tests that depend on another test's setup or cleanup.
- Use the smallest stable setup needed. For browser state such as local storage, set it within the test before navigation; do not rely on a previously visited page or persistent browser profile.
- Avoid fixed sleeps, `networkidle`, deprecated APIs, brittle implementation selectors, `test.only`, skipped tests, and weakened assertions. Do not increase timeouts to mask unreliable synchronization.
- Use the Playwright CLI for live browser exploration when needed. Do not claim an interaction was observed unless it was actually exercised.

## Reliable Test Workflow

1. Read the relevant scenario in `specs/playwright-docs.plan.md`, nearby tests, and the Playwright configuration before editing.
2. Explore the live site with `pnpm exec playwright-cli` when the page structure, accessible names, or behavior is uncertain. Use snapshots and real interactions to verify the plan; prefer accessible locators in the test over copying fragile selectors.
3. Implement a self-contained test with clear setup, action, and outcome assertions. Cover only behavior supported by the plan and observed site; report discrepancies rather than guessing.
4. Run the focused test first. If it fails, diagnose the specific assertion or browser evidence, then use the configured trace or Playwright CLI debugging tools when useful. Fix the root cause instead of suppressing or weakening the test.
5. Run the full suite when the change affects shared setup, configuration, or behavior across scenarios. Review the final diff and report exact commands and outcomes.

## Verification

- Run one test file first: `pnpm exec playwright test tests/core/<name>.spec.ts`.
- Run the full suite with `pnpm test` when the change warrants regression coverage.
- The configured browser project is Microsoft Edge. Report browser, network, or site availability blockers explicitly rather than treating them as test results.
- For interactive diagnosis, use `pnpm exec playwright test <path> --debug` or `pnpm exec playwright-cli`; inspect a generated trace with `pnpm exec playwright show-trace <trace.zip>` when available.
- Review the final diff and report the exact verification commands and outcomes.
