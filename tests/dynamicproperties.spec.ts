import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'dynamicproperties-tests' });

test('Button enables after 5 seconds', async ({ page }) => {
  step.info('Step 1: Navigate to dynamic properties page');
  await page.goto('https://demoqa.com/dynamic-properties');

  step.info('Step 2: Verify button is initially disabled');
  const enableButton = page.getByRole('button', {
    name: 'Will enable 5 seconds',
  });
  await expect(enableButton).toBeDisabled();

  step.info('Step 3: Wait and verify button becomes enabled');
  await expect(enableButton).toBeEnabled({ timeout: 6000 });
});

test('Button color changes after 5 seconds', async ({ page }) => {
  step.info('Step 1: Navigate to dynamic properties page');
  await page.goto('https://demoqa.com/dynamic-properties');

  step.info('Step 2: Verify initial button color is white');
  const colorButton = page.getByRole('button', { name: 'Color Change' });
  await expect(colorButton).toHaveCSS('color', 'rgb(255, 255, 255)');

  step.info('Step 3: Wait and verify button color changes');
  await expect(colorButton).not.toHaveCSS('color', 'rgb(220, 53, 69)', {
    timeout: 6000,
  });
});

test('Button becomes visible after 5 seconds', async ({ page }) => {
  step.info('Step 1: Navigate to dynamic properties page');
  await page.goto('https://demoqa.com/dynamic-properties');

  step.info('Step 2: Verify button is initially not visible');
  const visibleButton = page.getByRole('button', {
    name: 'Visible After 5 Seconds',
  });
  await expect(visibleButton).not.toBeVisible();

  step.info('Step 3: Wait and verify button becomes visible');
  await expect(visibleButton).toBeVisible({ timeout: 6000 });
});
