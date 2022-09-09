import { DependencyList, useCallback, useEffect, useRef, useState } from "react"

export const useDebounce = (
  fn: Function,
  delay: number = 300,
  deps: DependencyList = []
): void => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(fn)

  const set = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      callback.current()
    }, delay)
  }, [delay])

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)
  }, [])

  // update ref when function changes
  useEffect(() => {
    callback.current = fn
  }, [fn])

  // set on mount, clear on unmount
  useEffect(() => {
    set()
    return clear
  }, [delay])

  useEffect(set, deps)
}
