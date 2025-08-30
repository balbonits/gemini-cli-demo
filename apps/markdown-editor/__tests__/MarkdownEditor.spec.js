const { test, expect } = require('@playwright/test');

test.describe('MarkdownEditor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/apps/markdown-editor/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => window.marked !== undefined);
  });

  test('should load and render correctly', async ({ page }) => {
    await expect(page.locator('markdown-editor')).toBeVisible();
    await expect(page).toHaveScreenshot('markdown-editor-initial-render.png');
  });

  test('should render markdown input', async ({ page }) => {
    await page.evaluate(() => {
      const markdownInput = document.querySelector('markdown-editor').shadowRoot.querySelector('.editor-container .markdown-input');
      markdownInput.value = '# Hello World\n\nThis is **bold** text.';
      markdownInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await expect(page).toHaveScreenshot('markdown-editor-with-content.png');
  });

  test('should reset the app to its initial state', async ({ page }) => {
    await page.evaluate(() => {
      const markdownInput = document.querySelector('markdown-editor').shadowRoot.querySelector('.editor-container .markdown-input');
      markdownInput.value = '# Hello World\n\nThis is **bold** text.';
      markdownInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.locator('markdown-editor >>> #reset-app').click();
    await expect(page).toHaveScreenshot('markdown-editor-initial-render.png');
  });
});
