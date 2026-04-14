<script setup lang="ts">
import { computed } from 'vue'
import SunnyIcon from 'virtual:iconify/material-symbols/sunny-rounded'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(objectSupport)
const props = withDefaults(
  defineProps<{
    radius: number
    pathLength: number
    hour: number
    minute: number
    sunrise: number
    sunset: number
    size?: number
  }>(),
  { size: 64 },
)

const offset = computed<number>(
  () => ((props.hour * 60 + props.minute) / (24 * 60)) * (2 * Math.PI),
)

const handRotation = computed<number>(() => offset.value * (180 / Math.PI))

const sunPosition = computed<{ x: number; y: number }>(() => {
  const x = Math.cos(offset.value) * props.radius - props.size / 2
  const y = Math.sin(offset.value) * props.radius - props.size / 2
  return { x, y }
})

const isLight = computed<boolean>(() => {
  const sunrise = dayjs(props.sunrise)
  const sunset = dayjs(props.sunset)
  const now = dayjs({ hour: props.hour, minute: props.minute })
  return now.isAfter(sunrise) && now.isBefore(sunset)
})
</script>

<template>
  <g transform="rotate(90)">
    <g :transform="'rotate(' + handRotation + ')'">
      <path
        class="stroke-sundial-bronze-300 fill-sundial-bronze-300"
        stroke-width="4"
        :d="'M 0 0 h ' + pathLength"
      />
    </g>
    <g :transform="'translate(' + sunPosition.x + ',' + sunPosition.y + ')'">
      <SunnyIcon
        :width="size"
        :height="size"
        :class="isLight ? 'text-sundial-bronze-300' : 'text-sundial-bronze-900'"
      />
    </g>
  </g>
</template>

<style scoped></style>
