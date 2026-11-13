import { faker } from '@faker-js/faker';

export const createContactDetails = () => {
  const forename = faker.person.firstName();

  return {
    forename,
    email: faker.internet.email({
      firstName: forename,
      provider: 'example.com',
    }),
    telephone: `02${faker.string.numeric(8)}`,
    message: `Hi, I'd like more information about the ${faker.commerce.productName()}.`,
  };
};

export const testData = {
  urls: {
    home: '/#/',
    contact: '/#/contact',
    shop: '/#/shop',
    cart: '/#/cart',
  },
  products: [
    { name: 'Stuffed Frog', quantity: 2, price: 10.99 },
    { name: 'Fluffy Bunny', quantity: 5, price: 9.99 },
    { name: 'Valentine Bear', quantity: 3, price: 14.99 },
  ],

  errorMessage: {
    forename: 'Forename is required',
    email: 'Email is required',
    message: 'Message is required',
    general:
      "We welcome your feedback - but we won't get it unless you complete the form correctly.",
  },

  successMessage: 'Thanks {forename}, we appreciate your feedback.',
} as const;
