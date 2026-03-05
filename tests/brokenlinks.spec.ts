import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'brokenlinks-tests' });

test('Valid image is displayed on the page', async ({ page }) => {
  step.info('Step 1: Navigate to broken links page');
  await page.goto('https://demoqa.com/broken');

  step.info('Step 2: Verify valid image is visible');
  const validImage = page.locator('img[src*="Toolsqa.jpg"]');
  await expect(validImage).toBeVisible();

  step.info('Step 3: Verify valid image src attribute');
  await expect(validImage).toHaveAttribute('src', /Toolsqa\.jpg/);
});

test('Broken image is present on the page', async ({ page }) => {
  step.info('Step 1: Navigate to broken links page');
  await page.goto('https://demoqa.com/broken');

  step.info('Step 2: Verify broken image has src attribute');
  const brokenImage = page.locator('img[src*="Toolsqa_1.jpg"]');
  await expect(brokenImage).toHaveAttribute('src', /Toolsqa_1\.jpg/);
});

test('Valid link navigates correctly', async ({ page }) => {
  step.info('Step 1: Navigate to broken links page');
  await page.goto('https://demoqa.com/broken');

  step.info('Step 2: Click valid link');
  await page.getByRole('link', { name: 'Click Here for Valid Link' }).click();

  step.info('Step 3: Verify navigation to demoqa.com');
  await expect(page).toHaveURL(/demoqa\.com/);
});

test('Broken link returns error status', async ({ page }) => {
  step.info('Step 1: Navigate to broken links page');
  await page.goto('https://demoqa.com/broken');

  step.info('Step 2: Click broken link and capture response');
  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('status_codes/500'),
  );
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 500');
  expect(response.status()).toBe(500);
});
