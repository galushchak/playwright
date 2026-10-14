import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Search documentation with keyboard shortcut and open all results', async ({ page }) => {
    // 1. Navigate to the homepage and open search with the keyboard shortcut.
    await page.goto('https://playwright.dev/');
    const searchButton = page.getByRole('button', { name: /Search/ });
    await expect(searchButton).toBeVisible();
    await searchButton.press('Control+k');

    const searchField = page.getByRole('searchbox', { name: /search/i });
    await expect(searchField).toBeVisible();
    await expect(searchField).toBeFocused();

    // 2. Search for locators and wait for categorized suggestions.
    await searchField.fill('locators');
    await expect(
      page
        .getByRole('option')
        .filter({ hasText: /locators/i })
        .first()
    ).toBeVisible();
    await expect(page.getByText(/Classes/i)).toBeVisible();
    await expect(page.getByText(/Guides/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /See all \d+ results/i })).toBeVisible();

    // 3. Open all results for the query.
    await page.getByRole('link', { name: /See all \d+ results/i }).click();
    await expect(page).toHaveURL(/https:\/\/playwright\.dev\/search\?q=locators(?:&|$)/);
    await expect(
      page.getByRole('heading', { name: /Search results for "locators"/i })
    ).toBeVisible();
    await expect(
      page
        .getByRole('main')
        .getByRole('link', { name: /Locators/i })
        .first()
    ).toBeVisible();
  });
});
