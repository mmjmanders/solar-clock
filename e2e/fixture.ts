import { test as base } from '@playwright/test'
import 'dotenv/config'

const {
  VITE_GEO_API_BASE_URL: geoApiBaseUrl,
  VITE_REVERSE_GEOCODING_API_BASE_URL: geocodingApiBaseUrl,
} = process.env

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(`${geoApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          location: {
            coordinates: {
              latitude: 52.3542071,
              longitude: 4.5743283,
            },
          },
        },
      })
    })

    await page.route(`${geocodingApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          address: {
            city: 'Amsterdam',
            country: 'Netherlands',
          },
        },
      })
    })

    await use(page)
  },
})

export { expect } from '@playwright/test'
