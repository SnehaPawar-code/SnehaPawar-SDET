import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'links-tests' });

test('Home link opens new tab', async ({ page, context }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Home link and wait for new tab');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Home' }).first().click(),
  ]);

  step.info('Step 3: Verify new tab URL contains demoqa.com');
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('demoqa.com');
});

test('Created link returns 201 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Created link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('created') && resp.status() === 201,
  );
  await page.getByRole('link', { name: 'Created' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 201');
  expect(response.status()).toBe(201);
  await expect(page.locator('#linkResponse')).toContainText('201');
});

test('No Content link returns 204 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click No Content link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('no-content') && resp.status() === 204,
  );
  await page.getByRole('link', { name: 'No Content' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 204');
  expect(response.status()).toBe(204);
  await expect(page.locator('#linkResponse')).toContainText('204');
});

test('Moved link returns 301 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Moved link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('moved') && resp.status() === 301,
  );
  await page.getByRole('link', { name: 'Moved' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 301');
  expect(response.status()).toBe(301);
  await expect(page.locator('#linkResponse')).toContainText('301');
});

test('Bad Request link returns 400 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Bad Request link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('bad-request') && resp.status() === 400,
  );
  await page.getByRole('link', { name: 'Bad Request' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 400');
  expect(response.status()).toBe(400);
  await expect(page.locator('#linkResponse')).toContainText('400');
});

test('Unauthorized link returns 401 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Unauthorized link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('unauthorized') && resp.status() === 401,
  );
  await page.getByRole('link', { name: 'Unauthorized' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 401');
  expect(response.status()).toBe(401);
  await expect(page.locator('#linkResponse')).toContainText('401');
});

test('Forbidden link returns 403 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Forbidden link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('forbidden') && resp.status() === 403,
  );
  await page.getByRole('link', { name: 'Forbidden' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 403');
  expect(response.status()).toBe(403);
  await expect(page.locator('#linkResponse')).toContainText('403');
});

test('Not Found link returns 404 status', async ({ page }) => {
  step.info('Step 1: Navigate to links page');
  await page.goto('https://demoqa.com/links');

  step.info('Step 2: Click Not Found link and capture response');
  const responsePromise = page.waitForResponse(
    (resp) => resp.url().includes('invalid-url') && resp.status() === 404,
  );
  await page.getByRole('link', { name: 'Not Found' }).click();
  const response = await responsePromise;

  step.info('Step 3: Verify response status is 404');
  expect(response.status()).toBe(404);
  await expect(page.locator('#linkResponse')).toContainText('404');
});
