import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'login-tests' });

test.use({ storageState: 'tests/.auth/storageState.json' });

test('Login using storage state and verify contact list', async ({ page }) => {
  step.info(
    'Step 1: Navigate to contact list page (authenticated via storage state)',
  );
  await page.goto(
    'https://thinking-tester-contact-list.herokuapp.com/contactList',
  );

  step.info('Step 2: Verify user is logged in and contact list is displayed');
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info(
    'Step 3: Verify logout button is visible (confirms authenticated session)',
  );
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});
