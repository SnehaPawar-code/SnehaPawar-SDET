import { test, expect } from '@playwright/test';
import pino from 'pino';

const step = pino({ name: 'contact-tests' });

test('Add contact', async ({ page }) => {
  const uniqueId = Date.now();

  step.info('Step 1: Navigate to addUser page and sign up');
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser');
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('Email').fill(`test${uniqueId}@test.com`);
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 2: Click Add a New Contact');
  await page.getByRole('button', { name: 'Add a New Contact' }).click();

  step.info('Step 3: Fill in contact details');
  await page.getByPlaceholder('First Name').fill('Sneha');
  await page.getByPlaceholder('Last Name').fill('Pawar');
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());
  const todayDate = `${year}-${month}-${day}`;
  await page.getByPlaceholder('yyyy-MM-dd').fill(todayDate);
  const randomEmail = `Sneha${Math.floor(Math.random() * 1000)}@gmail.com`;
  await page.locator('input#email').fill(randomEmail);
  const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  await page.locator('input#phone').fill(phoneNumber.toString());
  await page.locator('input#street1').fill('Pune');
  await page.locator('input#street2').fill('Atlaska');
  await page.getByPlaceholder('City').fill('Pune');
  await page.getByPlaceholder('State or Province').fill('Maharashtra');
  await page.getByPlaceholder('Postal Code').fill('411001');
  await page.getByPlaceholder('Country').fill('India');

  step.info('Step 4: Set up route interception for /contacts API');
  let requestBody: Record<string, string> = {};
  let responseBody: Record<string, string> = {};
  let responseStatus = 0;

  await page.route('**/contacts', async (route) => {
    if (route.request().method() === 'POST') {
      requestBody = route.request().postDataJSON();
      const response = await route.fetch();
      responseStatus = response.status();
      responseBody = await response.json();
      await route.fulfill({ response });
    } else {
      await route.continue();
    }
  });

  step.info('Step 5: Submit the contact form');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');
  await page.unroute('**/contacts');

  step.info('Step 6: Verify request body matches input');
  expect(requestBody.firstName).toBe('Sneha');
  expect(requestBody.lastName).toBe('Pawar');
  expect(requestBody.birthdate).toBe(todayDate);
  expect(requestBody.email).toBe(randomEmail);
  expect(requestBody.phone).toBe(phoneNumber.toString());
  expect(requestBody.street1).toBe('Pune');
  expect(requestBody.street2).toBe('Atlaska');
  expect(requestBody.city).toBe('Pune');
  expect(requestBody.stateProvince).toBe('Maharashtra');
  expect(requestBody.postalCode).toBe('411001');
  expect(requestBody.country).toBe('India');

  step.info('Step 7: Verify response body matches expected data');
  expect(responseStatus).toBe(201);
  expect(responseBody.firstName).toBe('Sneha');
  expect(responseBody.lastName).toBe('Pawar');
  expect(responseBody.birthdate).toBe(todayDate);
  expect(responseBody.email).toBe(randomEmail.toLowerCase());
  expect(responseBody.phone).toBe(phoneNumber.toString());
  expect(responseBody.street1).toBe('Pune');
  expect(responseBody.street2).toBe('Atlaska');
  expect(responseBody.city).toBe('Pune');
  expect(responseBody.stateProvince).toBe('Maharashtra');
  expect(responseBody.postalCode).toBe('411001');
  expect(responseBody.country).toBe('India');
  expect(responseBody._id).toBeTruthy();
});
