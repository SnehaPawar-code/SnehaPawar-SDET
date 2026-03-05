import { test, expect } from '@playwright/test';

test('Select and verify checkboxes', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');

  const homeCheckbox = page.getByRole('checkbox', { name: 'Home' });
  await expect(homeCheckbox).toBeVisible();

  await homeCheckbox.check();
  await expect(homeCheckbox).toBeChecked();

  const result = page.locator('#result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('home');

  await homeCheckbox.uncheck();
  await expect(homeCheckbox).not.toBeChecked();
});
