import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_SUNRISE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env

const sunriseSunsetDataSchema = z.object({
  tzid: z.string(),
  results: z.object({
    solar_noon: z.number(),
  }),
})

type SunriseSunsetData = z.infer<typeof sunriseSunsetDataSchema>
type SolarNoonData = {
  tzid: string
  solar_noon: number
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
      select: (data): SolarNoonData => ({ tzid: data.tzid, solar_noon: data.results.solar_noon }),
      staleTime: 3 * 60 * 60 * 1000,
    }),
  )
