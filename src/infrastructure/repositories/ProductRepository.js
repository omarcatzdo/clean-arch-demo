import { IProductRepository } from '../../core/domain/repositories/IProductRepository'
import { Product } from '../../core/domain/entities/Product'

const STORAGE_KEY = 'demo_products'

const SEED_PRODUCTS = [
  { id: crypto.randomUUID(), name: 'Teclado mecánico', price: 89.99, description: 'Switches rojos, retroiluminado' },
  { id: crypto.randomUUID(), name: 'Mouse inalámbrico', price: 29.5, description: 'Sensor óptico de 1600 DPI' },
  { id: crypto.randomUUID(), name: 'Monitor 27"', price: 219.0, description: 'Panel IPS, 144Hz' }
]

/**
 * Implementación concreta de IProductRepository usando localStorage.
 * Podría sustituirse por una que llame a `fetch('/api/products')`
 * sin que la UI ni los casos de uso se enteren del cambio.
 */
export class ProductRepository extends IProductRepository {
  async getAll() {
    await simulateDelay()
    return readAll().map((p) => new Product(p))
  }

  async getById(id) {
    await simulateDelay()
    const found = readAll().find((p) => p.id === id)
    return found ? new Product(found) : null
  }

  async create(product) {
    await simulateDelay()
    const items = readAll()
    const newProduct = new Product({ ...product, id: crypto.randomUUID() })
    items.push(newProduct)
    writeAll(items)
    return newProduct
  }

  async update(id, product) {
    await simulateDelay()
    const items = readAll()
    const index = items.findIndex((p) => p.id === id)
    if (index === -1) throw new Error('Producto no encontrado')

    const updated = new Product({ ...product, id })
    items[index] = updated
    writeAll(items)
    return updated
  }

  async remove(id) {
    await simulateDelay()
    const items = readAll().filter((p) => p.id !== id)
    writeAll(items)
  }
}

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    writeAll(SEED_PRODUCTS)
    return SEED_PRODUCTS
  }
  return JSON.parse(raw)
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function simulateDelay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
