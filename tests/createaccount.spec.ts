import { test, expect } from '@playwright/test';
import { AuthPage } from '../tests/page-objects/authPage';
import pino from 'pino';

const step = pino({ name: 'createaccount-tests' });

test('Create Account', async ({ page }) => {
  const authPage = new AuthPage(page);

  step.info('Step 1: Navigate to agent signup page');
  await page.goto('https://app.playonereal.com/agent-signup');

  step.info('Step 2: Fill the signup form');
  await authPage.fillForm();

  step.info('Step 3: Verify Create Account text is present');
  await expect(page.locator('#root')).toContainText('Create Account');
});
