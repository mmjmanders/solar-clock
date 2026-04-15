<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useOffset } from '@/composables'

const props = defineProps<{
  radius: number
  sunrise: number
  sunset: number
}>()

const { offset } = useOffset()

const offsetSunrise = computed<{ x: number; y: number }>(() => {
  const date = dayjs(props.sunrise)
  const pos = offset(date.hour(), date.minute())
  return { x: Math.cos(pos) * props.radius, y: Math.sin(pos) * props.radius }
})

const offsetSunset = computed<{ x: number; y: number }>(() => {
  const date = dayjs(props.sunset)
  const pos = offset(date.hour(), date.minute())
  return { x: Math.cos(pos) * props.radius, y: Math.sin(pos) * props.radius }
})

const path = computed<string>(() =>
  [
    'M 0 0 L',
    offsetSunrise.value.x,
    offsetSunrise.value.y,
    'A',
    props.radius,
    props.radius,
    '0 0 0',
    offsetSunset.value.x,
    offsetSunset.value.y,
    'Z',
  ].join(' '),
)
</script>

<template>
  <g v-if="path" transform="rotate(90)">
    <circle cx="0" cy="0" :r="radius" />
    <path :d="path" />
  </g>
</template>

<style scoped>
@reference '../main.css';

circle {
  @apply stroke-none fill-sundial-sky-noon;
}

path {
  @apply stroke-none fill-sundial-sky-midnight;
}
</style>
