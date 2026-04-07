import { useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import SavedPage from './pages/SavedPage'

// Reducer
function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (state.find(p => p.code === action.product.code)) return state
      return [...state, action.product]

    case 'REMOVE':
      return state.filter(p => p.code !== action.code)

    default:
      return state
  }
}

function App() {
  const [saved, dispatch] = useReducer(savedReducer, [])
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
      <NavBar savedCount={saved.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={
          <DetailPage saved={saved} dispatch={dispatch} />
        } />
        <Route path="/saved" element={
          <SavedPage saved={saved} dispatch={dispatch} />
        } />
      </Routes>
    </div>
  )
}

export default App