import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_SUNRISE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env

const sunriseSunsetDataSchema = z.object({
  tzid: z.string(),
  results: z.object({
    sunrise: z.number(),
    solar_noon: z.number(),
    sunset: z.number(),
  }),
})

type SunriseSunsetData = z.infer<typeof sunriseSunsetDataSchema>
type SolarNoonData = {
  tzid: string
  sunrise: number
  solar_noon: number
  sunset: number
}

export const useSunriseSunsetQuery = (
  latitude: Ref<number | undefined>,
  longitude: Ref<number | undefined>,
) =>
  useQuery(
    queryOptions({
      queryKey: ['sunrise-sunset', latitude, longitude],
      enabled: computed(() => latitude.value != undefined && longitude.value != undefined),
      queryFn: async (): Promise<SunriseSunsetData> => {
        const response = await fetch(
          `${baseUrl}/json?lat=${latitude.value}&lng=${longitude.value}&time_format=unix`,
        )
        return response.json()
      },
      select: (data: SunriseSunsetData): SolarNoonData => ({
        tzid: data.tzid,
        sunrise: data.results.sunrise,
        solar_noon: data.results.solar_noon,
        sunset: data.results.sunset,
      }),
      staleTime: 3 * 60 * 60 * 1000,
    }),
  )
