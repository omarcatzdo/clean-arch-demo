/**
 * Caso de uso: iniciar sesión.
 * Recibe el repositorio por inyección de dependencias (Inversión de Dependencias):
 * no importa si por debajo hay un mock, localStorage o una API real.
 */
export class LoginUseCase {
  /** @param {import('../../domain/repositories/IAuthRepository').IAuthRepository} authRepository */
  constructor(authRepository) {
    this.authRepository = authRepository
  }

  async execute(email, password) {
    if (!email || !password) {
      throw new Error('Debes ingresar email y contraseña')
    }

    return this.authRepository.login(email, password)
  }
}
