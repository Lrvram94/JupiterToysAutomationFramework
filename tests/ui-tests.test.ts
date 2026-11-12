import { test, expect } from '@playwright/test';
import { testData } from '../src/data/test-data';
import { ContactPage } from '../src/pages/ContactPage';
import { HomePage } from '../src/pages/HomePage';

test('Test Case 1 - Test Contact form validation errors', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  await page.goto(testData.urls.home);
  await contactPage.contactLink.click();
  await expect(page).toHaveURL(testData.urls.contact);
  await contactPage.submitButton.click();
  await expect(contactPage.forenameError).toBeVisible();
  await expect(contactPage.emailError).toBeVisible();
  await expect(contactPage.messageError).toBeVisible();
  await expect(contactPage.generalError).toBeVisible(); 
});

