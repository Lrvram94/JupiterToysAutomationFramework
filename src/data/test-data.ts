export const testData = {
  urls: {
    home: '/#/',
    contact: '/#/contact',
    shop: '/#/shop',
    cart: '/#/cart',
  },
  contact: {
    forename: 'Test',
    surname: 'Customer',
    email: 'test.customer@example.com',
    telephone: '0210000000',
    message: 'Please provide more information about your toys.',
  },
  products: [
    { name: 'Stuffed Frog', quantity: 2 },
    { name: 'Fluffy Bunny', quantity: 5 },
    { name: 'Valentine Bear', quantity: 3 },
  ],

  errorMessage: {
    forename: 'Forename is required',
    email: 'Email is required',
    message: 'Message is required',
    general: "We welcome your feedback - but we won't get it unless you complete the form correctly."
  }
} as const;