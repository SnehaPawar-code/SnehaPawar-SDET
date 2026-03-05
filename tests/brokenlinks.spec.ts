import { test, expect } from '@playwright/test';

test('Valid image is displayed on the page', async ({ page }) => {
  await page.goto('https://demoqa.com/broken');

  const validImage = page.locator('img[src*="Toolsqa.jpg"]');
  await expect(validImage).toBeVisible();
  await expect(validImage).toHaveAttribute('src', /Toolsqa\.jpg/);
});

test('Broken image is present on the page', async ({ page }) => {
  await page.goto('https://demoqa.com/broken');

  const brokenImage = page.locator('img[src*="Toolsqa_1.jpg"]');
  await expect(brokenImage).toHaveAttribute('src', /Toolsqa_1\.jpg/);
});

test('Valid link navigates correctly', async ({ page }) => {
  await page.goto('https://demoqa.com/broken');

  await page.getByRole('link', { name: 'Click Here for Valid Link' }).click();

  await expect(page).toHaveURL(/demoqa\.com/);
});

test('Broken link returns error status', async ({ page }) => {
  await page.goto('https://demoqa.com/broken');

  const responsePromise = page.waitForResponse((resp) =>
    resp.url().includes('status_codes/500'),
  );
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
  const response = await responsePromise;

  expect(response.status()).toBe(500);
});
