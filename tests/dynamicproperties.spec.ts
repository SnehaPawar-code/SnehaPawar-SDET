import { test, expect } from '@playwright/test';

test('Button enables after 5 seconds', async ({ page }) => {
  await page.goto('https://demoqa.com/dynamic-properties');

  const enableButton = page.getByRole('button', {
    name: 'Will enable 5 seconds',
  });
  await expect(enableButton).toBeDisabled();

  await expect(enableButton).toBeEnabled({ timeout: 6000 });
});

test('Button color changes after 5 seconds', async ({ page }) => {
  await page.goto('https://demoqa.com/dynamic-properties');

  const colorButton = page.getByRole('button', { name: 'Color Change' });
  await expect(colorButton).toHaveCSS('color', 'rgb(255, 255, 255)');

  await expect(colorButton).not.toHaveCSS('color', 'rgb(220, 53, 69)', {
    timeout: 6000,
  });
});

test('Button becomes visible after 5 seconds', async ({ page }) => {
  await page.goto('https://demoqa.com/dynamic-properties');

  const visibleButton = page.getByRole('button', {
    name: 'Visible After 5 Seconds',
  });
  await expect(visibleButton).not.toBeVisible();

  await expect(visibleButton).toBeVisible({ timeout: 6000 });
});
