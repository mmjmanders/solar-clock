import { computed, type Ref } from 'vue'
import { getSolarNoon, getSunrise, getSunset } from 'sunrise-sunset-js'

export const useSunriseSunset = (
  latitude: Ref<number | undefined>,
  longitude: Ref<number | undefined>,
  date: Ref<Date>,
) => {
  const sunrise = computed<number | undefined>(() =>
    latitude.value != undefined && longitude.value != undefined
      ? getSunrise(latitude.value, longitude.value, date.value)?.getTime()
      : undefined,
  )
  const sunset = computed<number | undefined>(() =>
    latitude.value != undefined && longitude.value != undefined
      ? getSunset(latitude.value, longitude.value, date.value)?.getTime()
      : undefined,
  )
  const solarNoon = computed<number | undefined>(() =>
    latitude.value != undefined && longitude.value != undefined
      ? getSolarNoon(latitude.value, longitude.value, date.value)?.getTime()
      : undefined,
  )

  return { sunrise, sunset, solarNoon }
}
