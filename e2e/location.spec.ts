import { amsterdam as test, paris, expect } from './fixture'

test('has location set to Amsterdam, Netherlands', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Amsterdam, Netherlands')
})

paris('has location set to Paris, France', async ({ page, context }) => {
  await context.clearPermissions()
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Paris, France')
})
