import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Show an empty state for a query with no matches', async ({ page }) => {
    // 1. Open search from the homepage and search for a nonexistent topic.
    await page.goto('https://playwright.dev/');
    await page.getByRole('button', { name: /Search/ }).click();

    const searchField = page.getByRole('searchbox', { name: /search/i });
    const nonexistentQuery = 'qzxvplmoknonsense92841';
    await searchField.fill(nonexistentQuery);
    await expect(
      page.getByText(new RegExp(`No results found for "${nonexistentQuery}"`, 'i'))
    ).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(0);
    await expect(searchField).toBeVisible();

    // 2. Clear the query and confirm relevant suggestions appear.
    await searchField.fill('locators');
    await expect(
      page
        .getByRole('option')
        .filter({ hasText: /locators/i })
        .first()
    ).toBeVisible();

    // 3. Close search with Escape and confirm the homepage remains available.
    await page.keyboard.press('Escape');
    await expect(searchField).toBeHidden();
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/?(?:\?|$)/);
    await expect(
      page.getByRole('heading', { name: /Playwright enables reliable web automation/i })
    ).toBeVisible();
  });
});
