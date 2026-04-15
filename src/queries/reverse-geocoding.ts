import * as z from 'zod'
import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const { VITE_REVERSE_GEOCODING_API_BASE_URL: baseUrl } = import.meta.env

const addressSchema = z.object({
  city: z.string(),
  country: z.string(),
})

const reverseGeocodingDataSchema = z.object({
  address: addressSchema,
})

type ReverseGeocodingData = z.infer<typeof reverseGeocodingDataSchema>
type AddressData = z.infer<typeof addressSchema>

export const useReverseGeocodingQuery = (
  latitude: Ref<number | undefined>,
  longitude: Ref<number | undefined>,
) =>
  useQuery({
    queryKey: ['reverse-geocoding', latitude, longitude],
    enabled: computed(() => latitude.value != undefined && longitude.value != undefined),
    queryFn: async (): Promise<ReverseGeocodingData> => {
      const response = await fetch(
        `${baseUrl}/reverse?lat=${latitude.value}&lon=${longitude.value}&layer=address&format=jsonv2`,
      )
      return response.json()
    },
    select: (data: ReverseGeocodingData): AddressData => addressSchema.parse(data.address),
    staleTime: 3 * 60 * 60 * 1000,
  })
