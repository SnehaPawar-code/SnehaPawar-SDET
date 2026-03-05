import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'textbox-tests' });

test('Fill and submit text box form', async ({ page }) => {
  step.info('Step 1: Navigate to text box page');
  await page.goto('https://demoqa.com/text-box');

  step.info('Step 2: Fill in Full Name');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Sneha Pawar');

  step.info('Step 3: Fill in Email');
  await page
    .getByRole('textbox', { name: 'name@example.com' })
    .fill('sneha@example.com');

  step.info('Step 4: Fill in Current Address');
  await page
    .getByRole('textbox', { name: 'Current Address' })
    .fill('Pune, Maharashtra');

  step.info('Step 5: Fill in Permanent Address');
  await page.locator('#permanentAddress').fill('Latur, Maharashtra');

  step.info('Step 6: Submit the form');
  await page.getByRole('button', { name: 'Submit' }).click();

  step.info('Step 7: Verify output contains submitted data');
  const output = page.locator('#output');
  await expect(output).toBeVisible();
  await expect(output.locator('#name')).toContainText('Sneha Pawar');
  await expect(output.locator('#email')).toContainText('sneha@example.com');
  await expect(output.locator('p#currentAddress')).toContainText(
    'Pune, Maharashtra',
  );
  await expect(output.locator('p#permanentAddress')).toContainText(
    'Latur, Maharashtra',
  );
});
