<script setup lang="ts">
import { useClock, useLocation, useSunriseSunset } from '@/composables'
import SolarNoonPosition from './SolarNoonPosition.vue'
import { computed, readonly, ref } from 'vue'
import SunPosition from './SunPosition.vue'
import dayjs from 'dayjs'

const { time } = useClock()
const { latitude, longitude, location } = useLocation()
const { sunrise, sunset, solarNoon } = useSunriseSunset(latitude, longitude, time)

const hour = computed<number>(() => time.value.getHours())
const minute = computed<number>(() => time.value.getMinutes())

const radius = readonly(ref<number>(600))
const pathLength = readonly(ref<number>(650))
const outerRadius = readonly(ref<number>(800))

const offset = (hour: number, minute: number): number => {
  return ((hour * 60 + minute) / (24 * 60)) * (2 * Math.PI)
}

const offsetSunrise = computed<{ x: number; y: number } | undefined>(() => {
  if (!sunrise.value) return undefined
  const date = dayjs(sunrise.value)
  const pos = offset(date.hour(), date.minute())
  return { x: Math.cos(pos) * outerRadius.value, y: Math.sin(pos) * outerRadius.value }
})

const offsetSunset = computed<{ x: number; y: number } | undefined>(() => {
  if (!sunset.value) return undefined
  const date = dayjs(sunset.value)
  const pos = offset(date.hour(), date.minute())
  return { x: Math.cos(pos) * outerRadius.value, y: Math.sin(pos) * outerRadius.value }
})

const path = computed<string>(() =>
  offsetSunrise.value && offsetSunset.value
    ? [
        'M 0 0 L',
        offsetSunrise.value.x,
        offsetSunrise.value.y,
        'A',
        outerRadius.value,
        outerRadius.value,
        '0 0 0',
        offsetSunset.value.x,
        offsetSunset.value.y,
        'Z',
      ].join(' ')
    : '',
)
</script>

<template>
  <div class="main-content">
    <h2>{{ location }}</h2>
    <div>
      <svg viewBox="-1000 -1000 2000 2000">
        <g v-if="path" transform="rotate(90)">
          <circle cx="0" cy="0" :r="outerRadius" class="fill-sundial-sky-noon" />
          <path :d="path" class="fill-sundial-sky-midnight" />
        </g>
        <circle
          cx="0"
          cy="0"
          :r="radius"
          class="stroke-sundial-bronze-300 fill-none"
          stroke-width="2"
        />
        <template v-if="sunrise && sunset && solarNoon">
          <SolarNoonPosition :radius="radius" :solar-noon="solarNoon" />
          <SunPosition
            :radius="radius"
            :path-length="pathLength"
            :hour="hour"
            :minute="minute"
            :sunrise="sunrise"
            :sunset="sunset"
          />
        </template>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@reference '../main.css';

h2 {
  @apply font-sans;
}

div:not(.main-content) {
  @apply max-w-full h-full aspect-square flex justify-center;
}
</style>
