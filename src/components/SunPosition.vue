<script setup lang="ts">
import { computed } from 'vue'
import SunIcon from 'virtual:iconify/material-symbols/circle'
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
  { size: 128 },
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
    <path
      class="sun-hand"
      stroke-width="4"
      :d="'M 0 0 h ' + pathLength"
      :transform="'rotate(' + handRotation + ')'"
    />
    <g class="sun-icon" :transform="'translate(' + sunPosition.x + ',' + sunPosition.y + ')'">
      <SunIcon :width="size" :height="size" />
    </g>
  </g>
</template>

<style scoped>
@reference '../main.css';

.sun-hand {
  @apply stroke-sundial-bronze-300 fill-sundial-bronze-300;
}

.sun-icon {
  @apply text-sundial-bronze-50;
}
</style>
