<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useOffset } from '@/composables'

const props = defineProps<{
  solarNoon: number
  radius: number
}>()

const { offset } = useOffset()

const solarNoonPosition = computed<{ x: number; y: number }>(() => {
  const time = dayjs(props.solarNoon)
  const position = offset(time.hour(), time.minute())
  const x = Math.cos(position) * props.radius
  const y = Math.sin(position) * props.radius
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
