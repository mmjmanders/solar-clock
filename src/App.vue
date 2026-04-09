<script setup lang="ts">
import SunnyIcon from 'virtual:iconify/material-symbols/sunny-outline-rounded'
import CommitIcon from 'virtual:iconify/material-symbols/commit-rounded'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const { VITE_APP_VERSION: version } = import.meta.env
</script>

<template>
  <header>
    <SunnyIcon class="icon" />
    <h1>Solar Clock</h1>
  </header>
  <main></main>
  <footer>
    <CommitIcon class="icon" />
    {{ version }}
  </footer>
  <VueQueryDevtools />
</template>

<style scoped></style>
