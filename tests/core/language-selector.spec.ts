import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Switch documentation language', async ({ page }) => {
    // 1. Open the language selector on the Installation documentation.
    await page.goto('https://playwright.dev/docs/intro');
    await page.getByRole('button', { name: /Node\.?js/i }).click();

    await expect(page.getByRole('link', { name: /Node\.?js/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Python$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Java$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^\.NET$/i })).toBeVisible();

    // 2. Select Python and verify the translated documentation is displayed.
    await page.getByRole('link', { name: /^Python$/i }).click();
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/python\/docs\/intro(?:\?|$)/);
    await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Python$/i })).toBeVisible();
  });
});
