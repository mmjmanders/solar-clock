import { test as base } from '@playwright/test'
import 'dotenv/config'

const {
  VITE_GEO_API_BASE_URL: geoApiBaseUrl,
  VITE_REVERSE_GEOCODING_API_BASE_URL: geocodingApiBaseUrl,
  VITE_SUNRISE_SUNSET_API_BASE_URL: sunriseSunsetApiBaseUrl,
} = process.env

/* This uses location permissions, so no need to mock Geo API */
export const amsterdam = base.extend({
  contextOptions: async ({ contextOptions }, use) => {
    await use({ ...contextOptions, timezoneId: 'Europe/Amsterdam' })
  },
  page: async ({ page, context }, use) => {
    await context.setGeolocation({
      latitude: 52.3542071,
      longitude: 4.5743283,
    })
    await context.grantPermissions(['geolocation'])

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

    await page.route(`${sunriseSunsetApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          tzid: 'Europe/Amsterdam',
          results: {
            sunrise: 1776228301,
            sunset: 1776278444,
            solar_noon: 1776253372,
            timezone: 'UTC',
          },
        },
      })
    })

    await use(page)
  },
})

export const paris = base.extend({
  contextOptions: async ({ contextOptions }, use) => {
    await use({ ...contextOptions, timezoneId: 'Europe/Paris' })
  },
  page: async ({ page, context }, use) => {
    /* Disallow permissions for geolocation to enforce use of Geo API */
    await context.setGeolocation(null)
    await context.grantPermissions([])

    await page.route(`${geoApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          location: {
            coordinates: {
              latitude: 48.8587375,
              longitude: 2.1822275,
            },
          },
        },
      })
    })

    await page.route(`${geocodingApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          address: {
            city: 'Paris',
            country: 'France',
          },
        },
      })
    })

    await page.route(`${sunriseSunsetApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          tzid: 'Europe/Paris',
          results: {
            sunrise: 1776229204,
            sunset: 1776278688,
            solar_noon: 1776253946,
            timezone: 'UTC',
          },
        },
      })
    })

    await use(page)
  },
})

export const losAngeles = base.extend({
  contextOptions: async ({ contextOptions }, use) => {
    await use({ ...contextOptions, timezoneId: 'America/Los_Angeles' })
  },
  page: async ({ page, context }, use) => {
    await context.setGeolocation({
      latitude: 34.0200392,
      longitude: -118.7413821,
    })
    await context.grantPermissions(['geolocation'])

    await page.route(`${geocodingApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          address: {
            city: 'Los Angeles',
            country: 'United States',
          },
        },
      })
    })

    await page.route(`${sunriseSunsetApiBaseUrl}/**`, async (route) => {
      await route.fulfill({
        json: {
          tzid: 'America/Los_Angeles',
          results: {
            sunrise: 1776259504,
            sunset: 1776306422,
            solar_noon: 1776282963,
            timezone: 'UTC',
          },
        },
      })
    })

    await use(page)
  },
})

export { expect } from '@playwright/test'
