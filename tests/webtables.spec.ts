import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'webtables-tests' });

test('Add a new record to web table', async ({ page }) => {
  step.info('Step 1: Navigate to web tables page');
  await page.goto('https://demoqa.com/webtables');

  step.info('Step 2: Click Add button');
  await page.getByRole('button', { name: 'Add' }).click();

  step.info('Step 3: Fill in the registration form');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Sneha');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Pawar');
  await page
    .getByRole('textbox', { name: 'name@example.com' })
    .fill('sneha@example.com');
  await page.getByRole('textbox', { name: 'Age' }).fill('60');
  await page.getByRole('textbox', { name: 'Salary' }).fill('10000');
  await page.getByRole('textbox', { name: 'Department' }).fill('QA');

  step.info('Step 4: Submit the form');
  await page.getByRole('button', { name: 'Submit' }).click();

  step.info('Step 5: Verify new record is visible in the table');
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
  step.info('Step 1: Navigate to web tables page');
  await page.goto('https://demoqa.com/webtables');

  step.info('Step 2: Click edit on Cierra row');
  await page
    .getByRole('row', { name: /Cierra/ })
    .locator('[title="Edit"]')
    .click();

  step.info('Step 3: Update the first name');
  const firstNameInput = page.getByRole('textbox', { name: 'First Name' });
  await firstNameInput.clear();
  await firstNameInput.fill('Updated');

  step.info('Step 4: Submit the form');
  await page.getByRole('button', { name: 'Submit' }).click();

  step.info('Step 5: Verify updated record is visible');
  await expect(
    page.getByRole('cell', { name: 'Updated', exact: true }),
  ).toBeVisible();
});

test('Delete a record from web table', async ({ page }) => {
  step.info('Step 1: Navigate to web tables page');
  await page.goto('https://demoqa.com/webtables');

  step.info('Step 2: Verify Cierra record exists');
  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).toBeVisible();

  step.info('Step 3: Delete Cierra record');
  await page
    .getByRole('row', { name: /Cierra/ })
    .locator('[title="Delete"]')
    .click();

  step.info('Step 4: Verify Cierra record is removed');
  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).not.toBeVisible();
});

test('Search in web table', async ({ page }) => {
  step.info('Step 1: Navigate to web tables page');
  await page.goto('https://demoqa.com/webtables');

  step.info('Step 2: Search for Cierra');
  await page.getByRole('textbox', { name: 'Type to search' }).fill('Cierra');

  step.info('Step 3: Verify search result shows Cierra');
  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true }),
  ).toBeVisible();
});
