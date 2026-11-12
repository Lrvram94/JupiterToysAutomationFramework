import type { Page } from '@playwright/test';

export class HomePage {
  constructor(protected readonly page: Page) {}
}
