export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  ms: number,
): ((...args: T) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}
