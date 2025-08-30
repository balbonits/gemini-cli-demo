const { test, expect } = require('@playwright/test');

test.describe('CalculatorApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/calculator-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('calculator-app')).toBeVisible();
    await expect(page).toHaveScreenshot('calculator-app-initial-render.png');
  });

  test('should perform a partial calculation', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await expect(page).toHaveScreenshot('calculator-app-partial-calculation.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await page.click('#reset-app');
    await expect(page).toHaveScreenshot('calculator-app-initial-render.png');
  });
});
