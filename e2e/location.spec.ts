import { amsterdam as test, paris, losAngeles, expect } from './fixture'

test('has location set to Amsterdam, Netherlands', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Amsterdam, Netherlands')
})

paris('has location set to Paris, France', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Paris, France')
})

losAngeles('has location set to Los Angeles, United States', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h2')).toHaveText('Los Angeles, United States')
})
