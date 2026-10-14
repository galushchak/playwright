import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Navigate from the homepage into the getting-started documentation', async ({ page }) => {
    // 1. Navigate to the homepage in a fresh browser page.
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

    const mainNavigation = page.getByRole('navigation', { name: 'Main' });
    await expect(mainNavigation.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(mainNavigation.getByRole('link', { name: 'MCP' })).toBeVisible();
    await expect(mainNavigation.getByRole('link', { name: 'CLI' })).toBeVisible();
    await expect(mainNavigation.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(mainNavigation.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect(
      mainNavigation.getByRole('button', { name: /Switch between dark and light mode/ })
    ).toBeVisible();
    await expect(mainNavigation.getByRole('button', { name: /Search/ })).toBeVisible();

    // 2. Activate the homepage Get started link.
    await page.getByRole('link', { name: /Get started/i }).click();
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/docs\/intro(?:\?|$)/);
    await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Docs sidebar' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Next\s+Writing tests/i })).toBeVisible();

    // 3. Activate the Next Writing tests link.
    await page.getByRole('link', { name: /Next\s+Writing tests/i }).click();
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/docs\/writing-tests(?:\?|$)/);
    await expect(page.getByRole('heading', { name: /Writing tests/i, level: 1 })).toBeVisible();
  });
});
