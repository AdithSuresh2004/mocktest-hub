import { useState, useEffect } from 'react'

const useDataLoader = (loadFunction, autoLoad = true) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(autoLoad)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await loadFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err?.message || 'Failed to load data')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoLoad) {
      loadData()
    }
  }, [])

  return { data, loading, error, loadData, setData }
}

export default useDataLoader
