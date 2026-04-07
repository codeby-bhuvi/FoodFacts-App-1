import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function DetailPage() {

  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        )

        setProduct(res.data.product)
        setLoading(false)

      } catch (err) {

        setError('Error loading product')
        setLoading(false)

      }
    }

    fetchProduct()

  }, [id])

  const isSaved = savedItems.some(p => p.code === id)

  const handleSaveToggle = () => {

  if (isSaved) {
    dispatch(removeItem(id))
  } else {
    dispatch(addItem(product))
  }

}

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>{error}</Typography>
  if (!product) return <Typography>No product found</Typography>

  const { product_name, brands, image_small_url, nutriments } = product

  return (

    <Container maxWidth="md" sx={{ py: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>

          {image_small_url && (
            <Box
              component="img"
              src={image_small_url}
              alt={product_name}
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          )}

          <Box sx={{ flex: 1 }}>

            <Typography variant="h5" gutterBottom>
              {product_name || 'Unknown Product'}
            </Typography>

            <Typography color="text.secondary" gutterBottom>
              {brands || 'Unknown Brand'}
            </Typography>

            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleSaveToggle}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>

          </Box>

        </Box>

        <Typography variant="h6" gutterBottom>
          Nutrition per 100g
        </Typography>

        <Typography>Calories: {nutriments?.['energy-kcal_100g']}</Typography>
        <Typography>Protein: {nutriments?.proteins_100g}</Typography>
        <Typography>Fat: {nutriments?.fat_100g}</Typography>
        <Typography>Sugar: {nutriments?.sugars_100g}</Typography>
        <Typography>Salt: {nutriments?.salt_100g}</Typography>

      </Paper>

    </Container>

  )

}

export default DetailPage