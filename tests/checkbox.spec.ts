import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'checkbox-tests' });

test('Select and verify checkboxes', async ({ page }) => {
  step.info('Step 1: Navigate to checkbox page');
  await page.goto('https://demoqa.com/checkbox');

  step.info('Step 2: Verify Home checkbox is visible');
  const homeCheckbox = page.getByRole('checkbox', { name: 'Home' });
  await expect(homeCheckbox).toBeVisible();

  step.info('Step 3: Check the Home checkbox');
  await homeCheckbox.check();
  await expect(homeCheckbox).toBeChecked();

  step.info('Step 4: Verify result contains home');
  const result = page.locator('#result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('home');

  step.info('Step 5: Uncheck the Home checkbox');
  await homeCheckbox.uncheck();
  await expect(homeCheckbox).not.toBeChecked();
});
