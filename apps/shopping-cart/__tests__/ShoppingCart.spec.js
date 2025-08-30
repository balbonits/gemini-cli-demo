const { test, expect } = require('@playwright/test');

test.describe('ShoppingCart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/shopping-cart/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('shopping-cart')).toBeVisible();
    await expect(page).toHaveScreenshot('shopping-cart-initial-render.png');
  });

  test('should add a product to the cart via drag and drop', async ({ page }) => {
    const product = page.locator('.product').first();
    const cart = page.locator('.cart');

    await product.dragTo(cart);

    await expect(page).toHaveScreenshot('shopping-cart-with-item.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    const product = page.locator('.product').first();
    const cart = page.locator('.cart');

    await product.dragTo(cart);

    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('shopping-cart-initial-render.png');
  });
});
