export function nextBeat() {
  return sleep(1000)
}

export function sleep(timeout = 0) {
  return new Promise((resolve) => setTimeout(() => resolve(undefined), timeout))
}
