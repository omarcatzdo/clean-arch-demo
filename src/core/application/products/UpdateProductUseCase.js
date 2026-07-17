import { Product } from '../../domain/entities/Product'

export class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id, data) {
    const product = new Product({ ...data, id })
    return this.productRepository.update(id, product)
  }
}
