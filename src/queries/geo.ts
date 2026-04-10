import * as z from 'zod'
import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_GEO_API_BASE_URL: baseUrl } = import.meta.env

const geoDataSchema = z.object({
  location: z.object({
    timezone: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
})

export type GeoData = z.infer<typeof geoDataSchema>

export const useGeoQuery = () =>
  useQuery(
    queryOptions({
      queryKey: ['geo'],
      enabled: false,
      queryFn: async (): Promise<GeoData> => {
        const response = await fetch(`${baseUrl}/geo`)
        return response.json()
      },
    }),
  )
