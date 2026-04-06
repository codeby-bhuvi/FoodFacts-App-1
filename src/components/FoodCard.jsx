function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      <img
        src={image_small_url || "https://via.placeholder.com/100"}
        alt={product_name}
      />

      <h2>{product_name ? product_name : "Unknown Product"}</h2>

      <p>Brand: {brands || "Unknown"}</p>

      <p>Calories: {nutriments?.['energy-kcal_100g'] || 0} kcal</p>
      <p>Protein: {nutriments?.proteins_100g || 0} g</p>
      <p>Carbs: {nutriments?.carbohydrates_100g || 0} g</p>
      <p>Fat: {nutriments?.fat_100g || 0} g</p>
    </div>
  )
}

export default FoodCard