import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Solar Clock')
})

test('has header', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Solar Clock')
})
