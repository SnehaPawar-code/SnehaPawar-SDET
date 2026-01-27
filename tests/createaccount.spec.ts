import { test, expect } from '@playwright/test';
import { AuthPage } from '../tests/page-objects/authPage';

test('Create Account', async ({ page }) => {
  const authPage = new AuthPage(page);
  await page.goto(process.env.BASE_URL);
  await authPage.fillForm();
  await expect(page.locator('#root')).toContainText('Create Account');
});
