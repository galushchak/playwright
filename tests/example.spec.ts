// @ts-check
import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/constants.js';

test.describe('navigation', () => {
  test.afterAll(async ({ context, browser }) => {
    await context.close();
    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
