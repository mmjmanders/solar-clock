import { test, expect } from '@playwright/test'

test('has version', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer')).toHaveText('e2e')
})
