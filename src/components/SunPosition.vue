<script setup lang="ts">
import { computed } from 'vue'
import SunnyIcon from 'virtual:iconify/material-symbols/sunny-rounded'
import dayjs from 'dayjs'
import { useOffset } from '@/composables'

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

const { offset } = useOffset()

const position = computed<number>(() => offset(props.hour, props.minute))

const handRotation = computed<number>(() => position.value * (180 / Math.PI))

const sunPosition = computed<{ x: number; y: number }>(() => {
  const x = Math.cos(position.value) * props.radius - props.size / 2
  const y = Math.sin(position.value) * props.radius - props.size / 2
  return { x, y }
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
      <SunnyIcon :width="size" :height="size" class="text-sundial-bronze-300" />
    </g>
  </g>
</template>

<style scoped></style>
