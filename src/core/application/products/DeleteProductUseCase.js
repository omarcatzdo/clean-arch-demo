export class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id) {
    if (!id) {
      throw new Error('Se requiere un id para eliminar el producto')
    }
    return this.productRepository.remove(id)
  }
}
