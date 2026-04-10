<script setup lang="ts">
import SunnyIcon from 'virtual:iconify/material-symbols/sunny-outline-rounded'
import CommitIcon from 'virtual:iconify/material-symbols/commit-rounded'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useLocation } from '@/composables'

const { VITE_APP_VERSION: version } = import.meta.env

const { latitude, longitude } = useLocation()
</script>

<template>
  <header>
    <SunnyIcon class="icon" />
    <h1>Solar Clock</h1>
  </header>
  <main>
    <div>{{ latitude }}</div>
    <div>{{ longitude }}</div>
  </main>
  <footer>
    <CommitIcon class="icon" />
    {{ version }}
  </footer>
  <VueQueryDevtools />
</template>

<style scoped></style>
