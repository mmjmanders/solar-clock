<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  sunrise: number
  sunset: number
  solarNoon: number
}>()

const displayTimes = computed<{
  sunrise: string
  sunset: string
  solarNoon: string
}>(() => ({
  sunrise: dayjs.unix(props.sunrise).format('HH:mm:ss'),
  sunset: dayjs.unix(props.sunset).format('HH:mm:ss'),
  solarNoon: dayjs.unix(props.solarNoon).format('HH:mm:ss'),
}))
</script>

<template>
  <div class="times-container">
    <div class="time">
      <h3>Sunrise</h3>
      <div>{{ displayTimes.sunrise }}</div>
    </div>
    <div class="time">
      <h3>Sunset</h3>
      <div>{{ displayTimes.sunset }}</div>
    </div>
    <div class="time">
      <h3>Solar noon</h3>
      <div>{{ displayTimes.solarNoon }}</div>
    </div>
  </div>
</template>

<style scoped>
@reference '../main.css';

h3 {
  @apply font-sans;
}

.times-container {
  @apply grid grid-cols-3 gap-2;
}

.time {
  @apply flex flex-col items-center gap-1;
}

.time > div {
  @apply font-mono text-sm;
}
</style>
