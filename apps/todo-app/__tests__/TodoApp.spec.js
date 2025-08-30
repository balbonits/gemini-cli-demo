const { test, expect } = require('@playwright/test');

test.describe('TodoApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/todo-app/index.html');
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('todo-app')).toBeVisible();
    await expect(page).toHaveScreenshot('todo-app-initial-render.png');
  });

  test('should add a todo', async ({ page }) => {
    await page.locator('todo-input').locator('input[type="text"]').fill('New Todo');
    await page.locator('todo-input').locator('button').click();
    await expect(page).toHaveScreenshot('todo-app-add-todo.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.locator('todo-input').locator('input[type="text"]').fill('New Todo');
    await page.locator('todo-input').locator('button').click();

    await page.locator('#reset-app').click();
    await expect(page).toHaveScreenshot('todo-app-initial-render.png');
  });
});
