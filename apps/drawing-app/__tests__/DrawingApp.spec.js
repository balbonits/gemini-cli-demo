const { test, expect } = require('@playwright/test');

test.describe('DrawingApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/drawing-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('drawing-app')).toBeVisible();
    await expect(page).toHaveScreenshot('drawing-app-initial-render.png');
  });

  test('should draw on the canvas', async ({ page }) => {
    const canvas = page.locator('canvas');
    await canvas.dispatchEvent('mousedown', { clientX: 100, clientY: 100 });
    await canvas.dispatchEvent('mousemove', { clientX: 200, clientY: 200 });
    await canvas.dispatchEvent('mouseup');
    await expect(page).toHaveScreenshot('drawing-app-drawn-line.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    const canvas = page.locator('canvas');
    await canvas.dispatchEvent('mousedown', { clientX: 100, clientY: 100 });
    await canvas.dispatchEvent('mousemove', { clientX: 200, clientY: 200 });
    await canvas.dispatchEvent('mouseup');

    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('drawing-app-initial-render.png');
  });
});
