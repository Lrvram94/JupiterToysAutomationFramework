import type { Page } from '@playwright/test';

export class HomePage {
  constructor(protected readonly page: Page) {}

  get contactLink() {
    return this.page.getByRole('link', { name: 'Contact' });
  }

  get shopLink() {
    return this.page.getByRole('link', { name: 'Shop', exact: true });
  }
}
