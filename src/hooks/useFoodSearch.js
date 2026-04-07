import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        'https://world.openfoodfacts.org/cgi/search.pl',
        {
          params: {
            search_terms: query,
            json: 1,
            page_size: 10
          }
        }
      )

      const filtered = response.data.products.filter(
        (p) => p.product_name && p.image_small_url
      )

      setResults(filtered)

    } catch (err) {
      if (err.response) {
        setError(`Server error: ${err.response.status}`)
      } else if (err.request) {
        setError('Network error. Check internet.')
      } else {
        setError('Something went wrong')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch