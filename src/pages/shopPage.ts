import type { Page } from '@playwright/test';

export class ShopPage {
  constructor(protected readonly page: Page) {}

  buyProduct(productName: string) {
    return this.page
      .getByRole('listitem')
      .filter({ hasText: productName })
      .getByRole('link', { name: 'Buy' });
  }

  get cartLink() {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  cartPrice(productName: string) {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .getByRole('cell')
      .nth(1);
  }

  cartSubtotal(productName: string) {
    return this.page
      .getByRole('row')
      .filter({ hasText: productName })
      .getByRole('cell')
      .nth(3);
  }

  get cartTotal() {
    return this.page.locator('.total');
  }
}
