import type { Page } from '@playwright/test';
import { testData } from '../data/test-data';

export class ContactPage {
  constructor(protected readonly page: Page) {}

  get contactLink() {
    return this.page.getByRole('link', { name: 'Contact' });
  }

  get forenameTextbox() {
    return this.page.getByRole('textbox', { name: 'Forename *' });
  }

  get emailTextbox() {
    return this.page.getByRole('textbox', { name: 'Email *' });
  }

  get messageTextbox() {
    return this.page.getByRole('textbox', { name: 'Message *' });
  }
  
  get submitButton() {
    return this.page.getByRole('link', { name: 'Submit' });
  }

  get forenameError() {
    return this.page.locator('#forename-err');
  }

  get emailError() {
    return this.page.locator('#email-err');
  }

  get messageError() {
    return this.page.locator('#message-err');
  }

  get generalError() {
    return this.page.getByText(testData.errorMessage.general);

  }
}
  