import { Page, Locator } from '@playwright/test';

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

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('Enter your first name');
    this.lastName = page.getByPlaceholder('Enter your last name');
    this.username = page.getByTestId('text-input-Username');
    this.email = page.getByTestId('email-input-Email');
    this.password = page.getByTestId('password-input-Password');
    this.passwordConfirmation = page.getByTestId(
      'password-input-Password Confirmation',
    );
    this.privacyPolicyCheckbox = page.getByTestId('consentedToTerms');
    this.checkApplicableBox = page.getByTestId('consentedToCallMessage');
    this.createAccountButton = page.getByRole('button', {
      name: 'Create Account',
    });
  }

  async fillForm() {
    await this.firstName.fill('Sneha');
    await this.lastName.fill('Pawar');
    await this.username.fill('Snehabalajipa');
    await this.email.fill('snehabpawar@gmail.com');
    await this.password.fill('Snehapawar@1234');
    await this.passwordConfirmation.fill('Snehapawar@1234');
    await this.privacyPolicyCheckbox.check();
    await this.checkApplicableBox.check();
    await this.createAccountButton.click();
  }
}
