import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'example-tests' });

test('has title', async ({ page }) => {
  step.info('Step 1: Navigate to Playwright dev site');
  await page.goto('https://playwright.dev/');

  step.info('Step 2: Verify page title contains Playwright');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  step.info('Step 1: Navigate to Playwright dev site');
  await page.goto('https://playwright.dev/');

  step.info('Step 2: Click the get started link');
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  step.info('Step 3: Verify Installation heading is visible');
  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});
