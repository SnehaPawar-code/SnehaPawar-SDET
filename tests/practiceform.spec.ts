import { test, expect } from '@playwright/test';
import pino from 'pino';
import { testUser, contacts } from './test-data/contactListData';

const step = pino({ name: 'practiceform-tests' });

let storedApiContacts: Record<string, string>[];
const BASE_URL = 'https://thinking-tester-contact-list.herokuapp.com';

test('Sign up a new user', async ({ page }) => {
  step.info('Step 1: Navigate to addUser page');
  await page.goto(`${BASE_URL}/addUser`);

  step.info('Step 2: Fill in user registration form');
  await page.getByPlaceholder('First Name').fill(testUser.firstName);
  await page.getByPlaceholder('Last Name').fill(testUser.lastName);
  await page.getByPlaceholder('Email').fill(testUser.email);
  await page.getByPlaceholder('Password').fill(testUser.password);

  step.info('Step 3: Submit and verify Contact List page');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');
});

test('Login and add two contacts', async ({ page }) => {
  step.info('Step 1: Navigate to login page');
  await page.goto(`${BASE_URL}/login`);

  step.info('Step 2: Login with test user credentials');
  await page.getByPlaceholder('Email').fill(testUser.email);
  await page.getByPlaceholder('Password').fill(testUser.password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 3: Add contacts from test data');
  for (const contact of contacts) {
    await page.getByRole('button', { name: 'Add a New Contact' }).click();
    await page.getByPlaceholder('First Name').fill(contact.firstName);
    await page.getByPlaceholder('Last Name').fill(contact.lastName);
    await page.getByPlaceholder('yyyy-MM-dd').fill(contact.birthdate);
    await page.locator('input#email').fill(contact.email);
    await page.locator('input#phone').fill(contact.phone);
    await page.locator('input#street1').fill(contact.street1);
    await page.locator('input#street2').fill(contact.street2);
    await page.getByPlaceholder('City').fill(contact.city);
    await page
      .getByPlaceholder('State or Province')
      .fill(contact.stateProvince);
    await page.getByPlaceholder('Postal Code').fill(contact.postalCode);
    await page.getByPlaceholder('Country').fill(contact.country);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('h1')).toHaveText('Contact List');
  }
});

test('Verify UI matches /contacts API response', async ({ page }) => {
  step.info('Step 1: Navigate to login page');
  await page.goto(`${BASE_URL}/login`);

  step.info('Step 2: Login with test user credentials');
  await page.getByPlaceholder('Email').fill(testUser.email);
  await page.getByPlaceholder('Password').fill(testUser.password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 3: Fetch contacts via API');
  const cookies = await page.context().cookies();
  const token = cookies.find((c) => c.name === 'token')?.value;
  const apiResponse = await page.request.get(`${BASE_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  storedApiContacts = await apiResponse.json();
  expect(storedApiContacts).toHaveLength(2);

  step.info('Step 4: Verify UI rows match API response');
  const rows = page.locator('tr.contactTableBodyRow');
  await expect(rows).toHaveCount(2);

  for (const contact of storedApiContacts) {
    const row = rows.filter({
      hasText: `${contact.firstName} ${contact.lastName}`,
    });
    await expect(row).toContainText(contact.email);
    await expect(row).toContainText(contact.phone);
    await expect(row).toContainText(contact.city);
    await expect(row).toContainText(contact.country);
  }
});

test('Logout and re-login - UI still matches stored API response', async ({
  page,
}) => {
  step.info('Step 1: Navigate to login page');
  await page.goto(`${BASE_URL}/login`);

  step.info('Step 2: Login with test user credentials');
  await page.getByPlaceholder('Email').fill(testUser.email);
  await page.getByPlaceholder('Password').fill(testUser.password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 3: Logout');
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

  step.info('Step 4: Re-login with test user credentials');
  await page.getByPlaceholder('Email').fill(testUser.email);
  await page.getByPlaceholder('Password').fill(testUser.password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('h1')).toHaveText('Contact List');

  step.info('Step 5: Verify UI rows still match stored API response');
  const rows = page.locator('tr.contactTableBodyRow');
  await expect(rows).toHaveCount(2);

  for (const contact of storedApiContacts) {
    const row = rows.filter({
      hasText: `${contact.firstName} ${contact.lastName}`,
    });
    await expect(row).toContainText(contact.email);
    await expect(row).toContainText(contact.phone);
    await expect(row).toContainText(contact.city);
    await expect(row).toContainText(contact.country);
  }
});
