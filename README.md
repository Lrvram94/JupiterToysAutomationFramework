# Jupiter Toys Automation Framework

UI automation for the [Jupiter Toys](https://jupiter.cloud.planittesting.com) technical assessment, built with **Playwright, TypeScript, Faker, and Biome**. GitHub Actions provides automated test execution.

## Project structure

| File | Purpose |
| --- | --- |
| [ui-tests.test.ts](./tests/ui-tests.test.ts) | Contact validation, successful submission, and shopping/cart tests |
| [HomePage.ts](./src/pages/HomePage.ts) | Contact and Shop navigation locators |
| [ContactPage.ts](./src/pages/ContactPage.ts) | Contact fields, Submit, and validation-message locators |
| [shopPage.ts](./src/pages/shopPage.ts) | Product Buy links and cart price, subtotal, and total locators |
| [test-data.ts](./src/data/test-data.ts) | Routes, products, expected messages, and Faker-generated contact details |
| [playwright.config.ts](./playwright.config.ts) | Base URL, Chromium/Firefox projects, execution settings, and HTML reporting |
| [tsconfig.json](./tsconfig.json) | TypeScript checking settings |
| [biome.json](./biome.json) | Formatting and lint settings; respects Git ignore rules |
| [package.json](./package.json) / [package-lock.json](./package-lock.json) | npm scripts, dependencies, and exact resolved dependency versions |
| [.gitignore](./.gitignore) | Excludes dependencies and generated test artifacts |
| [playwright.yml](./.github/workflows/playwright.yml) | GitHub Actions pipeline |
| [Assessment document](<./Planit Technical Assessment Take Home - Feb 2025.docx>) | Original requirements |

**How it connects:** tests read shared data, use page objects to locate elements, perform browser actions, and assert the results. Page objects return locators; tests call actions such as `.click()` and `.fill()`.

Each test receives an isolated Playwright browser context. The framework targets the hosted website; no local application server is required.

## Setup

Use a current supported Node.js LTS release compatible with the locked dependencies, npm, and Git. From the repository root:

```powershell
npm ci
npx playwright install chromium firefox
```

On Linux/CI, include browser system dependencies:

```powershell
npx playwright install --with-deps chromium firefox
```

npm dependencies and Playwright browser binaries are separate installations. Network access is required for installation and application access.

## Run tests

```powershell
# All tests in both configured browsers
npm test

# All tests in Chromium
npx playwright test --project=chromium

# One scenario with a visible browser
npx playwright test --headed --project=chromium --grep "Test Case 3"

# Successful submission: five independent runs without retries
npx playwright test --project=chromium --repeat-each=5 --retries=0 --grep "Test Case 2"

# Open the HTML report
npx playwright show-report
```

Use `"Test Case 1"` or `"Test Case 2"` with `--grep` to select another scenario. Add `--workers=1` for sequential execution.

The default run is headless. Reports are generated in `playwright-report`, with execution artifacts in `test-results`.

## Test coverage

| Scenario | Implemented checks |
| --- | --- |
| Test Case 1 | Navigate from home to Contact, submit an empty form, and verify required-field error elements and the general warning |
| Test Case 2 | Generate contact details with Faker, fill mandatory fields, submit, and verify the personalized success message |
| Test Case 3 | Buy configured quantities, open Cart, verify product rows and unit prices, check each subtotal against price x quantity, and compare the total with the displayed subtotals |

Current shopping expectations:

| Product | Quantity | Unit price | Subtotal |
| --- | ---: | ---: | ---: |
| Stuffed Frog | 2 | $10.99 | $21.98 |
| Fluffy Bunny | 5 | $9.99 | $49.95 |
| Valentine Bear | 3 | $14.99 | $44.97 |
| **Total** | **10** | | **$116.90** |

## Changing products and test data

Update the `products` array in [test-data.ts](./src/data/test-data.ts):

```ts
{ name: 'Stuffed Frog', quantity: 2, price: 10.99 },
```

- **Quantity:** change `quantity` to a positive whole number. The buy loop and expected subtotal update automatically.
- **Price:** update `price` when the application's expected unit price legitimately changes. This does not change the website's price.
- **New product:** add its full, unique name, quantity, and price. Existing loops include it automatically.
- **Contact data:** edit `createContactDetails()`. It is called once per submission test so the form and expected success message use the same generated name.
- **URLs:** change the hostname in the Playwright configuration and relative routes in test data.
- **Locators:** update the relevant page object when the application UI changes.

Cart locators select a product row by name, then its Price or Subtotal column. Adding products does not change column positions; reordering the cart columns requires locator updates.

## Quality checks

```powershell
npm run typecheck
npm run lint
npm run format
```

Type checking and linting check files without applying fixes. **Formatting modifies files.** Run browser tests as well: valid TypeScript does not guarantee correct UI behavior.

Biome uses two-space indentation and single quotes. Generated reports are excluded through Git ignore rules. A test-specific exception avoids applying the DOM text-access performance rule to Playwright locator `innerText()` calls.

## CI

[GitHub Actions](./.github/workflows/playwright.yml) runs on pushes and pull requests targeting `main` or `master`. It installs dependencies and browsers on Ubuntu, runs the configured suite, and uploads the HTML report with 30-day retention.

Playwright uses one worker and two retries in CI, and rejects `test.only`. Locally, retries are disabled by default.

The pipeline does not yet run separate type/lint checks or explicitly repeat Test Case 2 five times. Retries do not replace independent repetitions.

## Known gaps

- Test Case 1 still needs to fill mandatory fields and verify that validation errors disappear.
- Test Case 3's title is still contact-related, although its implementation tests shopping and cart calculations.
- Cart quantities are verified indirectly through expected subtotals, not directly through quantity inputs.
- The unit-price assertion needs `.toFixed(2)` formatting to support values such as `12.50`, which currently become `$12.5`. Subtotals already use two-decimal formatting.
- Some locators remain inline in tests, and setup is repeated rather than shared through fixtures or `beforeEach`.

If a browser executable is missing, run the relevant Playwright install command. If a test fails, inspect the HTML report before changing expected values or increasing timeouts.
