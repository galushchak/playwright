import { expect, test } from '@playwright/test';

test.describe('Core Site Navigation and Preferences', () => {
  test('Collapse and restore a documentation sidebar section', async ({ page }) => {
    // 1. Navigate directly to the Installation documentation.
    await page.goto('https://playwright.dev/docs/intro');

    const docsSidebar = page.getByRole('navigation', { name: 'Docs sidebar' });
    const gettingStarted = docsSidebar.getByRole('button', { name: 'Getting Started' });
    const writingTests = docsSidebar.getByRole('link', { name: 'Writing tests' });
    await expect(docsSidebar).toBeVisible();
    await expect(gettingStarted).toHaveAttribute('aria-expanded', 'true');
    await expect(writingTests).toBeVisible();

    // 2. Collapse the Getting Started section.
    await gettingStarted.click();
    await expect(gettingStarted).toHaveAttribute('aria-expanded', 'false');
    await expect(writingTests).toBeHidden();

    // 3. Expand the Getting Started section again.
    await gettingStarted.click();
    await expect(gettingStarted).toHaveAttribute('aria-expanded', 'true');
    await expect(writingTests).toBeVisible();
  });
});
