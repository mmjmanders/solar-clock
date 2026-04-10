import * as z from 'zod'
import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_GEO_API_BASE_URL: baseUrl } = import.meta.env

const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

const geoDataSchema = z.object({
  location: z.object({
    coordinates: coordinatesSchema,
  }),
})

type GeoData = z.infer<typeof geoDataSchema>
type CoordinatesData = z.infer<typeof coordinatesSchema>

export const useGeoQuery = () =>
  useQuery(
    queryOptions({
      queryKey: ['geo'],
      enabled: false,
      queryFn: async (): Promise<GeoData> => {
        const response = await fetch(`${baseUrl}/geo`)
        return response.json()
      },
      select: (data): CoordinatesData => data.location.coordinates,
      staleTime: 12 * 60 * 60 * 1000,
    }),
  )
