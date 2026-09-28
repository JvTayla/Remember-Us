import { useEffect, useState } from 'react'
import { client } from '../lib/sanityClient.js'

export default function useSanityQuery(query, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const key = JSON.stringify(params)

  useEffect(() => {
    let active = true
    setLoading(true)
    client
      .fetch(query, params)
      .then((res) => active && setData(res))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [query, key])

  return { data, loading, error }
}
