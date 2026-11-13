import { test, expect } from '@playwright/test';

test('homepage loads and displays hero headline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Tedcool/i);
});
