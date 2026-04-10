import { useGeoQuery } from '@/queries'
import { onMounted, ref } from 'vue'

export const useLocation = () => {
  const latitude = ref<number>()
  const longitude = ref<number>()

  const update = (lat?: number, lon?: number) => {
    latitude.value = lat
    longitude.value = lon
  }
  const { refetch } = useGeoQuery()
  const fetchFromGeoApi = async () => {
    const { data } = await refetch()
    update(data?.location.coordinates.latitude, data?.location.coordinates.longitude)
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

  return { latitude, longitude }
}
