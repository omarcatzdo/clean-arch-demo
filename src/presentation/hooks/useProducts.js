import { useCallback, useEffect, useState } from 'react'
import { container } from '../../core/container'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const items = await container.getProductsUseCase.execute()
      setProducts(items)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function createProduct(data) {
    await container.createProductUseCase.execute(data)
    await loadProducts()
  }

  async function updateProduct(id, data) {
    await container.updateProductUseCase.execute(id, data)
    await loadProducts()
  }

  async function deleteProduct(id) {
    await container.deleteProductUseCase.execute(id)
    await loadProducts()
  }

  return { products, loading, error, createProduct, updateProduct, deleteProduct, reload: loadProducts }
}
