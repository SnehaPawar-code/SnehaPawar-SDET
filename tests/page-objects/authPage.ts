import { expect, Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly username: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly passwordConfirmation: Locator;
  readonly privacyPolicyCheckbox: Locator;
  readonly checkApplicableBox: Locator;
  readonly createAccountButton: Locator;

  Constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('Enter your first name');
    this.lastName = page.getByPlaceholder('Enter your last name');
    this.username = page.getByPlaceholder('eg. johndoe9');
    this.email = page.getByPlaceholder('eg. johndoe9');
    this.password = page.getByPlaceholder('johndoe@example.com');
    this.passwordConfirmation = page.getByPlaceholder('Confirm password');
    this.privacyPolicyCheckbox = page.locator('#mantine-6qge8kjm7');
    this.checkApplicableBox = page.locator('#mantine-mh9u502zr');
    this.createAccountButton = page.getByText('Create Account');
  }

  async fillForm() {
    await this.firstName.fill('Sneha');
    await this.lastName.fill('Pawar');
    await this.username.fill('Snehap');
    await this.email.fill('snehapawar@gmail.com');
    await this.password.fill('Snehapawar');
    await this.passwordConfirmation.fill('Snehapawar');
    await this.privacyPolicyCheckbox.check();
    await this.checkApplicableBox.check();
    await this.createAccountButton.click();
  }
}
