<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  solarNoon: number
  radius: number
}>()

const solarNoonPosition = computed<{ x: number; y: number }>(() => {
  const time = dayjs.unix(props.solarNoon)
  const offset = ((time.hour() * 60 + time.minute()) / (24 * 60)) * (2 * Math.PI)
  const x = Math.cos(offset) * props.radius
  const y = Math.sin(offset) * props.radius
  return { x, y }
})
</script>

<template>
  <g transform="rotate(90)">
    <circle
      :cx="solarNoonPosition.x"
      :cy="solarNoonPosition.y"
      r="8"
      class="stroke-sundial-bronze-300 fill-sundial-bronze-300"
    />
  </g>
</template>

<style scoped></style>
