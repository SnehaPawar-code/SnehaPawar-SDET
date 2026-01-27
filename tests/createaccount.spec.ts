import { test, expect } from '@playwright/test';
import { AuthPage } from '../tests/page-objects/authPage';

test('Create Account', async ({ page }) => {
  const authPage = new AuthPage();
  await page.goto(process.env.BASE_URL);
  await authPage.fillForm();
  await expect(page.geByRole(heading, { name: 'Application Form' }));
});
