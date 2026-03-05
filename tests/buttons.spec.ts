import { test, expect } from '@playwright/test';

test('Double click button', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');

  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();

  await expect(page.locator('#doubleClickMessage')).toHaveText(
    'You have done a double click',
  );
});

test('Right click button', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');

  await page
    .getByRole('button', { name: 'Right Click Me' })
    .click({ button: 'right' });

  await expect(page.locator('#rightClickMessage')).toHaveText(
    'You have done a right click',
  );
});

test('Dynamic click button', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');

  await page.getByRole('button', { name: 'Click Me', exact: true }).click();

  await expect(page.locator('#dynamicClickMessage')).toHaveText(
    'You have done a dynamic click',
  );
});
