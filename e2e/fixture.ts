import { test as base } from '@playwright/test'
import 'dotenv/config'

const {
  VITE_GEO_API_BASE_URL: geoApiBaseUrl,
  VITE_REVERSE_GEOCODING_API_BASE_URL: geocodingApiBaseUrl,
  VITE_SUNRISE_SUNSET_API_BASE_URL: sunriseSunsetApiBaseUrl,
} = process.env

/* This uses location permissions so no need to mock Geo API */
export const amsterdam = base.extend({
  page: async ({ page }, use) => {
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
            sunset: 1776228301,
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
  page: async ({ page }, use) => {
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
          tzid: 'Europe/Amsterdam',
          results: {
            sunrise: 1776228301,
            sunset: 1776228301,
            solar_noon: 1776253372,
            timezone: 'UTC',
          },
        },
      })
    })

    await use(page)
  },
})

export { expect } from '@playwright/test'
