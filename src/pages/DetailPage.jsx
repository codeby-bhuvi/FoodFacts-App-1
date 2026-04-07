import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          setProduct(res.data.product)
          setLoading(false)
        }

      } catch (err) {
        if (!cancelled) {
          setError('Error loading product')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const handleSave = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>No product found</p>

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.product_name}</h2>
      <img src={product.image_small_url} />
      <p>{product.brands}</p>

      <h3>Nutrition</h3>
      <ul>
        <li>Calories: {product.nutriments?.energy}</li>
        <li>Fat: {product.nutriments?.fat}</li>
        <li>Sugar: {product.nutriments?.sugars}</li>
        <li>Protein: {product.nutriments?.proteins}</li>
        <li>Salt: {product.nutriments?.salt}</li>
      </ul>

      <button onClick={handleSave}>
        {isSaved ? 'Remove from Saved' : 'Save'}
      </button>
    </div>
  )
}

export default DetailPage