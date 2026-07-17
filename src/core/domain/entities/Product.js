/**
 * Entidad de dominio: Product
 * Contiene las reglas de negocio propias de un producto,
 * independientes de cómo se guarde o se muestre.
 */
export class Product {
  constructor({ id, name, price, description }) {
    if (!name || !name.trim()) {
      throw new Error('Product: el nombre es obligatorio')
    }

    if (price === undefined || price === null || Number(price) < 0) {
      throw new Error('Product: el precio debe ser un número positivo')
    }

    this.id = id
    this.name = name.trim()
    this.price = Number(price)
    this.description = description?.trim() ?? ''
  }

  /** Ejemplo de regla de negocio propia de la entidad */
  formattedPrice() {
    return `$${this.price.toFixed(2)}`
  }
}
