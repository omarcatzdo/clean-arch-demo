import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { ProductForm } from '../components/ProductForm'
import { ProductList } from '../components/ProductList'

export function ProductsPage() {
  const { user, logout } = useAuth()
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()
  const [editingProduct, setEditingProduct] = useState(null)

  async function handleSubmit(data) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data)
      setEditingProduct(null)
    } else {
      await createProduct(data)
    }
  }

  async function handleDelete(id) {
    if (confirm('¿Eliminar este producto?')) {
      await deleteProduct(id)
    }
  }

  return (
    <div className="app-screen">
      <header className="app-header">
        <div>
          <h1>Productos</h1>
          <p className="app-subtitle">Sesión iniciada como {user?.name} ({user?.email})</p>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Cerrar sesión</button>
      </header>

      <main className="app-main">
        <section className="panel">
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => setEditingProduct(null)}
          />
        </section>

        <section className="panel panel-grow">
          {loading && <p>Cargando productos…</p>}
          {error && <p className="form-error">{error}</p>}
          {!loading && !error && (
            <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  )
}
