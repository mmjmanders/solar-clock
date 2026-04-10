import { onMounted, onUnmounted, ref } from 'vue'

export const useClock = () => {
  const date = ref<Date>(new Date())

  let interval: number | undefined

  onMounted(() => {
    interval = setInterval(() => {
      date.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return { date }
}
