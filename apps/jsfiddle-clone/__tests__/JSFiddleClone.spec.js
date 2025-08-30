const { test, expect } = require('@playwright/test');

test.describe('JSFiddleClone', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/jsfiddle-clone/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('jsfiddle-clone')).toBeVisible();
    await expect(page).toHaveScreenshot('jsfiddle-clone-initial-render.png');
  });

  test('should update the output when code is entered', async ({ page }) => {
    await page.locator('.html').fill('<h1>Hello, World!</h1>');
    await page.locator('.css').fill('h1 { color: red; }');
    // Wait for the iframe to update
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('jsfiddle-clone-with-code.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.locator('.html').fill('<h1>Hello, World!</h1>');
    await page.locator('.css').fill('h1 { color: red; }');
    // Wait for the iframe to update
    await page.waitForTimeout(500);

    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('jsfiddle-clone-initial-render.png');
  });
});
