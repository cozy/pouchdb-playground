export const startMeasure = () => {
  return performance.now()
}

export const endMeasure = startTime => {
  const endTime = performance.now()
  return endTime - startTime
}
