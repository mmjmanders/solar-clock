import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_REVERSE_GEOCODING_API_BASE_URL: baseUrl, VITE_GEOAPIFY_API_KEY: apiKey } = import.meta
  .env

const reverseGeocodingDataSchema = z.object({
  results: z.array(
    z.object({
      city: z.string(),
      country: z.string(),
    }),
  ),
})

type ReverseGeocodingData = z.infer<typeof reverseGeocodingDataSchema>
type LocationData = {
  city: string
  country: string
}

export const useReverseGeocodingQuery = (
  latitude: Ref<number | undefined>,
  longitude: Ref<number | undefined>,
) =>
  useQuery(
    queryOptions({
      queryKey: ['reverse-geocoding', latitude, longitude],
      enabled: computed(() => latitude.value != undefined && longitude.value != undefined),
      queryFn: async (): Promise<ReverseGeocodingData> => {
        const response = await fetch(
          `${baseUrl}/?lat=${latitude.value}&lon=${longitude.value}&apiKey=${apiKey}&format=json&limit=1`,
        )
        return response.json()
      },
      select: (data): LocationData => data.results[0]!,
      staleTime: 3 * 60 * 60 * 1000,
    }),
  )
