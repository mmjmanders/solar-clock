<script setup lang="ts">
import { useClock, useLocation } from '@/composables'
import { useSunriseSunsetQuery } from '@/queries'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { computed } from 'vue'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

const { date } = useClock()
const { latitude, longitude } = useLocation()
const { data: sunriseSunsetData } = useSunriseSunsetQuery(latitude, longitude)
const time = computed<string>(() => dayjs(date.value).format('HH:mm:ss'))
const solarNoon = computed<string>(() =>
  sunriseSunsetData.value?.results.solar_noon
    ? dayjs
        .unix(sunriseSunsetData.value?.results.solar_noon)
        .tz(sunriseSunsetData.value?.tzid)
        .format('HH:mm:ss')
    : '',
)
</script>

<template>
  <div>
    {{ time }}
    <span v-if="solarNoon">&nbsp;- {{ solarNoon }}</span>
  </div>
</template>

<style scoped>
@reference '../main.css';

div {
  @apply max-w-full h-full aspect-square flex justify-center items-center font-mono;
}
</style>
