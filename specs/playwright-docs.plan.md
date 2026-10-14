# Playwright Documentation User-Facing Test Plan

## Application Overview

Focused functional coverage for the configured Playwright documentation website at https://playwright.dev/, covering primary homepage navigation, documentation reading/navigation, site search and empty results, language selection, and theme switching. Each scenario starts from a fresh page state and is independently runnable.

## Test Scenarios

### 1. Core Site Navigation and Preferences

**Seed:** `tests/seed.spec.ts`

#### 1.1. Navigate from the homepage into the getting-started documentation

**File:** `tests/core/navigation.spec.ts`

**Steps:**

1. Navigate to https://playwright.dev/ in a fresh browser page. - expect: The homepage loads successfully and its title identifies Playwright. - expect: The primary navigation exposes Docs, MCP, CLI, API, a language selector, theme control, and Search.
2. Activate the homepage Get started link. - expect: The browser navigates to /docs/intro. - expect: The Installation documentation heading/content is visible along with the Docs sidebar and a Next Writing tests navigation link.
3. Activate the Next Writing tests link. - expect: The browser navigates to /docs/writing-tests and the Writing tests documentation is displayed.

#### 1.2. Collapse and restore a documentation sidebar section

**File:** `tests/core/sidebar.spec.ts`

**Steps:**

1. Navigate directly to https://playwright.dev/docs/intro in a fresh browser page. - expect: The Docs sidebar is visible and Getting Started is expanded with its child navigation links.
2. Activate the Getting Started sidebar section button. - expect: The section becomes collapsed and its child links are no longer visible.
3. Activate Getting Started again. - expect: The section expands and its child links become visible again.

#### 1.3. Search documentation with keyboard shortcut and open all results

**File:** `tests/core/search.spec.ts`

**Steps:**

1. Navigate to https://playwright.dev/ in a fresh browser page and press Control+K. - expect: The search dialog opens and the Search field receives focus.
2. Enter the query locators and wait for search suggestions. - expect: Suggestions are presented in categorized groups. - expect: A See all results link is available for the query.
3. Activate See all results. - expect: The browser navigates to the search results route with the locators query preserved. - expect: Search results relevant to locators are displayed.

#### 1.4. Show an empty state for a query with no matches

**File:** `tests/core/search-empty.spec.ts`

**Steps:**

1. Navigate to https://playwright.dev/ in a fresh browser page, open Search, and enter a distinctive nonexistent query such as qzxv-no-such-playwright-topic-92841. - expect: The search interface remains usable and does not show unrelated results. - expect: A clear no-results/empty state is shown, or the all-results route reports no matches.
2. Clear the query and enter locators. - expect: Relevant suggestions appear, confirming the search recovers from an empty-result query.
3. Close the dialog with Escape. - expect: The search dialog closes and the homepage remains available.

#### 1.5. Switch documentation language

**File:** `tests/core/language-selector.spec.ts`

**Steps:**

1. Navigate to https://playwright.dev/docs/intro in a fresh browser page and open the Node.js language selector. - expect: The language menu lists Node.js, Python, Java, and .NET.
2. Select Python. - expect: The browser navigates to /python/docs/intro. - expect: Python documentation content is displayed and the language selector reflects Python.

#### 1.6. Change the site theme without losing the current page

**File:** `tests/core/theme.spec.ts`

**Steps:**

1. Navigate to https://playwright.dev/docs/intro in a fresh browser page and record the current theme control state. - expect: The documentation page is visible and the theme control exposes its current mode accessibly.
2. Activate the theme control once. - expect: The site theme visibly changes between light and dark presentation. - expect: The documentation content and navigation remain readable and the current route is unchanged. - expect: The theme control's accessible label or state updates to reflect the selected mode.
