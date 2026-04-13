import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const { VITE_SUNRISE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env

const sunriseSunsetDataSchema = z.object({
  tzid: z.string(),
  results: z.object({
    sunrise: z.coerce.number(),
    solar_noon: z.coerce.number(),
    sunset: z.coerce.number(),
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
  useQuery({
    queryKey: ['sunrise-sunset', latitude, longitude],
    enabled: computed(() => latitude.value != undefined && longitude.value != undefined),
    queryFn: async (): Promise<SunriseSunsetData> => {
      const response = await fetch(
        `${baseUrl}/json?lat=${latitude.value}&lng=${longitude.value}&time_format=unix`,
      )
      return response.json()
    },
    select: (data: SunriseSunsetData): SolarNoonData => {
      const { sunrise, solar_noon, sunset } = sunriseSunsetDataSchema.parse(data).results
      return {
        tzid: data.tzid,
        sunrise,
        solar_noon,
        sunset,
      }
    },
    staleTime: 3 * 60 * 60 * 1000,
  })
