const { test, expect } = require('@playwright/test');

test.describe('WeatherApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/weather-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('weather-app')).toBeVisible();
    await expect(page).toHaveScreenshot('weather-app-initial-render.png');
  });

  test('should get weather for a city', async ({ page }) => {
    await page.locator('input[type="text"]').fill('London');
    await page.locator('button:has-text("Get Weather")').click();
    await page.waitForSelector('h2:has-text("London")');
    await expect(page).toHaveScreenshot('weather-app-london-weather.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.locator('input[type="text"]').fill('London');
    await page.locator('button:has-text("Get Weather")').click();
    await page.waitForSelector('h2:has-text("London")');

    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('weather-app-initial-render.png');
  });
});
