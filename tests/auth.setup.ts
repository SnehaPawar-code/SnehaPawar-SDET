import { test as setup, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'auth-setup' });

const AUTH_FILE = 'tests/.auth/storageState.json';

setup('authenticate', async ({ page }) => {
  const uniqueId = Date.now();

  step.info('Step 1: Navigate to signup page');
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser');

  step.info('Step 2: Sign up a new user');
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('Email').fill(`test${uniqueId}@test.com`);
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Submit' }).click();

  step.info('Step 3: Verify login was successful');
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 4: Save storage state');
  await page.context().storageState({ path: AUTH_FILE });
});
