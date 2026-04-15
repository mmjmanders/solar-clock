<script setup lang="ts">
import { useClock, useLocation, useSunriseSunset } from '@/composables'
import SolarNoonPosition from './SolarNoonPosition.vue'
import { computed, readonly, ref } from 'vue'
import SunPosition from './SunPosition.vue'
import DayNightShade from './DayNightShade.vue'
import StaticContent from './StaticContent.vue'

const { time } = useClock()
const { latitude, longitude, location } = useLocation()
const { sunrise, sunset, solarNoon } = useSunriseSunset(latitude, longitude, time)

const hour = computed<number>(() => time.value.getHours())
const minute = computed<number>(() => time.value.getMinutes())

const radius = readonly(ref<number>(600))
const pathLength = readonly(ref<number>(700))
const outerRadius = readonly(ref<number>(800))
const hourIndicatorRadius = readonly(ref<number>(825))
const textRadius = readonly(ref<number>(950))
</script>

<template>
  <div class="main-content">
    <h2>{{ location }}</h2>
    <div>
      <svg viewBox="-1000 -1000 2000 2000">
        <DayNightShade
          v-if="sunrise && sunset"
          :sunrise="sunrise"
          :sunset="sunset"
          :radius="outerRadius"
        />
        <StaticContent
          :radius="radius"
          :hourIndicatorRadius="hourIndicatorRadius"
          :textRadius="textRadius"
        />
        <template v-if="sunrise && sunset && solarNoon">
          <SolarNoonPosition :radius="radius" :solar-noon="solarNoon" />
          <SunPosition
            :radius="radius"
            :path-length="pathLength"
            :hour="hour"
            :minute="minute"
            :sunrise="sunrise"
            :sunset="sunset"
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
