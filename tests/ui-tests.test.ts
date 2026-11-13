import { expect, test } from '@playwright/test';
import { createContactDetails, testData } from '../src/data/test-data';
import { ContactPage } from '../src/pages/ContactPage';
import { HomePage } from '../src/pages/HomePage';
import { ShopPage } from '../src/pages/shopPage';

test('Test Case 1 - Test Contact form validation errors', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  await page.goto(testData.urls.home);
  await homePage.contactLink.click();
  await expect(page).toHaveURL(testData.urls.contact);
  await contactPage.submitButton.click();
  await expect(contactPage.forenameError).toBeVisible();
  await expect(contactPage.emailError).toBeVisible();
  await expect(contactPage.messageTextBoxError).toBeVisible();
  await expect(contactPage.generalError).toBeVisible();
});

test('Test Case 2 - Test successful contact form submission', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const contact = createContactDetails();
  await page.goto(testData.urls.home);
  await homePage.contactLink.click();
  await expect(page).toHaveURL(testData.urls.contact);
  await contactPage.forenameTextbox.fill(contact.forename);
  await contactPage.emailTextbox.fill(contact.email);
  await contactPage.messageTextbox.fill(contact.message);
  await contactPage.submitButton.click();
  await expect(
    page.getByText(
      testData.successMessage.replace('{forename}', contact.forename),
    ),
  ).toBeVisible({ timeout: 30_000 });
});

test('Test Case 3 - Test shopping cart functionality', async ({
  page,
}) => {
  //steps to follow
  const homePage = new HomePage(page);
  await page.goto(testData.urls.home);
  const shopPage = new ShopPage(page);
  await homePage.shopLink.click();
  for (const product of testData.products) {
    for (let i = 0; i < product.quantity; i++) {
      await shopPage.buyProduct(product.name).click();
    }
  }
  await shopPage.cartLink.click();
  await expect(page).toHaveURL(testData.urls.cart);
  // Verify the cart contains the correct products
  for (const product of testData.products) {
    await expect(
      page.getByRole('row').filter({ hasText: product.name }),
    ).toBeVisible();
  }

  // Verify the price for each product
  for (const product of testData.products) {
    await expect(shopPage.cartPrice(product.name)).toHaveText(
      `$${product.price}`,
    );
    const expectedSubtotal = (product.price * product.quantity).toFixed(2);
    await expect(shopPage.cartSubtotal(product.name)).toHaveText(
      `$${expectedSubtotal}`,
    );
  }

  // Verify that total = sum(sub totals)
  let sumOfSubtotals = 0;
  for (const product of testData.products) {
    const subtotalText = await shopPage.cartSubtotal(product.name).innerText();
    sumOfSubtotals += Number(subtotalText.replace('$', ''));
  }
  const totalText = await shopPage.cartTotal.innerText();
  expect(Number(totalText.replace('Total: ', ''))).toBeCloseTo(sumOfSubtotals);
});
