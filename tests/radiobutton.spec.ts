import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'radiobutton-tests' });

test('Select radio buttons and verify', async ({ page }) => {
  step.info('Step 1: Navigate to radio button page');
  await page.goto('https://demoqa.com/radio-button');

  step.info('Step 2: Select Yes radio button and verify');
  await page.getByRole('radio', { name: 'Yes' }).check({ force: true });
  await expect(page.locator('.text-success')).toHaveText('Yes');

  step.info('Step 3: Select Impressive radio button and verify');
  await page.getByRole('radio', { name: 'Impressive' }).check({ force: true });
  await expect(page.locator('.text-success')).toHaveText('Impressive');

  step.info('Step 4: Verify No radio button is disabled');
  await expect(page.getByRole('radio', { name: 'No' })).toBeDisabled();
});
