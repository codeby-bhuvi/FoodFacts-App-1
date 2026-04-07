import { useState } from "react"
import SearchBar from "./components/SearchBar"
import FoodList from "./components/FoodList"

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10&lc=en`
// added api key
      const response = await fetch(url)
      const data = await response.json()

        console.log(data.products)

      const filtered = data.products.filter(
  (p) => p.product_name || p.brands || p.generic_name
)

      setResults(filtered)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
  <div>
    <h1>🥗 FoodFacts</h1>

    <SearchBar onSearch={handleSearch} />

    {loading && <p>Loading...</p>}

    {!loading && results.length === 0 && (
      <p>Search for a food above to see its nutrition info.</p>
    )}

    {!loading && results.length > 0 && (
      <FoodList products={results} />
    )}
  </div>
)
}

export default App