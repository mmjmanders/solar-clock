<script setup lang="ts">
import { getIconData, iconToSVG } from '@iconify/utils'
import { icons } from '@iconify-json/material-symbols'

const { body } = iconToSVG(getIconData(icons, 'sunny-rounded')!)

defineProps<{
  solarNoon: number
}>()
</script>

<template>
  <g v-html="body" />
</template>

<style scoped></style>
