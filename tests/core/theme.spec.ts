import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Change the site theme without losing the current page', async ({ page }) => {
    // 1. Navigate to the Installation documentation and record the current theme state.
    await page.addInitScript(() => {
      if (window.location.hostname === 'playwright.dev') {
        window.localStorage.setItem('theme-e2a', 'light');
      }
    });
    await page.goto('https://playwright.dev/docs/intro');

    const themeControl = page.getByRole('button', {
      name: /Switch between dark and light mode/i,
    });
    const currentThemeLabel = await themeControl.getAttribute('aria-label');
    const currentTheme = await page.locator('html').getAttribute('data-theme');

    await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    await expect(themeControl).toBeVisible();
    expect(currentThemeLabel).toMatch(/currently (system|light|dark) mode/i);

    // 2. Change the theme and verify the current documentation remains available.
    await themeControl.click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', currentTheme ?? '');
    await expect(themeControl).not.toHaveAttribute('aria-label', currentThemeLabel ?? '');
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/docs\/intro(?:\?|$)/);
    await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Docs sidebar' })).toBeVisible();
  });
});
