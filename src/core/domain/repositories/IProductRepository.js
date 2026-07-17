/**
 * Puerto (interfaz) del repositorio de productos.
 * Cualquier implementación (localStorage, API REST, base de datos, etc.)
 * debe cumplir este contrato para poder ser usada por los casos de uso.
 */
export class IProductRepository {
  async getAll() {
    throw new Error('IProductRepository.getAll() no implementado')
  }

  // eslint-disable-next-line no-unused-vars
  async getById(id) {
    throw new Error('IProductRepository.getById() no implementado')
  }

  // eslint-disable-next-line no-unused-vars
  async create(product) {
    throw new Error('IProductRepository.create() no implementado')
  }

  // eslint-disable-next-line no-unused-vars
  async update(id, product) {
    throw new Error('IProductRepository.update() no implementado')
  }

  // eslint-disable-next-line no-unused-vars
  async remove(id) {
    throw new Error('IProductRepository.remove() no implementado')
  }
}
