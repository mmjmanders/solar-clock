import { test, expect } from './fixture'

test('has correct location', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Amsterdam, Netherlands')
})
