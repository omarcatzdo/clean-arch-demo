import { useEffect, useState } from 'react'

const FORM = { name: '', price: '', description: '' }

export function ProductForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(FORM)
  const [error, setError] = useState(null)
  const isEditing = Boolean(initialData)

  useEffect(() => {
    setForm(
      initialData
        ? { name: initialData.name, price: initialData.price, description: initialData.description }
        : FORM
    )
  }, [initialData])

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await onSubmit(form)
      if (!isEditing) setForm(FORM)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Editar producto' : 'Agregar producto'}</h3>

      <label>
        Nombre
        <input
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          placeholder="Ej. Teclado mecánico"
          required
        />
      </label>

      <label>
        Precio
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={handleChange('price')}
          placeholder="0.00"
          required
        />
      </label>

      <label>
        Descripción
        <textarea
          value={form.description}
          onChange={handleChange('description')}
          placeholder="Detalles del producto"
          rows={3}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Guardar cambios' : 'Agregar'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
