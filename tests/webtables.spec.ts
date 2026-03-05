import { test, expect } from '@playwright/test';

test('Add a new record to web table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('textbox', { name: 'First Name' }).fill('Sneha');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Pawar');
  await page
    .getByRole('textbox', { name: 'name@example.com' })
    .fill('sneha@example.com');
  await page.getByRole('textbox', { name: 'Age' }).fill('60');
  await page.getByRole('textbox', { name: 'Salary' }).fill('10000');
  await page.getByRole('textbox', { name: 'Department' }).fill('QA');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(
    page.getByRole('cell', { name: 'Sneha', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Pawar', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'sneha@example.com' }),
  ).toBeVisible();
});

test('Edit an existing record in web table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page
    .getByRole('row', { name: /Cierra/ })
    .locator('[title="Edit"]')
    .click();

  const firstNameInput = page.getByRole('textbox', { name: 'First Name' });
  await firstNameInput.clear();
  await firstNameInput.fill('Updated');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(
    page.getByRole('cell', { name: 'Updated', exact: true }),
  ).toBeVisible();
});

test('Delete a record from web table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).toBeVisible();

  await page
    .getByRole('row', { name: /Cierra/ })
    .locator('[title="Delete"]')
    .click();

  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).not.toBeVisible();
});

test('Search in web table', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.getByRole('textbox', { name: 'Type to search' }).fill('Cierra');

  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).toBeVisible();
});
