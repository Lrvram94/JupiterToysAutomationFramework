import type { Page } from '@playwright/test';

export class ShopPage {
  constructor(protected readonly page: Page) {}
}