const { test, expect } = require('@playwright/test');

test.describe('MindMappingApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/mind-mapping-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('mind-mapping-app')).toBeVisible();
    await expect(page).toHaveScreenshot('mind-mapping-app-initial-render.png');
  });

  test('should add a rectangle node when the button is clicked', async ({ page }) => {
    await page.click('#add-rect');
    await expect(page).toHaveScreenshot('mind-mapping-app-add-rectangle.png');
  });

  test('should add a circle node when the button is clicked', async ({ page }) => {
    await page.click('#add-circle');
    await expect(page).toHaveScreenshot('mind-mapping-app-add-circle.png');
  });

  test('should add an ellipse node when the button is clicked', async ({ page }) => {
    await page.click('#add-ellipse');
    await expect(page).toHaveScreenshot('mind-mapping-app-add-ellipse.png');
  });

  test('should change the color of a selected node', async ({ page }) => {
    await page.click('#add-rect');
    // Click in the center of the canvas to select the node
    await page.locator('canvas').click({
      position: { x: 640, y: 360 } // Assuming canvas is 1280x720
    });

    await page.evaluate(() => {
      const colorInput = document.querySelector('mind-mapping-app').shadowRoot.querySelector('#color');
      colorInput.value = '#ff0000';
      colorInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await expect(page).toHaveScreenshot('mind-mapping-app-change-color.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.click('#add-rect');
    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('mind-mapping-app-initial-render.png');
  });
});
