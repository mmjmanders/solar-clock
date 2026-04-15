import { test, expect } from '@playwright/test'
import objectSupport from 'dayjs/plugin/objectSupport.js'
import dayjs from 'dayjs'
dayjs.extend(objectSupport)

/* Parameterized tests */
Array.from({ length: 24 })
  .map((_, i) => ({
    hour: i,
  }))
  .forEach(({ hour }) => {
    test(`test hand position for hour ${hour % 24 || 24}`, async ({ page }) => {
      await page.clock.setFixedTime(
        dayjs({ hour, minute: 0, second: 0, year: 2026, month: 4, day: 15 }).toDate(),
      )
      await page.goto('/')
      const transform = (await page.getAttribute('path.sun-hand', 'transform')) as string
      const degrees = parseFloat(transform.match(/rotate\(([^)]+)\)/)![1]!)
      expect(degrees).toBeCloseTo((360 / 24) * hour, 1)
    })
  })
