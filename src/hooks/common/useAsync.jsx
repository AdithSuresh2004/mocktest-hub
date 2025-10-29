import { useState, useEffect, useCallback } from 'react'

const useAsync = (asyncFunction, options = {}) => {
  const { autoLoad = true, dependencies = [] } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(autoLoad)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err?.message || 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }, [asyncFunction])

  useEffect(() => {
    if (autoLoad) {
      execute()
    }
  }, [autoLoad, execute, ...dependencies])

  return { data, loading, error, refetch: execute, setData }
}

export default useAsync
