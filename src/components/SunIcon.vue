<script setup lang="ts">
import SunnyIcon from 'virtual:iconify/material-symbols/sunny-rounded'
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = withDefaults(
  defineProps<{
    solarNoon: number
    radius?: number
    size?: number
  }>(),
  { radius: 1000, size: 64 },
)

const innerRadius = computed<number>(() => props.radius - props.size)

const solarNoonPosition = computed<string>(() => {
  const time = dayjs(props.solarNoon)
  const offset = ((time.hour() * 60 + time.minute()) / (24 * 60)) * (2 * Math.PI)
  const x = Math.cos(offset) * innerRadius.value
  const y = Math.sin(offset) * innerRadius.value
  return `rotate(90) translate(${x}, ${y})`
})
</script>

<template>
  <g :transform="solarNoonPosition">
    <SunnyIcon :width="size" :height="size" class="text-sundial-bronze-300" />
  </g>
</template>

<style scoped></style>
