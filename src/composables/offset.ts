export const useOffset = () => {
  const offset = (hour: number, minute: number): number => {
    return ((hour * 60 + minute) / (24 * 60)) * (2 * Math.PI)
  }

  return { offset }
}
