import { amsterdam as test, expect } from './fixture'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Solar Clock')
})

test('has header', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Solar Clock')
})
