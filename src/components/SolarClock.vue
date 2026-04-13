<script setup lang="ts">
import { useClock, useLocation } from '@/composables'
import { useSunriseSunsetQuery } from '@/queries'

const { time } = useClock()
const { latitude, longitude, location } = useLocation()
const { data: sunriseSunsetData } = useSunriseSunsetQuery(latitude, longitude)
</script>

<template>
  <h2>{{ location }}</h2>
  <div>
    <svg viewBox="-500 -500 1000 1000"></svg>
  </div>
</template>

<style scoped>
@reference '../main.css';

h2 {
  @apply font-sans;
}

div {
  @apply max-w-full h-full aspect-square flex justify-center items-center;
}
</style>
