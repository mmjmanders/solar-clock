<script setup lang="ts">
import { computed } from 'vue'
import { useOffset } from '@/composables'
import dayjs from 'dayjs'

const props = defineProps<{
  time: Date
  radius: number
}>()

const computedRadius = computed(() => props.radius - 150)
const hour = computed(() => props.time.getHours())
const minute = computed(() => props.time.getMinutes())
const second = computed(() => props.time.getSeconds())

const { offset } = useOffset()
const position = computed<{ x: number; y: number }>(() => {
  const textOffset = offset(hour.value, minute.value) - Math.PI
  return { x: Math.cos(textOffset) * props.radius, y: Math.sin(textOffset) * props.radius }
})
const displayTime = computed(() => dayjs(props.time).format('HH:mm'))
</script>

<template>
  <g transform="rotate(90)">
    <circle :cx="position.x" :cy="position.y" :r="computedRadius" />
    <path
      v-for="i in 60"
      :key="i"
      stroke-width="5"
      :d="`M 0 ${computedRadius - 25} L 0 ${computedRadius - 10}`"
      :transform="`translate(${position.x}, ${position.y}) rotate(${(360 / 60) * (i - 1) + 90})`"
      :class="{ 'is-on': i <= second }"
    />
    <text
      :transform="`rotate(-90 ${position.x} ${position.y})`"
      :x="position.x"
      :y="position.y"
      dominant-baseline="middle"
      text-anchor="middle"
      >{{ displayTime }}</text
    >
  </g>
</template>

<style scoped>
@reference '../main.css';

circle {
  @apply stroke-sundial-sky-golden fill-sundial-sky-golden;
}

text {
  @apply text-6xl font-mono text-sundial-bronze-900;
}

path {
  @apply stroke-sundial-bronze-900;
}

path.is-on {
  @apply stroke-sundial-bronze-50;
}
</style>
