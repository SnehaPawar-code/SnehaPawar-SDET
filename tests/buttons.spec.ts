import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'buttons-tests' });

test('Double click button', async ({ page }) => {
  step.info('Step 1: Navigate to buttons page');
  await page.goto('https://demoqa.com/buttons');

  step.info('Step 2: Double click the button');
  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();

  step.info('Step 3: Verify double click message');
  await expect(page.locator('#doubleClickMessage')).toHaveText(
    'You have done a double click',
  );
});

test('Right click button', async ({ page }) => {
  step.info('Step 1: Navigate to buttons page');
  await page.goto('https://demoqa.com/buttons');

  step.info('Step 2: Right click the button');
  await page
    .getByRole('button', { name: 'Right Click Me' })
    .click({ button: 'right' });

  step.info('Step 3: Verify right click message');
  await expect(page.locator('#rightClickMessage')).toHaveText(
    'You have done a right click',
  );
});

test('Dynamic click button', async ({ page }) => {
  step.info('Step 1: Navigate to buttons page');
  await page.goto('https://demoqa.com/buttons');

  step.info('Step 2: Click the button');
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();

  step.info('Step 3: Verify dynamic click message');
  await expect(page.locator('#dynamicClickMessage')).toHaveText(
    'You have done a dynamic click',
  );
});
