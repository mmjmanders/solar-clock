import { onMounted, onUnmounted, ref } from 'vue'

export const useClock = () => {
  const time = ref<Date>(new Date())

  let interval: number | undefined

  onMounted(() => {
    interval = setInterval(() => {
      time.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return { time }
}
