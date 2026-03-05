import { test, expect } from '@playwright/test';

test('Fill and submit text box form', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await page.getByRole('textbox', { name: 'Full Name' }).fill('Sneha Pawar');
  await page
    .getByRole('textbox', { name: 'name@example.com' })
    .fill('sneha@example.com');
  await page
    .getByRole('textbox', { name: 'Current Address' })
    .fill('Pune, Maharashtra');
  await page.locator('#permanentAddress').fill('Latur, Maharashtra');

  await page.getByRole('button', { name: 'Submit' }).click();

  const output = page.locator('#output');
  await expect(output).toBeVisible();
  await expect(output.locator('#name')).toContainText('Sneha Pawar');
  await expect(output.locator('#email')).toContainText('sneha@example.com');
  await expect(output.locator('p#currentAddress')).toContainText(
    'Pune, Maharashtra',
  );
  await expect(output.locator('p#permanentAddress')).toContainText(
    'Latur, Maharashtra',
  );
});
