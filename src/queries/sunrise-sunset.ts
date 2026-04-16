import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const { VITE_SUNRISE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env

const sunriseSunsetSchema = z.object({
  sunrise: z.coerce.number(),
  sunset: z.coerce.number(),
  solar_noon: z.coerce.number(),
  timezone: z.string(),
})
const sunriseSunsetResultsSchema = z.object({
  tzid: z.string(),
  results: sunriseSunsetSchema,
})

type SunriseSunsetResults = z.infer<typeof sunriseSunsetResultsSchema>
type SunriseSunsetData = z.infer<typeof sunriseSunsetSchema> & { tzid: string }

export const useSunriseSunsetQuery = (
  latitude: Ref<number | undefined>,
  longitude: Ref<number | undefined>,
) =>
  useQuery({
    queryKey: ['sunrise-sunset', latitude, longitude],
    enabled: computed(() => latitude.value != undefined && longitude.value != undefined),
    queryFn: async (): Promise<SunriseSunsetResults> => {
      const response = await fetch(
        `${baseUrl}/json?lat=${latitude.value}&lng=${longitude.value}&time_format=unix`,
      )
      return response.json()
    },
    select: (data: SunriseSunsetResults): SunriseSunsetData => ({
      ...sunriseSunsetSchema.parse(data.results),
      tzid: data.tzid,
    }),
    staleTime: 6 * 60 * 60 * 1000,
  })
