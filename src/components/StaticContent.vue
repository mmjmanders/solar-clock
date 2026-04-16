<script setup lang="ts">
import { computed } from 'vue'
import { useOffset } from '@/composables'

const props = defineProps<{
  radius: number
  hourIndicatorRadius: number
  textRadius: number
}>()

const { offset } = useOffset()

const textPosition = (hour: number): { x: number; y: number } => {
  const position = offset(hour, 0) + Math.PI / 2
  const x = Math.cos(position) * props.textRadius
  const y = Math.sin(position) * props.textRadius
  return { x, y }
}

const hourIndicatorOuterRadius = computed<number>(() => props.hourIndicatorRadius + 75)
const hourIndicatorPath = computed<string>(() =>
  ['M', props.hourIndicatorRadius, '0', 'L', hourIndicatorOuterRadius.value, '0'].join(' '),
)
const hourTransform = (i: number): string => `rotate(${(360 / 24) * (i - 1)})`

const subIndicatorOuterRadius = computed<number>(() => props.hourIndicatorRadius + 40)
const subIndicatorPath = computed<string>(() =>
  ['M', props.hourIndicatorRadius, '0', 'L', subIndicatorOuterRadius.value, '0'].join(' '),
)
const subIndicators = Array(24 * 5)
  .fill(0)
  .map((_, i) => i)
  .filter((i) => i % 5 !== 0)
const subTransform = (i: number): string => `rotate(${(360 / (24 * 5)) * i})`
</script>

<template>
  <g>
    <circle cx="0" cy="0" :r="radius" stroke-width="2" />
    <path
      v-for="i in 24"
      :key="i"
      :d="hourIndicatorPath"
      stroke-width="2"
      :transform="hourTransform(i)"
    />
    <path
      v-for="i in subIndicators"
      :key="i"
      :d="subIndicatorPath"
      stroke-width="2"
      :transform="subTransform(i)"
    />
    <text
      v-for="i in 24"
      :key="i"
      :x="textPosition(i).x"
      :y="textPosition(i).y"
      dominant-baseline="middle"
      text-anchor="middle"
      >{{ i }}</text
    >
  </g>
</template>

<style scoped>
@reference '../main.css';

circle {
  @apply stroke-sundial-bronze-300 fill-none;
}

path {
  @apply stroke-sundial-shadow-700;
}

text {
  @apply text-4xl text-sundial-bronze-300;
}
</style>
