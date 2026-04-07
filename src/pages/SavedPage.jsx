import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'

function SavedPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)
  const navigate = useNavigate()

  if (savedItems.length === 0) {
    return <h2>No saved items</h2>
  }

  return (
    <div>
      <h2>Saved Items</h2>

      {savedItems.map(product => (
        <div key={product.code}>
          <h3>{product.product_name}</h3>
          <p>{product.brands}</p>

          <button onClick={() => navigate(`/product/${product.code}`)}>
            View
          </button>

          <button onClick={() =>
            dispatch(removeItem(product.code))
          }>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default SavedPage