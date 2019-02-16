import { useState, useEffect, useCallback } from 'react'

const isClient = typeof window !== 'undefined'

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  if (!isClient) {
    // We're SSRing; can't use local storage here!
    return [initialValue, () => {}]
  }
  const [state, updateState] = useState((): T => {
    try {
      const localStorageValue = window.localStorage.getItem(key)
      if (localStorageValue === null) {
        // Initialize local storage with default state
        window.localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      } else {
        return JSON.parse(localStorageValue)
      }
    } catch {
      // User might be facing storage restrictions, or JSON
      // serialization/deserialization may have failed. We can just fall back
      // to using React state here.
      return initialValue
    }
  })
  const localStorageChanged = (e: StorageEvent) => {
    if (e.key === key) {
      updateState(JSON.parse(e.newValue as string))
    }
  }
  const setState = useCallback((value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
    updateState(value)
  }, [key, updateState])
  useEffect(() => {
    window.addEventListener('storage', localStorageChanged)
    return () => {
      window.removeEventListener('storage', localStorageChanged)
    }
  })
  return [state, setState]
}

export default useLocalStorage
