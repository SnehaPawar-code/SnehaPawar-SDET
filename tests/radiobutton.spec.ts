import { test, expect } from '@playwright/test';

test('Select radio buttons and verify', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');

  await page.getByRole('radio', { name: 'Yes' }).check({ force: true });
  await expect(page.locator('.text-success')).toHaveText('Yes');

  await page.getByRole('radio', { name: 'Impressive' }).check({ force: true });
  await expect(page.locator('.text-success')).toHaveText('Impressive');

  await expect(page.getByRole('radio', { name: 'No' })).toBeDisabled();
});
