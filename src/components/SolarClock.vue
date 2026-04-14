<script setup lang="ts">
import { useLocation } from '@/composables'
import { useSunriseSunsetQuery } from '@/queries'
import SunIcon from './SunIcon.vue'

const { latitude, longitude, location } = useLocation()
const { data: sunriseSunsetData } = useSunriseSunsetQuery(latitude, longitude)
</script>

<template>
  <div class="main-content">
    <h2>{{ location }}</h2>
    <div>
      <svg viewBox="-1000 -1000 2000 2000">
        <SunIcon v-if="sunriseSunsetData" :solar-noon="sunriseSunsetData.solar_noon" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
@reference '../main.css';

h2 {
  @apply font-sans;
}

div:not(.main-content) {
  @apply max-w-full h-full aspect-square flex justify-center;
}
</style>
