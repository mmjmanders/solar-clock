import { useGeoQuery, useReverseGeocodingQuery } from '@/queries'
import { computed, onMounted, ref } from 'vue'

export const useLocation = () => {
  const latitude = ref<number>()
  const longitude = ref<number>()

  const update = (lat?: number, lon?: number) => {
    latitude.value = lat
    longitude.value = lon
  }
  const { refetch } = useGeoQuery()
  const { data: locationData } = useReverseGeocodingQuery(latitude, longitude)
  const location = computed<string>(() =>
    locationData.value ? `${locationData.value.city}, ${locationData.value.country}` : '',
  )

  const fetchFromGeoApi = async () => {
    const { data } = await refetch()
    update(data?.latitude, data?.longitude)
  }

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          update(coords.latitude, coords.longitude)
        },
        () => fetchFromGeoApi(),
      )
    } else {
      fetchFromGeoApi()
    }
  })

  return { latitude, longitude, location }
}
