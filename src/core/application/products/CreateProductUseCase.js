import { Product } from '../../domain/entities/Product'

export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(data) {
    // validaciónes del negocio en la entidad, no en el componente React.
    const product = new Product(data)
    return this.productRepository.create(product)
  }
}
