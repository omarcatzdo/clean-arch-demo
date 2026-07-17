export function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty-state">Todavía no hay productos. Agrega el primero con el formulario.</p>
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="cell-id" title={product.id}>{product.id.slice(0, 8)}</td>
            <td>{product.name}</td>
            <td>{product.formattedPrice()}</td>
            <td>{product.description || '—'}</td>
            <td className="cell-actions">
              <button className="btn btn-small" onClick={() => onEdit(product)}>Editar</button>
              <button className="btn btn-small btn-danger" onClick={() => onDelete(product.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
