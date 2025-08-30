const { test, expect } = require('@playwright/test');

test.describe('DataVisualizationApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/data-visualization-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('data-visualization-app')).toBeVisible();
    await expect(page).toHaveScreenshot('data-visualization-app-initial-render.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('data-visualization-app-initial-render.png');
  });
});
