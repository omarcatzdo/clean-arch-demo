// Composition Root: el único lugar del proyecto donde se decide
// QUÉ implementación para cada caso de uso.
// Si mañana cambias localStorage por una API real, solo tocas esto.

import { AuthRepository } from '../infrastructure/repositories/AuthRepository'
import { ProductRepository } from '../infrastructure/repositories/ProductRepository'

import { LoginUseCase } from './application/auth/LoginUseCase'
import { LogoutUseCase } from './application/auth/LogoutUseCase'

import { GetProductsUseCase } from './application/products/GetProductsUseCase'
import { CreateProductUseCase } from './application/products/CreateProductUseCase'
import { UpdateProductUseCase } from './application/products/UpdateProductUseCase'
import { DeleteProductUseCase } from './application/products/DeleteProductUseCase'

const authRepository = new AuthRepository()
const productRepository = new ProductRepository()

export const container = {
  authRepository,
  loginUseCase: new LoginUseCase(authRepository),
  logoutUseCase: new LogoutUseCase(authRepository),

  productRepository,
  getProductsUseCase: new GetProductsUseCase(productRepository),
  createProductUseCase: new CreateProductUseCase(productRepository),
  updateProductUseCase: new UpdateProductUseCase(productRepository),
  deleteProductUseCase: new DeleteProductUseCase(productRepository)
}
