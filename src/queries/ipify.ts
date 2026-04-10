import { queryOptions, useQuery } from '@tanstack/vue-query'

const { VITE_IPIFY_BASE_URL: baseUrl } = import.meta.env

export const useIpifyQuery = () =>
  useQuery(
    queryOptions({
      queryKey: ['ipify'],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}?format=json`)
        return res.json()
      },
    }),
  )
