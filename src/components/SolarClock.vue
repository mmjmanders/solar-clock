<script setup lang="ts">
import { useClock } from '@/composables'

const { date } = useClock()
</script>

<template>
  <div>{{ date.toISOString() }}</div>
</template>

<style scoped>
@reference '../main.css';

div {
  @apply max-w-full h-full aspect-square flex justify-center items-center font-mono;
}
</style>
