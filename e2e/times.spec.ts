import { amsterdam as test, paris, losAngeles, expect } from './fixture'
import dayjs from 'dayjs'

/* Parameterized tests for location Amsterdam */
;[
  {
    time: '2026-04-15T08:41:36.000Z',
    expectedTime: '10:41:36',
  },
  {
    time: '2026-04-15T12:14:59.000Z',
    expectedTime: '14:14:59',
  },
  {
    time: '2026-04-15T17:02:14.000Z',
    expectedTime: '19:02:14',
  },
  {
    time: '2026-04-15T20:10:44.000Z',
    expectedTime: '22:10:44',
  },
  {
    time: '2026-04-15T01:54:07.000Z',
    expectedTime: '03:54:07',
  },
].forEach(({ time, expectedTime }) => {
  test(`should display correct times ${expectedTime.slice(0, 5)} for Amsterdam`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(dayjs(time).toDate())
    await page.goto('/')
    await expect(page.locator('div.time > div')).toContainText(['06:45:01', '20:40:44', '13:42:52'])
    await expect(page.locator('text.digital-time')).toHaveText(expectedTime.slice(0, 5))
    await expect(page.locator('path.is-on')).toHaveCount(Number(expectedTime.slice(6)) + 1)
  })
})

/* Parameterized tests for location Paris */
;[
  {
    time: '2026-04-15T08:41:36.000Z',
    expectedTime: '10:41:36',
  },
  {
    time: '2026-04-15T12:14:59.000Z',
    expectedTime: '14:14:59',
  },
  {
    time: '2026-04-15T17:02:14.000Z',
    expectedTime: '19:02:14',
  },
  {
    time: '2026-04-15T20:10:44.000Z',
    expectedTime: '22:10:44',
  },
  {
    time: '2026-04-15T01:54:07.000Z',
    expectedTime: '03:54:07',
  },
].forEach(({ time, expectedTime }) => {
  paris(`should display correct times ${expectedTime.slice(0, 5)} for Paris`, async ({ page }) => {
    await page.clock.setFixedTime(dayjs(time).toDate())
    await page.goto('/')
    await expect(page.locator('div.time > div')).toHaveText(['07:00:04', '20:44:48', '13:52:26'])
    await expect(page.locator('text.digital-time')).toHaveText(expectedTime.slice(0, 5))
    await expect(page.locator('path.is-on')).toHaveCount(Number(expectedTime.slice(6)) + 1)
  })
})

/* Parameterized tests for location Los Angeles */
;[
  {
    time: '2026-04-15T08:41:36.000Z',
    expectedTime: '01:41:36',
  },
  {
    time: '2026-04-15T12:14:59.000Z',
    expectedTime: '05:14:59',
  },
  {
    time: '2026-04-15T17:02:14.000Z',
    expectedTime: '10:02:14',
  },
  {
    time: '2026-04-15T20:10:44.000Z',
    expectedTime: '13:10:44',
  },
  {
    time: '2026-04-15T01:54:07.000Z',
    expectedTime: '18:54:07',
  },
].forEach(({ time, expectedTime }) => {
  losAngeles(
    `should display correct times ${expectedTime.slice(0, 5)} for Los Angeles`,
    async ({ page }) => {
      await page.clock.setFixedTime(dayjs(time).toDate())
      await page.goto('/')
      await expect(page.locator('div.time > div')).toHaveText(['06:25:04', '19:27:02', '12:56:03'])
      await expect(page.locator('text.digital-time')).toHaveText(expectedTime.slice(0, 5))
      await expect(page.locator('path.is-on')).toHaveCount(Number(expectedTime.slice(6)) + 1)
    },
  )
})
