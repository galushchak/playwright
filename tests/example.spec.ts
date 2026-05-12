import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/constants.js';

test.describe('navigation', () => {
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

  test('pet api test', async ({ request }) => {
    const pet = await request.get(`https://petstore.swagger.io/v2/pet/1`);
    expect(pet.status()).toBe(200);
    const petData = await pet.json();
    expect(petData.name).toBeDefined();
    console.warn(`Pet: ${JSON.stringify(petData)}`);
  });
});
