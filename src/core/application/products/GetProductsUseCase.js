export class GetProductsUseCase {
  /** @param {import('../../domain/repositories/IProductRepository').IProductRepository} productRepository */
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute() {
    return this.productRepository.getAll()
  }
}
