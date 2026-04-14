<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  radius: number
  hourIndicatorRadius: number
}>()

const hourIndicatorInnerRadius = computed<number>(() => props.hourIndicatorRadius - 75)
const hourIndicatorPath = computed<string>(() =>
  ['M', hourIndicatorInnerRadius.value, '0', 'L', props.hourIndicatorRadius, '0'].join(' '),
)
const hourTransform = (i: number): string => `rotate(${(360 / 24) * (i - 1)})`
</script>

<template>
  <g>
    <circle
      cx="0"
      cy="0"
      :r="radius"
      class="stroke-sundial-bronze-300 fill-none"
      stroke-width="2"
    />
    <path
      v-for="i in 24"
      :key="i"
      :d="hourIndicatorPath"
      stroke-width="2"
      class="stroke-sundial-shadow-700"
      :transform="hourTransform(i)"
    />
  </g>
</template>

<style scoped></style>
