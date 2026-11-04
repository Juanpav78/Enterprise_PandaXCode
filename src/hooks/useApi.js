import { useEffect, useState } from 'react'

/**
 * Llama a la API y devuelve { data, loading, error }.
 * Si la API falla o devuelve una lista vacía, usa `fallback`
 * para que la web nunca se vea vacía mientras conectas el backend.
 */
export function useApi(fetcher, fallback = null, deps = []) {
  const [state, setState] = useState({ data: fallback, loading: true, error: null })

  useEffect(() => {
    let active = true
    setState((s) => ({ ...s, loading: true }))

    fetcher()
      .then((data) => {
        if (!active) return
        const empty = data == null || (Array.isArray(data) && data.length === 0)
        setState({ data: empty ? fallback : data, loading: false, error: null })
      })
      .catch((error) => {
        if (!active) return
        if (import.meta.env.DEV) console.warn('[API]', error.message)
        setState({ data: fallback, loading: false, error })
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
