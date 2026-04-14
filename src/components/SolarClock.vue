<script setup lang="ts">
import { useClock, useLocation } from '@/composables'
import { useSunriseSunsetQuery } from '@/queries'
import SolarNoonPosition from './SolarNoonPosition.vue'
import { computed, readonly, ref } from 'vue'
import SunPosition from './SunPosition.vue'

const { time } = useClock()
const { latitude, longitude, location } = useLocation()
const { data: sunriseSunsetData } = useSunriseSunsetQuery(latitude, longitude)

const hour = computed<number>(() => time.value.getHours())
const minute = computed<number>(() => time.value.getMinutes())

const radius = readonly(ref<number>(600))
const pathLength = readonly(ref<number>(650))
</script>

<template>
  <div class="main-content">
    <h2>{{ location }}</h2>
    <div>
      <svg viewBox="-1000 -1000 2000 2000">
        <circle
          cx="0"
          cy="0"
          :r="radius"
          class="stroke-sundial-bronze-300 fill-none"
          stroke-width="2"
        />
        <template v-if="sunriseSunsetData">
          <SolarNoonPosition :radius="radius" :solar-noon="sunriseSunsetData.solar_noon" />
          <SunPosition
            :radius="radius"
            :path-length="pathLength"
            :hour="hour"
            :minute="minute"
            :sunrise="sunriseSunsetData.sunrise"
            :sunset="sunriseSunsetData.sunset"
          />
        </template>
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
